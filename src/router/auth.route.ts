import express from "express";

import {
  forgotpassword,
  getUser,
  loginUser,
  sendOtp,
  userCreate,
  verifyOtpController,
} from "../controller/auth.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/check", (req, res) => {
  res.json({
    success: true,
    mesaage: "working",
  });
});

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtpController);
router.post("/user-create", userCreate);
router.post("/login", loginUser);
router.get("/get-user", authenticateUser, getUser);
router.post("/forgot-password", forgotpassword);

export default router;
