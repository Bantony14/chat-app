import express, { Router } from "express";

import { sendOtp } from "../controller/auth.controller.js";

const router = express.Router();

router.get("/check", (req, res) => {
  res.json({
    success: true,
    mesaage: "working",
  });
});

router.post("/send-otp", sendOtp);

export default router;
