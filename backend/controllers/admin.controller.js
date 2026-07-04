import User from "../models/User.js";
import Video from "../models/Video.js";
import Comment from "../models/Comment.js";
import { removeVideoFromS3 } from "../middleware/remove.js";
import Playlist from "../models/Playlists.js";

export const toggleBanChannel = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.role === "Admin") {
      return res
        .status(403)
        .json({ error: "This action cannot be performed on other admins" });
    }

    user.isBanned = !user.isBanned;
    await user.save();

    res
      .status(200)
      .json({
        message: `User ${user.isBanned ? "banned" : "unbanned"} successfully`,
      });
  } catch (error) {
    res.status(500).json({ error: "Server error while banning channel" });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }

    const videoUrlObject = new URL(video.video_url);
    const thumbnailUrlObject = new URL(video.thumbnail);

    const videoKey = videoUrlObject.pathname.substring(1);
    const thumbnailKey = thumbnailUrlObject.pathname.substring(1);

    await removeVideoFromS3(videoKey, thumbnailKey);

    await Video.findByIdAndDelete(videoId);

    await User.updateMany(
      { liked_videos: videoId },
      { $pull: { liked_videos: videoId } },
    );

    await User.updateMany(
      { watch_history: videoId },
      { $pull: { watch_history: videoId } },
    );

    await Playlist.updateMany(
      { videos: videoId },
      { $pull: { videos: videoId } },
    );

    await Comment.deleteMany({ video_id: videoId });

    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error while deleting video" });
  }
};
