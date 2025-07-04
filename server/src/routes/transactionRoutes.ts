import { Router } from "express";
import { authencicateToken } from "../middlewares/authMiddleware";

import {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction
} from "../controllers/transactionController";

const router = Router();

router.get("/", authencicateToken, getAllTransactions);
router.post("/", authencicateToken, createTransaction);
router.put("/:id", authencicateToken, updateTransaction);
router.delete("/:id", authencicateToken, deleteTransaction);

export default router;