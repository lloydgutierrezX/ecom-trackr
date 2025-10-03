import { Request } from "express";

export const getCookieOptions = (req: Request) => {
  const isProduction = process.env.NODE_ENV === "production";
  const isLocalhost = req.hostname === "localhost" || req.hostname === "127.0.0.1";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: (isLocalhost ? "lax" : "none") as "lax" | "none",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days,
    domain: req.hostname
  };
}

export const getClearCookieOptions = (req: Request) => {
  const base = getCookieOptions(req);
  const { maxAge, ...rest } = base;
  return rest;
}