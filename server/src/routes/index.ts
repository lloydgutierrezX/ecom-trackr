import { Router } from "express";
import authRoutes from "./authRoutes";
import clientRoutes from "./clientRoutes";
import categoryRoutes from "./categoryRoutes";
import itemRoutes from "./itemRoutes";
import transactionRoutes from "./transactionRoutes";
import paymentRoutes from "./paymentRoutes";


const router = Router();

// Mount auth routes
router.use("/auth", authRoutes);
// Mount client routes
router.use("/clients", clientRoutes);
// Mount category routes
router.use("/categories", categoryRoutes);
// Mount item routes
router.use("/items", itemRoutes);
// Mount transaction routes
router.use("/transactions", transactionRoutes);
// Mount transaction routes
router.use("/payments", paymentRoutes);

export default router;