import express from "express";
import {
  fetchAllComments,
  createComment,
  likeComment,
  fetchReplies,
} from "../controllers/comment.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/fetch/:videoId", fetchAllComments);
router.post("/create/:videoId", protectRoute, createComment);
router.post("/like/:commentId", protectRoute, likeComment);
router.get("/replies/:commentId", fetchReplies);

export default router;
