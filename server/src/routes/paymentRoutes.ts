import { Router } from "express";
import { authencicateToken } from "../middlewares/authMiddleware";

import {
  getAllPayment,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment
} from "../controllers/paymentController";

const router = Router();

router.get("/", authencicateToken, getAllPayment);
router.get("/:id", authencicateToken, getPaymentById);
router.post("/", authencicateToken, createPayment);
router.put("/:id", authencicateToken, updatePayment);
router.delete("/:id", authencicateToken, deletePayment);

export default router;