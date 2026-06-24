import './PlaylistCard.css'; 

export const PlaylistCard = ({ channel_name, channel_pic, playlist_name, thumbnail, video_count }) => {
    return (
        <div className="playlist-card">
            <div className="playlist-thumbnail-container">
                <img className="playlist-thumbnail" src={thumbnail} alt={playlist_name} />
                
                <div className="playlist-overlay">
                    <span className="material-symbols-rounded">playlist_play</span>
                    <span className="playlist-video-count">{video_count} videos</span>
                </div>
                
                <div className="playlist-hover-play">
                    <span className="material-symbols-rounded">play_arrow</span>
                    <span>Play all</span>
                </div>
            </div>
            
            <div className="playlist-info-container">
                <h4 className="playlist-title">{playlist_name}</h4>
                <div className="playlist-channel-details">
                    <span className="playlist-channel-name">{channel_name}</span>
                </div>
                <span className="playlist-subtitle">View full playlist</span>
            </div>
        </div>
    );
};

export const MixPlaylistCard = ({ channel_name_list = [], mix_name, thumbnail }) => {
    const channelsString = channel_name_list.join(", ");

    return (
        <div className="mix-playlist-card">
            <div className="playlist-thumbnail-container">
                <img className="playlist-thumbnail" src={thumbnail} alt={mix_name} />
                
                <div className="mix-overlay">
                    <span className="material-symbols-rounded">queue_music</span>
                    <span className="mix-label">Mix</span>
                </div>

                <div className="playlist-hover-play">
                    <span className="material-symbols-rounded">play_arrow</span>
                    <span>Play all</span>
                </div>
            </div>
            
            <div className="playlist-info-container">
                <h4 className="playlist-title">{mix_name}</h4>
                <p className="playlist-channels-list">{channelsString}</p>
            </div>
        </div>
    );
};