import express from "express";
import {
  createPlaylist,
  getPlaylistInfo,
  getUserPlaylist,
  toggleVideoPlaylist,
} from "../controllers/playlist.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/create", protectRoute, createPlaylist);
router.get("/channel-playlists/:id", getUserPlaylist);
router.put("/toggle-video", protectRoute, toggleVideoPlaylist);
router.get("/playlist-info/:id", getPlaylistInfo);

export default router;
