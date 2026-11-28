import express from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import {
  getConversationList,
  getMessage,
  sendMessage,
} from "../controller/chat.controller.js";

const chatRouter = express.Router();

chatRouter.post("/send-message", sendMessage);
chatRouter.get("/get-conversation-list", getConversationList);
chatRouter.get("/get-message", getMessage);

export default chatRouter;
