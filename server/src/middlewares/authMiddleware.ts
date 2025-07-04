import { Request, Response } from "express";
import { NextFunction } from "express";

import jwt from "jsonwebtoken";
import { logger } from "../utils/utils";


const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export const authencicateToken = (req: Request, res: Response, next: NextFunction): void => {
  logger.traceIn('authencicateToken');

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    logger.error("Token missing in request headers");
    res.status(401).json({ message: 'Access token missing.' }); // Unauthorized
    return;
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      logger.error(`Token verification failed: ${JSON.stringify(err)}`);
      res.status(403).json({ message: "Invalid token" }); // Forbidden
      return;
    }

    (req as any).user = user; // Attach user info to request object
    logger.info(`Token verified successfully for user: ${JSON.stringify(user)}`);

    logger.traceOut("authencicateToken");

    next(); // Proceed to the next middleware or route handler
  });
}