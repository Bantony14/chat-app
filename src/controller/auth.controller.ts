import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utlis/AppError.js";
import { hashPassword } from "../utlis/hash&comparePassword.js";
import pool from "../config/db.connect.js";
import { sendOtpEmail } from "../services/email.service.js";
import { generateAndSaveOtp, verifyOtp } from "../services/otp.services.js";
import redisClient from "../config/redis.js";

export const sendOtp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.body;

    const otp = await generateAndSaveOtp(email);

    if (!otp) {
      next(new AppError("otp generation failed", 400));
    }
    sendOtpEmail(email);

    res.status(201).json({
      success: true,
      message: "OTP SEND SCCESSEFULLY",
    });
  } catch (error) {
    console.error(error);
  }
};

export const verifyOtpController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, otp } = req.body;
    const status = true;

    if (!email || !otp) {
      next(new AppError("Email and OTP are required", 400));
    }

    const verifyStatus = await verifyOtp(email, otp);

    if (!verifyStatus) {
      next(new AppError("otp verification falied", 409));
    }

    await redisClient.set(
      `verify:${email.toLowerCase().trim()}:status`,
      "true",
      { EX: 300 },
    );

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const userCreate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { fullname, username, email, password } = req.body;

    const requiredFields = [fullname, username, email, password];

    // CHECKING REQUIRED FIELDS
    for (let i = 0; i < requiredFields.length; i++) {
      if (!requiredFields[i]) {
        return next(new AppError("All fields are required", 400));
      }
    }

    const key = await redisClient.get(`verify:${email}:status`);

    if (!key) {
      next(new AppError("EMAIL VERFICATION FAILED", 409));
    }

    // CHECKING EXISTING USER
    const existingUser = await pool.query(
      `SELECT email, username FROM users
       WHERE email = $1 OR username = $2`,
      [email, username],
    );

    if (existingUser.rows.length > 0) {
      const user = existingUser.rows[0];

      if (user.email === email) {
        return next(new AppError("Email already exists", 409));
      }

      if (user.username === username) {
        return next(new AppError("Username already exists", 409));
      }
    }

    // HASH PASSWORD
    const securePassword = await hashPassword(password);
  } catch (error: unknown) {
    return next(error);
  }
};
