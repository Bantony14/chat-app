import express, { Router } from "express";
import { errorHandler } from "./middleware/error.middleware.js";
import router from "./router/auth.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/v1", router);
app.use(errorHandler);

export default app;
