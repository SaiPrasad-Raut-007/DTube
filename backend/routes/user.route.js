import express from "express";
import {
  checkSubscriptionStatus,
  getChannelProfile,
  getSubscribedChannels,
  getUserProfile,
  subscribe,
  updateUserProfile,
  getLikedVideos,
  getWatchedVideos,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { uploadImage } from "../middleware/upload.js";
import { uploadAvatar, uploadBanner } from "../controllers/image.controller.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

router.get("/profile", protectRoute, getUserProfile);
router.post("/profile", protectRoute, updateUserProfile);
router.get("/channel/:id", getChannelProfile);
router.put(
  "/update-avatar",
  protectRoute,
  uploadImage.single("avatar"),
  uploadAvatar,
);
router.put(
  "/update-banner",
  protectRoute,
  uploadImage.single("banner"),
  uploadBanner,
);
router.post("/subscribe/:channelId", protectRoute, subscribe);
router.get(
  "/check-subscription/:channelId",
  protectRoute,
  checkSubscriptionStatus,
);
router.get("/subscriptions", protectRoute, getSubscribedChannels);
router.get("/liked", protectRoute, getLikedVideos);
router.get("/watched", protectRoute, getWatchedVideos);

export default router;
