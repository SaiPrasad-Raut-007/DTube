import express from "express";
import { uploadImage, uploadVideo } from "../middleware/upload.js";
import {
  editVideoDetailes,
  fetchVideo,
  getChannelVideoCount,
  getCreatorVideos,
  getSubscribedVideos,
  getVideoList,
  upload,
  uploadVideoInfo,
  incrementViewCount,
  toggleLike,
  searchVideos,
} from "../controllers/video.controller.js";
import { uploadThumbnail } from "../controllers/image.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { deleteVideo } from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/upload-video", uploadVideo.single("videoFile"), upload);
router.post(
  "/upload-thumbnail",
  uploadImage.single("thumbnail"),
  uploadThumbnail,
);
router.post("/upload-video-info", protectRoute, uploadVideoInfo);
router.get("/channel-videos/:id", getCreatorVideos);
router.post(
  "/edit-video-details/:videoId",
  protectRoute,
  uploadImage.single("thumbnail"),
  editVideoDetailes,
);
router.get("/all-videos", getVideoList);
router.get("/fetch/:id", fetchVideo);
router.get("/count/:id", getChannelVideoCount);
router.get("/subscriptions", protectRoute, getSubscribedVideos);
router.put("/view/:videoId", protectRoute, incrementViewCount);
router.post("/like/:videoId", protectRoute, toggleLike);
router.get("/search", searchVideos);
router.delete("/delete/:videoId", deleteVideo);

export default router;
