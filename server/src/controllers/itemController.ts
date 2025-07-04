import { Request, Response } from "express"
import { prisma } from "../prisma/client";
import { itemSchema } from "../validations/itemSchema";
import { logger } from "../utils/utils";

export const getAllItems = async (req: Request, res: Response) => {
  logger.traceIn("Get All Items");
  try {
    const items = await prisma.item.findMany({
      include: { category: true },
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' }
    });

    logger.debug(`Retrieved ${items.length} items`);
    res.status(200).json(items);

  } catch (error) {
    logger.debug(`Error retrieving items, ${JSON.stringify(error)}`);
    res.status(500).json({
      message: "Error retrieving items", error
    })
  } finally {
    logger.traceOut('Get All Items')
  }
}

export const createItem = async (req: Request, res: Response) => {
  logger.traceIn('Create Item');
  const result = itemSchema.safeParse(req.body);

  if (!result.success) {
    logger.warn(`Validation failed. ${JSON.stringify(result.error)}`);
    res.status(400).json({ message: "Validation failed.", errors: result.error.errors });
    return;
  }

  const { name, weight, categoryId } = result.data;

  try {
    logger.debug(`Creating item in the database...`);
    const newItem = await prisma.item.create({
      data: {
        name,
        weight,
        categoryId
      }
    });

    logger.debug(`Item created successfully with ID: ${newItem.id}`);
    res.status(291).json(newItem);
  } catch (error) {
    logger.error(`Error creating newItem, ${JSON.stringify(error)}`)
    res.status(500).json({ message: "error creating item", error });
  } finally {
    logger.traceOut('Create Item');
  }
}

export const updateItem = async (req: Request, res: Response) => {
  logger.traceIn('Update Item');

  const { id } = req.params;
  const result = itemSchema.safeParse(req.body);

  if (!result.success) {
    logger.warn(`Validation failed. ${JSON.stringify(result.error)}`);
    res.status(400).json({ message: "Validation failed", errors: result.error.errors });
    return;
  }

  const { name, weight, categoryId } = result.data;
  try {
    logger.debug(`Updating item with ID: ${id}`);

    const updatedItem = await prisma.item.update({
      where: { id },
      data: { name, weight, categoryId }
    });

    logger.debug(`Item updated successfully with ID: ${id}`);
    res.status(200).json(updatedItem);
  } catch (error) {
    logger.error(`Error updating item, ${JSON.stringify(error)}`);
    res.status(500).json({ message: "Error updating item", error });
  } finally {
    logger.traceOut('Update Item');
  }
}

export const deleteItem = async (req: Request, res: Response) => {
  logger.traceIn("Delete Item");
  const { id } = req.params;

  try {
    logger.debug(`Deleting item with ID: ${id}`);
    await prisma.item.update({
      where: { id },
      data: { deletedAt: new Date() }
    })
    res.status(201).send();
  } catch (error) {
    logger.error(`Error deleting item, ${JSON.stringify(error)}`);
    res.status(500).json({ message: "Error deleting item", error });
  } finally {
    logger.traceOut("Delete Item");
  }
}