import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utlis/AppError.js";
import {
  comparePassword,
  hashPassword,
} from "../utlis/hash&comparePassword.js";
import pool from "../config/db.connect.js";
import { sendOtpEmail } from "../services/email.service.js";
import { generateAndSaveOtp, verifyOtp } from "../services/otp.services.js";
import redisClient from "../config/redis.js";
import { generateToken } from "../utlis/jwtTokenGen.js";

// ALL API START FROM HERE

export const sendOtp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, forgotPassword } = req.body;
    console.log("forgotPassword:", forgotPassword);

    const findUser = await pool.query(
      "SELECT email FROM users WHERE email = $1",
      [email],
    );

    if (!forgotPassword && findUser.rows[0]) {
      next(new AppError("This email is exist", 400));
    }

    const otp = await generateAndSaveOtp(email);

    console.log("email", email);
    console.log("otp", otp);

    if (!otp) {
      next(new AppError("otp generation failed", 400));
    }

    sendOtpEmail({ email, otp });

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

    const key = await redisClient.get(
      `verify:${email.toLowerCase().trim()}:status`,
    );

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

    // console.log(securePassword, ":securepasword");

    //  CREATING THE NEW USER
    const userResult = await pool.query(
      `INSERT INTO users (fullname,username,email,password)
    VALUES ($1,$2,$3,$4)
    RETURNING id, fullname, username, email
    `,
      [fullname, username, email, securePassword],
    );

    // console.log("userREsult :", userResult);

    if (userResult.rows.length < 1) {
      next(new AppError("user create failed", 400));
    }

    await redisClient.del(`verify:${email}:status`);

    const token = generateToken(
      userResult.rows[0].id,
      userResult.rows[0].email,
    );

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "user created successfully",
    });
  } catch (error: unknown) {
    return next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
      throw new AppError("Email and password are required", 400);
    }

    // 2. Find user
    const userResult = await pool.query(
      `SELECT id, fullname, username, email, password
       FROM users
       WHERE email = $1`,
      [email],
    );

    const user = userResult.rows[0];

    // 3. Check user exists
    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    // 4. Compare password
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", 401);
    }

    const token = generateToken(user.id, user.email);

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
      path: "/",
    });

    // 5. Success response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.userId;
    console.log("strat");

    console.log("userId :", userId);

    if (!userId) {
      next(new AppError("User id not found from the token of jwt"));
    }

    const result = await pool.query(
      `SELECT id, fullname, username, email
       FROM users
       WHERE id = $1`,
      [userId],
    );

    if (result.rows.length === 0) {
      throw new AppError("User not found", 404);
    }

    return res.status(200).json({
      success: true,
      user: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

export const forgotpassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      next(new AppError("Please Enter Email And Password", 400));
    }

    const key = await redisClient.get(
      `verify:${email.toLowerCase().trim()}:status`,
    );

    if (!key) {
      next(new AppError("Email Verification Failed "));
    }

    // Finding a user
    const findUser = await pool.query(
      `SELECT email FROM users 
    WHERE email = $1`,
      [email],
    );

    if (findUser?.rows[0].length < 0) {
      next(new AppError("Email Not Found", 401));
    }

    // Updating Password
    const strongPassword = await hashPassword(password);

    pool.query(`UPDATE users SET password = $1 WHERE email = $2`, [
      strongPassword,
      email,
    ]);

    res.status(200).json({
      success: "True",
      message: "Password Updated Successfully",
    });
  } catch (error) {
    next(error);
  }
};
