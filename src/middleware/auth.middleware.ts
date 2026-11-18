import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utlis/AppError.js";

interface JwtPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      next(new AppError("Token missing", 500));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    req.user = decoded;
    console.log("done");

    next();
  } catch (error) {
    next(error);
  }
};
