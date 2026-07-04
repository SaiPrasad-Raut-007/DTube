import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { isAdmin } from "../middleware/isAdmin.js";
import {
  deleteVideo,
  toggleBanChannel,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.delete("/delete-video/:videoId", protectRoute, isAdmin, deleteVideo);
router.put("/ban/:userId", protectRoute, isAdmin, toggleBanChannel);

export default router;
