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

export const getConversationList = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { sender_id } = req.body;
    if (!sender_id) {
      return next(new AppError("sender_id is not found", 409));
    }

    const conversationList = await pool.query(
      `SELECT *
FROM (
    SELECT DISTINCT ON (user_id)
        CASE
            WHEN sender_id = $1 THEN receiver_id
            ELSE sender_id
        END AS user_id,
        message,
        created_at
    FROM conversation_history
    WHERE sender_id = $1 OR receiver_id = $1
    ORDER BY user_id, created_at DESC
) AS user_id
ORDER BY created_at DESC;
      `,
      [sender_id],
    );

    if (conversationList.rows.length < 1) {
      return next(new AppError("no message from any users", 409));
    }

    const countMsgNotSeen = await pool.query(
      `SELECT sender_id,COUNT(*) FROM conversation_history WHERE receiver_id = $1 AND seen = false GROUP BY sender_id`,
      [sender_id],
    );
    console.log(countMsgNotSeen?.rows);

    res.status(201).json({
      success: "true",
      message: "All list successfully done",
      conversationList: conversationList.rows,
    });
  } catch (error) {
    next(error);
  }
};

export const getMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { conversation_id, sender_id } = req.body;
    const client = await pool.connect();
    const currentTime = new Date().toISOString();

    if (!conversation_id) {
      return next(new AppError("conversation id not found", 400));
    }
    console.log("conversation_id:", conversation_id);

    let allMsg: any;
    try {
      await client.query(`BEGIN`);
      allMsg = await client.query(
        `SELECT sender_id,message,created_at,seen,seen_at FROM conversation_history WHERE chat_id = $1 ORDER BY created_at DESC`,
        [conversation_id],
      );

      await client.query(
        `UPDATE conversation_history 
        SET seen = $1 ,seen_at = $4
        WHERE receiver_id = $2 AND chat_id = $3 AND seen = false AND seen_at IS NULL`,
        [true, sender_id, conversation_id, currentTime],
      );

      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
    } finally {
      client.release();
    }

    if (allMsg?.rows?.length < 1 || !allMsg) {
      return next(new AppError("No Message Found", 401));
    }

    res.status(200).json({
      success: true,
      message: "All Message Found",
      allMsg: allMsg?.rows,
    });
  } catch (error) {
    next(error);
  }
};
