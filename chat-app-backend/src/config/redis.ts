import { createClient, type RedisClientType } from "redis";

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  throw new Error("REDIS_URL is missing");
}

const redisClient = createClient({
  url: redisUrl,
});

export default redisClient;
