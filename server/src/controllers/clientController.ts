import { Request, Response } from "express";
import { prisma } from "../prisma/client";
import { logger } from "../utils/utils";
import { clientSchema } from "../validations/clientSchema";

export const getAllClients = async (req: Request, res: Response) => {
  logger.traceIn("Get All Clients");
  try {
    logger.debug("Fetching all clients from the database");
    const clients = await prisma.client.findMany({
      where: { deletedAt: null }, // Ensure we only get non-deleted clients
      orderBy: { createdAt: "desc" }
    });

    logger.debug(`Retrieved ${clients.length} clients`);
    res.status(200).json(clients);
  } catch (error) {
    logger.debug(`Error retrieving clients: ${JSON.stringify(error)}`);
    res.status(500).json({ message: "Error retrieving clients", error });
  } finally {
    logger.traceOut("Get All Clients");
  }
}

export const createClient = async (req: Request, res: Response) => {
  logger.traceIn("Create Client");
  const result = clientSchema.safeParse(req.body);
  if (!result.success) {
    logger.warn(`Validation failed, ${JSON.stringify(result.error)}`);
    res.status(400).json({ message: "Validation failed", errors: result.error.errors });
    return;
  }

  const { name, contact } = result.data;

  try {
    logger.debug("Creating new client in the database");
    const newClient = await prisma.client.create({
      data: {
        name,
        contact
      }
    });

    logger.info(`Client created successfully with ID: ${newClient.id}`);
    res.status(201).json(newClient);
  } catch (error) {
    logger.error(`Error creating client, ${JSON.stringify(error)}`);
    res.status(500).json({ message: "Error creating client", error });
  } finally {
    logger.traceOut("Create Client");
  }
}

export const updateClient = async (req: Request, res: Response) => {
  logger.traceIn("Update Client");
  const { id } = req.params;
  const result = clientSchema.safeParse(req.body);

  if (!result.success) {
    logger.warn(`Validation failed: ${result.error}`);
    res.status(400).json({ message: "Validation failed", errors: result.error.errors });
    return;
  }

  const { name, contact } = result.data;

  try {
    logger.debug(`Updating client with ID: ${id}`);
    const updatedClient = await prisma.client.update({
      where: { id },
      data: { name, contact }
    });

    logger.info(`Client updated successfully with ID: ${updatedClient.id}`);
    res.status(200).json(updatedClient);
  } catch (error) {
    logger.error(`Error updating client: ${JSON.stringify(error)}`);
    res.status(500).json({ message: "Error updating client", error });
  } finally {
    logger.traceOut("Update Client");
  }
}

export const deleteClient = async (req: Request, res: Response) => {
  logger.traceIn("Delete Client");
  const { id } = req.params;

  try {
    logger.debug(`Deleting client with ID: ${id}`);
    await prisma.client.update({
      where: { id },
      data: { deletedAt: new Date() } // Soft delete by setting deletedAt
    });
    logger.info(`Client deleted successfully with ID: ${id}`);
    res.status(204).send(); // No content response
  } catch (error) {
    logger.error(`Error deleting client, ${JSON.stringify(error)}`);
    res.status(500).json({ message: "Error deleting client", error });
  } finally {
    logger.traceOut("Delete Client");
  }
}