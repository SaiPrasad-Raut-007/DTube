import express, { Router } from "express";
import {
  signup,
  login,
  generateSecurityToken,
  sendResetMail,
  ResetPassword,
} from "../controllers/auth.controller.js";
import { checkUserEmail } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post(
  "/forgot-password",
  checkUserEmail,
  generateSecurityToken,
  sendResetMail,
);
router.post("/reset-password/:token", ResetPassword);

export default router;
