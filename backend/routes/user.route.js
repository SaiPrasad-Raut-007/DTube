import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/user.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.get("/profile", protectRoute, getUserProfile);
router.post("/profile",protectRoute, updateUserProfile);

export default router;