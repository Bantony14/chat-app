import express from "express";

import {
  sendOtp,
  userCreate,
  verifyOtpController,
} from "../controller/auth.controller.js";

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

export default router;
