import app from "./app.js";
import pool from "./config/db.connect.js";
import type { QueryResult } from "pg";
import redisClient from "./config/redis.js";

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    const result: QueryResult = await pool.query("SELECT NOW()");

    console.log("☑️  Database Connected Successfully");
    console.log("Database Time:", result.rows[0]);
    await redisClient.connect();

    app.listen(PORT, () => {
      console.log("✅ SERVER RUNNING ON PORT", PORT);
    });
  } catch (error) {
    console.error("Database Connection Failed:", error);
  }
};

startServer();
