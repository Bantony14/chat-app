import express from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { sendMessage } from "../controller/chat.controller.js";

const chatRouter = express.Router();

chatRouter.post("/send-message", sendMessage);

export default chatRouter;
