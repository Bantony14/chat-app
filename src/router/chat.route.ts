import express from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import {
  getConversationList,
  sendMessage,
} from "../controller/chat.controller.js";

const chatRouter = express.Router();

chatRouter.post("/send-message", sendMessage);
chatRouter.get("/get-conversation-list", getConversationList);

export default chatRouter;
