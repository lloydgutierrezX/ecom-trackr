import { Request, Response } from "express";
import { prisma } from "../prisma/client";
import { logger } from "../utils/utils";
import { transactionSchema } from "../validations/transactionSchema";

export const getAllTransactions = async (req: Request, res: Response) => {
  logger.traceIn("Get All Transactions");
  try {
    logger.debug("Fetching all transactions from the database");
    const transactions = await prisma.transaction.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
      include: {
        client: true,
        item: true,
        payments: true,
      }
    });

    logger.debug(`Retrieved ${transactions.length} transactions`);
    res.status(200).json(transactions);
  } catch (error) {
    logger.debug(`Error retrieving transactions, ${JSON.stringify(error)}`);
    res.status(500).json({ message: "Error retrieving transactions", error });
  } finally {
    logger.traceOut("Get All Transactions");
  }
}

export const createTransaction = async (req: Request, res: Response) => {
  logger.traceIn("Create Transaction");

  const tempWeight = Number(req.body.weight);
  const tempPrice = Number(req.body.price);
  const tempTotal = tempWeight * tempPrice;

  const data = { ...req.body, total: tempTotal };
  const parsed = transactionSchema.safeParse(data);

  if (!parsed.success) {
    logger.warn(`Validation failed. ${JSON.stringify(parsed.error)}`);
    res.status(400).json({ message: "Validation failed", errors: parsed.error.errors });
    return;
  }

  const { clientId, itemId, weight, price, paymentType, status, total } = parsed.data;

  try {
    logger.debug("Creating new transaction in the database");
    const newTransaction = await prisma.transaction.create({
      data: {
        clientId,
        itemId,
        weight,
        price,
        total,
        paymentType,
        status,
      },
    });

    logger.info(`Transaction created successfully with ID: ${newTransaction.id}`);
    res.status(201).json(newTransaction);
  } catch (error) {
    logger.error(`Error creating transaction, ${JSON.stringify(error)}`);
    res.status(500).json({ message: "Error creating transaction", error });
  } finally {
    logger.traceOut("Create Transaction");
  }
}

export const updateTransaction = async (req: Request, res: Response) => {
  logger.traceIn("Update Transaction");
  const { id } = req.params;

  const tempWeight = Number(req.body.weight);
  const tempPrice = Number(req.body.price);
  const tempTotal = tempWeight * tempPrice;

  const data = { ...req.body, total: tempTotal };
  const result = transactionSchema.safeParse(data);

  if (!result.success) {
    logger.warn(`Validation failed: ${result.error}`);
    res.status(400).json({ message: "Validation failed", errors: result.error.errors });
    return;
  }

  const { clientId, itemId, weight, price, paymentType, status } = result.data;

  try {
    const total = weight * price;

    logger.debug(`Updating transaction with ID: ${id}`);
    const updated = await prisma.transaction.update({
      where: { id },
      data: {
        clientId,
        itemId,
        weight,
        price,
        total,
        paymentType,
        status,
      },
    });

    logger.info(`Transaction updated successfully with ID: ${updated.id}`);
    res.status(200).json(updated);
  } catch (error) {
    logger.error(`Error updating transaction, ${JSON.stringify(error)}`);
    res.status(500).json({ message: "Error updating transaction", error });
  } finally {
    logger.traceOut("Update Transaction");
  }
}

export const deleteTransaction = async (req: Request, res: Response) => {
  logger.traceIn("Delete Transaction");
  const { id } = req.params;

  try {
    logger.debug(`Deleting transaction with ID: ${id}`);
    await prisma.transaction.update({
      where: { id },
      data: { deletedAt: new Date() } // Soft delete by setting deletedAt
    });
    logger.info(`Transaction deleted successfully with ID: ${id}`);
    res.status(204).send(); // No content response
  } catch (error) {
    logger.error(`Error deleting transaction, ${JSON.stringify(error)}`);
    res.status(500).json({ message: "Error deleting transaction", error });
  } finally {
    logger.traceOut("Delete Transaction");
  }
}