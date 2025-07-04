import { Request, Response } from "express";
import { prisma } from "../prisma/client";
import { logger } from "../utils/utils";
import { paymentSchema } from "../validations/paymentSchema";

export const getAllPayment = async (req: Request, res: Response) => {
  logger.traceIn("Get All Payments");
  try {
    logger.debug("Fetching all payments from the database");
    const payments = await prisma.payment.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
      include: { transaction: true }
    });

    logger.debug(`Retrieved ${payments.length} payments`);
    res.status(200).json(payments);
  } catch (error) {
    logger.debug(`Error retrieving payments, ${JSON.stringify(error)}`);
    res.status(500).json({ message: "Error retrieving payments", error });
  } finally {
    logger.traceOut("Get All Payments");
  }
}

export const getPaymentById = async (req: Request, res: Response) => {
  logger.traceIn('Get Payment By Id');
  try {
    const { id } = req.params;
    const payment = await prisma.payment.findUnique({
      where: { id },
      include: { transaction: true },
    });

    if (!payment) {
      logger.error(`Payment not found for id ${id}`);
      res.status(404).json({ message: "Payment not found" });
      return;
    }

    res.status(200).json(payment);
  } catch (error) {
    logger.error(`Error fetching payment, ${JSON.stringify(error)}`);
    res.status(500).json({ message: "Error retrieving payment" });
    return;
  } finally {
    logger.traceOut('Get Payment By Id');
  }
}

export const createPayment = async (req: Request, res: Response) => {
  logger.traceIn("Create Payment");

  const parsed = paymentSchema.safeParse(req.body);

  if (!parsed.success) {
    logger.warn(`Validation failed. ${JSON.stringify(parsed.error)}`);
    res.status(400).json({ message: "Validation failed", errors: parsed.error.errors });
    return;
  }

  const { transactionId, date, amountPaid, balance, paymentMode } = parsed.data;

  try {
    logger.debug("Creating new payment in the database");
    const newPayment = await prisma.payment.create({
      data: {
        transactionId,
        date,
        amountPaid,
        balance,
        paymentMode,
      }
    });

    logger.info(`Payment created successfully with ID: ${newPayment.id}`);
    res.status(201).json(newPayment);
  } catch (error) {
    logger.error(`Error creating payment, ${JSON.stringify(error)}`);
    res.status(500).json({ message: "Error creating payment", error });
  } finally {
    logger.traceOut("Create Payment");
  }
}

export const updatePayment = async (req: Request, res: Response) => {
  logger.traceIn("Update Payment");
  const { id } = req.params;
  const parsed = paymentSchema.safeParse(req.body);

  if (!parsed.success) {
    logger.warn(`Validation failed: ${parsed.error}`);
    res.status(400).json({ message: "Validation failed", errors: parsed.error.errors });
    return;
  }

  const { amountPaid, balance, paymentMode } = parsed.data;

  try {
    logger.debug(`Updating transaction with ID: ${id}`);
    const updated = await prisma.payment.update({
      where: { id },
      data: {
        amountPaid,
        balance,
        paymentMode,
      },
    });

    logger.info(`Payment updated successfully with ID: ${updated.id}`);
    res.status(200).json(updated);
  } catch (error) {
    logger.error(`Error updating payment, ${JSON.stringify(error)}`);
    res.status(500).json({ message: "Error updating payment", error });
  } finally {
    logger.traceOut("Update Payment");
  }
}

export const deletePayment = async (req: Request, res: Response) => {
  logger.traceIn("Delete Payment");
  const { id } = req.params;

  try {
    logger.debug(`Deleting payment with ID: ${id}`);
    await prisma.payment.update({
      where: { id },
      data: { deletedAt: new Date() } // Soft delete by setting deletedAt
    });
    logger.info(`Payment deleted successfully with ID: ${id}`);
    res.status(204).send(); // No content response
  } catch (error) {
    logger.error(`Error deleting payment, ${JSON.stringify(error)}`);
    res.status(500).json({ message: "Error deleting payment", error });
  } finally {
    logger.traceOut("Delete Payment");
  }
}