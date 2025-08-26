import { Request, Response } from "express";
import { prisma } from "../prisma/client";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { logger } from "../utils/utils";
import { registerSchema } from "../validations/registerSchema";
import z from "zod";
import { sendEmail } from "../services/emailService";
import { generateToken } from "../utils/token";
import { addHours } from "../utils/date";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {

  logger.traceIn('Forgot Password');
  const { email } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      logger.error(`No user found in this email: ${email}`);
      res.status(400).json({ message: "User not found with this email." });
      return;
    }

    const { rawToken, hashedToken } = await generateToken();

    await prisma.user.update({
      where: { email },
      data: {
        resetPasswordToken: hashedToken,
        resetPasswordExpires: addHours(1)
      },
    });

    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${rawToken}`;

    const info = await sendEmail({
      to: email,
      subject: "Reset Your Password",
      template: "resetPassword",
      data: { name: user.name, resetLink }
    });

    logger.info(`Reset password link has been sent with ID: ${info.id}`);
    res.status(201).json({ message: "Password reset link sent to your email" });
    return;

  } catch (error) {
    logger.error(`Error in forgot password: ${JSON.stringify(error)}`);
    res.status(500).json({ message: "Server error" });
  } finally {
    logger.traceOut('Forgot Password');
  }
}

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  logger.traceIn('Reset Password');

  try {

    const { token, password } = req.body;

    if (!token || !password) {
      logger.error('Token and password is required');
      res.status(400).json({ message: 'Token and password are required' });
      return;
    }

    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: { not: null },
        resetPasswordExpires: { gt: new Date() }
      }
    });

    console.log(token, user)

    if (!user) {
      logger.error('Invalid or expired token.');
      res.status(400).json({ message: 'Invalid or expired token.' });
      return;
    }

    logger.info("Comparing user.resetPasswordToken to token");
    const isMatch = await bcrypt.compare(
      token.toString(),
      user.resetPasswordToken ?? ""
    );

    if (!isMatch) {
      logger.error('Invalid or expired token.');
      res.status(400).json({ message: 'Invalid or expired token.' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordExpires: null,
        resetPasswordToken: null
      }
    });

    logger.info('Password has been reset successfully.');
    res.json({ message: 'Password has been reset successfully.' });
    return;

  } catch (error) {
    logger.error(`Error in reset password: ${JSON.stringify(error)}`);
    res.status(500).json({ message: "Server error" });
    return;
  } finally {
    logger.traceOut('Reset Password');
  }
}

export const verifyEmail = async (req: Request, res: Response): Promise<void> => {
  logger.traceIn("Verify Email");

  try {
    const { token } = req.query;
    logger.info("Validating token");
    if (!token) {
      logger.error('Missing token.');
      res.status(400).json({ message: 'Missing token or email.' });
      return;
    }

    logger.info("Getting list of users with verification token");
    const user = await prisma.user.findFirst({ where: { verificationToken: { not: null } } });
    if (!user) {
      logger.error('Invalid verification request.');
      res.status(400).json({ message: 'Invalid verification request' });
      return;
    }

    logger.info("Comparing user.verificationToken to token");
    const isMatch = await bcrypt.compare(
      token.toString(),
      user.verificationToken ?? ""
    );

    if (!isMatch) {
      logger.error('Invalid or expired token.');
      res.status(400).json({ message: 'Invalid or expired token.' });
      return;
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verificationToken: null
      }
    });

    res.status(200).json({ message: 'Email verified successfully.' });
    return;

  } catch (error) {
    logger.error(`Error in verifying email: ${JSON.stringify(error)}`);
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
    const { name, email, password } = parsed;

    logger.info("Validating user input...");
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      logger.warn(`User already exists with email: ${email}`);
      res.status(400).json({ message: "Email already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const { rawToken, hashedToken } = await generateToken();

    logger.info("Creating new user in the database...");
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        verificationToken: hashedToken,
        verificationTokenExpires: addHours(1)
      },
    });

    const verificationLink = `${process.env.CLIENT_URL}/verify?token=${rawToken}`

    await sendEmail({
      to: email,
      subject: "Verify Your Account",
      template: "verifyEmail",
      data: { name, verificationLink }
    })

    logger.info(`User created successfullywith ID: ${newUser.id}`);
    res.status(201).json({ message: "User registered successfully, check your email to verify." });
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
