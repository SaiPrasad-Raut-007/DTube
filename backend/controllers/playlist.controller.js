import Playlist from '../models/Playlists.js';

export const createPlaylist = async (req, res) => {
    try {

        const { name } = req.body;
        if (!name) return res.status(400).json({error: "Playlist name is required"});

        const newPlaylist = new Playlist({
            name,
            creator: req.user.id
        });

        await newPlaylist.save();
        res.status(201).json({message: "Playlist created", playlist: newPlaylist})

    } catch (error) {
        res.status(500).json({error: "Failed to create playlist"})
    }
}

export const getUserPlaylist = async (req, res) => {
    try {
        const { id } = req.params;
        const playlists = await Playlist.find({ creator: id })
            .populate("creator", "username user_pfp")
            .populate("videos");
        res.status(201).json(playlists)

    } catch (error) {
        res.status(500).json({error: "Failed to fetch playlist"})
    }
}

export const toggleVideoPlaylist = async (req, res) => {
    try {

        const { playlistId, videoId } = req.body;
        const { action } = req.query;

        const playlist = await Playlist.findOne({ _id: playlistId, creator: req.user.id })
        if (!playlist) return res.status(404).json({error : "Playlist not found"});

        if (action === 'add') {
            await Playlist.findByIdAndUpdate(playlistId, { $addToSet: { videos: videoId } });
        } else if (action === 'remove') {
            await Playlist.findByIdAndUpdate(playlistId, { $pull: { videos: videoId } });
        }

        res.status(200).json({ message: `Video ${action}ed successfully!` });

    } catch (error) {
        res.status(500).json({error: "Failed to update playlist"})
    }
}

export const getPlaylistInfo = async (req, res) => {
    try {
        const { id } = req.params;

        const playlistInfo = await Playlist.findById(id)
            .populate("creator", "username user_pfp") 
            .populate({
                path: "videos",
                populate: {
                    path: "creator",
                    select: "username user_pfp" 
                }
            });
        res.status(201).json(playlistInfo)

    } catch (error) {
        res.status(500).json({error: "Failed to fetch playlist info"})
    }
}