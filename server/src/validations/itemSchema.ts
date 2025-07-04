import { z } from "zod";

export const itemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  weight: z.number().min(0.01, "Weight must be greater than 0"),
  categoryId: z.string().min(1, "Category is required"),
});