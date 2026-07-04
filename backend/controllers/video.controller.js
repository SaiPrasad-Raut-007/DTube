import User from "../models/User.js";
import Video from "../models/Video.js";
import Comment from "../models/Comment.js";

export const upload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No video file provided" });
    }

    const s3VideoUrl = req.file.location;

    res.status(200).json({
      message: "Video file uploaded to s3 successfully!",
      videoUrl: s3VideoUrl,
    });
  } catch (error) {
    console.error("Video Upload Error: ", error);
    res.status(500).json({ error: "Failed to upload video to AWS S3" });
  }
};

export const uploadVideoInfo = async (req, res) => {
  try {
    const userId = req.user.id;

    const { title, description, duration, videoUrl, thumbnailUrl } = req.body;

    if (!title || !duration || !videoUrl || !thumbnailUrl) {
      return res
        .status(400)
        .json({ error: "Missing required video information" });
    }

    const newVideo = new Video({
      title: title,
      description: description || "",
      duration: duration,
      thumbnail: thumbnailUrl,
      video_url: videoUrl,
      creator: userId,
    });

    await newVideo.save();

    res.status(201).json({
      message: "Video published successfully",
      video: newVideo,
    });
  } catch (error) {
    console.error("Save Video Info Error:", error);
    res
      .status(500)
      .json({ error: "Failed to save video information to the database" });
  }
};

export const getCreatorVideos = async (req, res) => {
  try {
    const { id } = req.params;
    const videos = await Video.find({ creator: id }).sort({ createdAt: -1 });
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch your videos" });
  }
};

export const editVideoDetailes = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { title, description } = req.body;

    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ error: "Video not found" });

    if (video.creator.toString() !== req.user.id.toString()) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    video.title = title || video.title;
    video.description = description || video.description;

    if (req.file) {
      video.thumbnail = req.file.location;
    }

    await video.save();
    res.status(200).json({ message: "Video updated successfully!", video });
  } catch (error) {
    res.status(500).json({ error: "Failed to update video" });
  }
};

export const getVideoList = async (req, res) => {
  try {
    const videoList = await Video.find()
      .populate("creator", "username user_pfp")
      .sort({ createdAt: -1 });
    res.status(201).json(videoList);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the videos" });
  }
};

export const fetchVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id).populate(
      "creator",
      "username user_pfp subscribers",
    );

    if (!video) return res.status(404).json({ error: "Video not found" });

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ error: "Server error while fetching video" });
  }
};

export const getChannelVideoCount = async (req, res) => {
  try {
    const { id } = req.params;
    const count = await Video.countDocuments({ creator: id });
    res.status(200).json({ count });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Server error while fetching channel videos count" });
  }
};

export const getSubscribedVideos = async (req, res) => {
  try {
    const userId = await User.findById(req.user.id);
    const subscribedVideos = await Video.find({
      creator: { $in: userId.subscribed_to },
    })
      .populate("creator", "username user_pfp")
      .sort({ createdAt: -1 });

    res.status(200).json(subscribedVideos);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Server error while fetching subscribed channel's videos",
      });
  }
};

export const incrementViewCount = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.user.id;

    const video = await Video.findByIdAndUpdate(
      videoId,
      { $inc: { view_count: 1 } },
      { new: true },
    );

    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }

    if (userId) {
      await User.findByIdAndUpdate(userId, {
        $addToSet: { watch_history: videoId },
      });
    }

    res.status(200).json({ view_count: video.view_count });
  } catch (error) {
    res.status(500).json({ error: "Server error incrementing view count" });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const hasLiked = user.liked_videos.some((id) => id.toString() === videoId);

    if (hasLiked) {
      await User.findByIdAndUpdate(userId, {
        $pull: { liked_videos: videoId },
      });
      const video = await Video.findByIdAndUpdate(
        videoId,
        { $inc: { like_count: -1 } },
        { new: true },
      );
      res.status(200).json({ isLiked: false, like_count: video.like_count });
    } else {
      await User.findByIdAndUpdate(userId, {
        $push: { liked_videos: videoId },
      });
      const video = await Video.findByIdAndUpdate(
        videoId,
        { $inc: { like_count: 1 } },
        { new: true },
      );
      res.status(200).json({ isLiked: true, like_count: video.like_count });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error toggling like" });
  }
};

export const searchVideos = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const videos = await Video.find({
      title: { $regex: q, $options: "i" },
    })
      .populate("creator", "username user_pfp")
      .sort({ createdAt: -1 });

    const channels = await User.find({
      username: { $regex: q, $options: "i" },
    }).select("username user_pfp subscribers user_handle");

    res.status(200).json({
      channel_list: channels,
      videos: videos,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error during search" });
  }
};
