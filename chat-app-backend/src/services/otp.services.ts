import { randomInt, createHmac, timingSafeEqual } from "node:crypto";
import redisClient from "../config/redis.js";

const OTP_TTL = 300;

export const generateAndSaveOtp = async (email: string) => {
  // 1. Generate 6 digit OTP
  const otp = randomInt(100000, 1000000).toString();

  // 2. Hash OTP
  const secret = process.env.OTP_SECRET;

  // CHECKING SCRETE AVILABLE
  if (!secret) {
    throw new Error("OTP_SECRET is missing");
  }

  //   CONVERT OTP IN HASH
  const hashedOtp = createHmac("sha256", secret).update(otp).digest("hex");

  // 3. Save in Redis with 5 minutes TTL
  await redisClient.set(`Otp:${email.toLocaleLowerCase().trim()}`, hashedOtp);

  // Internal use: controller will send this OTP through email
  return otp;
};

export const verifyOtp = async (
  email: string,
  enteredOtp: string,
): Promise<boolean> => {
  const key = `Otp:${email.toLocaleLowerCase().trim()}`;

  const storedOtp = await redisClient.get(key);

  if (!storedOtp) {
    return false;
  }

  // 2. Hash entered OTP
  const secret = process.env.OTP_SECRET;

  if (!secret) {
    throw new Error("OTP_SECRET is missing");
  }

  const hashedOtp = createHmac("sha256", secret)
    .update(enteredOtp)
    .digest("hex");

  // 3. Compare hashes safely
  const isValid = timingSafeEqual(
    Buffer.from(storedOtp, "hex"),
    Buffer.from(hashedOtp, "hex"),
  );

  // 4. Delete OTP after successful verification
  if (isValid) {
    redisClient.del(key);
  }

  return isValid;
};
