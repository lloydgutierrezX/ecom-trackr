import { Request, Response } from "express";
import { prisma } from "../prisma/client";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { logger } from "../utils/utils";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const registerUser = async (req: Request, res: Response): Promise<void> => {

  logger.traceIn("Register User");

  const { name, email, password } = req.body;
  try {
    logger.info("Validating user input...");
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      logger.warn(`User already exists with email: ${email}`);
      res.status(400).json({ message: "Email already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    logger.info("Creating new user in the database...");
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    logger.info(`User created successfullywith ID: ${newUser.id}`);
    res.status(201).json({ message: "User registered successfully", userId: newUser.id });
    return;
  } catch (error) {
    logger.error(`Error registering user: ${JSON.stringify(error)}`);
    res.status(500).json({ message: "Internal server error" });
    return;
  } finally {
    logger.traceOut("Register User");
  }
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  logger.traceIn("Login User");
  const { email, password } = req.body;

  try {
    logger.info("Validating user credentials...")
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      logger.warn(`User not found for email: ${email}`);
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      logger.warn(`Invalid password for user: ${email}`)
      res.status(401).json({ message: "Invalid creadentials" });
      return;
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" });

    logger.info("User authenticated successfully, generating token...");
    res.status(200).json({ message: "Login successful", token });
    return;
  } catch (error) {
    logger.error(`Error logging in user: ${JSON.stringify(error)}`);
    res.status(500).json({ message: "Internal server error" });
    return;
  } finally {
    logger.traceOut("Login User");
  }
}
