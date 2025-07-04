import { z } from "zod";

export const transactionSchema = z.object({
  clientId: z.string().min(1, "Client is required"),
  itemId: z.string().min(1, "Item is required"),
  weight: z.number().positive("Weight must be greater than 0"),
  price: z.number().positive("Price must be greater than 0"),
  total: z.number().positive("Total must be greater than 0"),
  paymentType: z.enum(["LAYAWAY", "ONE_TIME"]),
  status: z.enum(["PENDING", "COMPLETED", "CANCELLED"]),
});