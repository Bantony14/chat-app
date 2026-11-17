import type { ErrorRequestHandler } from "express";
import { AppError } from "../utlis/AppError.js";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err instanceof AppError ? err.statusCode : 500;

  const message =
    err instanceof AppError ? err.message : "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message: err.message,
  });
};
