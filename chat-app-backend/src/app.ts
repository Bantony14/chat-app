import express, { Router } from "express";
import { errorHandler } from "./middleware/error.middleware.js";
import authRouter from "./router/auth.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import chatRouter from "./router/chat.route.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());

app.use("/api/v1", authRouter);
app.use("/api/v2", chatRouter);
app.use(errorHandler);

export default app;
