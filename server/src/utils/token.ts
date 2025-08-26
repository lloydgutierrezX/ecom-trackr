import crypto from "crypto";
import bcrypt from "bcryptjs";

export const generateToken = async () => {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = await bcrypt.hash(rawToken, 10);

  return { rawToken, hashedToken }
}