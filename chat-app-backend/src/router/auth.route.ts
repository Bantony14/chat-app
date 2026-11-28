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

const authRouter = express.Router();

authRouter.get("/check", (req, res) => {
  res.json({
    success: true,
    mesaage: "working",
  });
});

authRouter.post("/send-otp", sendOtp);
authRouter.post("/verify-otp", verifyOtpController);
authRouter.post("/user-create", userCreate);
authRouter.post("/login", loginUser);
authRouter.get("/get-user", authenticateUser, getUser);
authRouter.post("/forgot-password", forgotpassword);

export default authRouter;
