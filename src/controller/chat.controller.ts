import type { Response, Request, NextFunction } from "express";
import pool from "../config/db.connect.js";
import { AppError } from "../utlis/AppError.js";

export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { sender_id, receiver_id, message } = req.body;

    console.log("start");

    // Finding conversation data
    const findConversationId = await pool.query(
      `SELECT *
       FROM conversation_id
       WHERE (user_1 = $1 AND user_2 = $2)
          OR (user_1 = $2 AND user_2 = $1)`,
      [sender_id, receiver_id],
    );

    console.log("sender_id:", sender_id);
    console.log("receiver_id:", receiver_id);

    let conversationData;

    if (findConversationId.rows.length < 1) {
      // Creating a new conversation
      conversationData = await pool.query(
        `INSERT INTO conversation_id (user_1, user_2)
         VALUES ($1, $2)
         RETURNING *`,
        [sender_id, receiver_id],
      );
    }

    const conversationId =
      findConversationId.rows[0]?.chat_id || conversationData?.rows[0]?.chat_id;

    if (!conversationId) {
      return next(new AppError("Conversation ID not found", 400));
    }

    // Sending message
    await pool.query(
      `INSERT INTO conversation_history
       (chat_id, sender_id, receiver_id, message)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [conversationId, sender_id, receiver_id, message],
    );

    res.status(200).json({
      success: true,
      message: "Chat sent successfully",
    });
  } catch (error) {
    next(error);
  }
};
