import { z } from "zod";

export const paymentSchema = z.object({
  transactionId: z.string().min(1, "Transaction ID is required"),
  date: z.coerce.date(),
  amountPaid: z.coerce.number().min(0, "Amount paid must be a positive number"),
  balance: z.coerce.number().min(0, "Balance must be a positive number"),
  paymentMode: z.enum(["GCASH", "BPI", "BDO", "CASH", "PAYMAYA"]),
});