import { Request, Response } from "express"
import { prisma } from "../prisma/client";
import { categorySchema } from "../validations/categorySchema";
import { logger } from "../utils/utils";

export const getAllCategories = async (req: Request, res: Response) => {
  logger.traceIn("Get All Categories");
  try {
    const categories = await prisma.category.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' }
    });

    logger.debug(`Retrieved ${categories.length} categories`);
    res.status(200).json(categories);

  } catch (error) {
    logger.debug(`Error retrieving categories, ${JSON.stringify(error)}`);
    res.status(500).json({
      message: "Error retrieving categories", error
    })
  } finally {
    logger.traceOut('Get All Categories')
  }
}

export const createCategory = async (req: Request, res: Response) => {
  logger.traceIn('Create Category');
  const result = categorySchema.safeParse(req.body);

  if (!result.success) {
    logger.warn(`Validation failed. ${JSON.stringify(result.error)}`);
    res.status(400).json({ message: "Validation failed.", errors: result.error.errors });
    return;
  }

  const { name, description } = result.data;

  try {
    logger.debug(`Creating category in the database...`);
    const newCategory = await prisma.category.create({
      data: {
        name,
        description
      }
    });

    logger.debug(`Category created successfully with ID: ${newCategory.id}`);
    res.status(291).json(newCategory);
  } catch (error) {
    logger.error(`Error creating category, ${JSON.stringify(error)}`)
    res.status(500).json({ message: "error creating client", error });
  } finally {
    logger.traceOut('Create Category');
  }
}

export const updateCategory = async (req: Request, res: Response) => {
  logger.traceIn('Update Category');

  const { id } = req.params;
  const result = categorySchema.safeParse(req.body);

  if (!result.success) {
    logger.warn(`Validation failed. ${JSON.stringify(result.error)}`);
    res.status(400).json({ message: "Validation failed", errors: result.error.errors });
    return;
  }

  const { name, description } = result.data;
  try {
    logger.debug(`Updating category with ID: ${id}`);

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { name, description }
    });

    logger.debug(`Category updated successfully with ID: ${id}`);
    res.status(200).json(updatedCategory);
  } catch (error) {
    logger.error(`Error updating category, ${JSON.stringify(error)}`);
    res.status(500).json({ message: "Error updating category", error });
  } finally {
    logger.traceOut('Update Category');
  }
}

export const deleteCategory = async (req: Request, res: Response) => {
  logger.traceIn("Delete Category");
  const { id } = req.params;

  try {
    logger.debug(`Deleting category with ID: ${id}`);
    await prisma.category.update({
      where: { id },
      data: { deletedAt: new Date() }
    })
    res.status(201).send();
  } catch (error) {
    logger.error(`Error deleting category, ${JSON.stringify(error)}`);
    res.status(500).json({ message: "Error deleting category", error });
  } finally {
    logger.traceOut("Delete Category");
  }
}