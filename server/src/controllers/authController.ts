import { Request, Response } from "express";
import { prisma } from "../prisma/client";

import bcrypt from "bcryptjs";
import crypto from 'crypto';
import jwt from "jsonwebtoken";
import { logger } from "../utils/utils";
import { registerSchema } from "../validations/registerSchema";
import z from "zod";
import { sendEmail } from "../services/emailService";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const verifyEmail = async (req: Request, res: Response): Promise<void> => {
  logger.traceIn("Verify Email");

  try {
    const { token, email } = req.query;

    logger.info("Validating user and email...");
    if (!token || !email) {
      logger.error('Missing token or email.');
      res.status(400).json({ message: 'Missing token or email.' });
      return;
    }

    const user = await prisma.user.findUnique({ where: { email: email.toString() } });

    logger.info("Validating email verification");
    if (!user || !user.verificationToken) {
      logger.error('Invalid verification request.');
      res.status(400).json({ message: 'Invalid verification request.' });
      return;
    }

    logger.info("Validating token...");
    const isMatch = await bcrypt.compare(token.toString(), user?.verificationToken ?? '');
    if (!isMatch) {
      logger.error('Invalid or expired token.');
      res.status(400).json({ message: 'Invalid or expired token.' });
      return;
    }

    await prisma.user.update({
      where: { email: email.toString() },
      data: {
        isVerified: true,
        verificationToken: null
      }
    });

    res.status(200).json({ message: 'Email verified successfully.' });
    return;

  } catch (error) {
    logger.error(`Error verifying email: ${JSON.stringify(error)}`);
    res.status(500).json({ message: "Server error" });
    return;
  } finally {
    logger.traceOut("Verify Email");
  }
}

export const registerUser = async (req: Request, res: Response): Promise<void> => {

  logger.traceIn("Register User");

  try {

    const parsed = registerSchema.parse(req.body);

    const { name, email, password } = req.body;
    logger.info("Validating user input...");
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      logger.warn(`User already exists with email: ${email}`);
      res.status(400).json({ message: "Email already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const rawToken = crypto.randomBytes(32).toString();
    const hashedToken = await bcrypt.hash(rawToken, 10);

    logger.info("Creating new user in the database...");
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        verificationToken: hashedToken,
        verificationTokenExpires: new Date(Date.now() + 1000 * 60 * 60)
      },
    });

    const verificationLink = `${process.env.FRONTEND_URL}/verify?token=${hashedToken}`

    await sendEmail({
      to: email,
      subject: "Verify Your Account",
      template: "verifyEmail",
      data: { verificationLink }
    })

    logger.info(`User created successfullywith ID: ${newUser.id}`);
    res.status(201).json({ message: "User registered successfully, check your email to verify.", userId: newUser.id });
    return;
  } catch (error) {

    if (error instanceof z.ZodError) {
      logger.error(`Error on Zod validation: ${JSON.stringify(error)}`);
      res.status(400).json({ message: 'Validation Error', errors: error.errors });
      return;
    }

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
