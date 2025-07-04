import { Router } from "express";
import { authencicateToken } from "../middlewares/authMiddleware";

import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController";

const router = Router();

router.get("/", authencicateToken, getAllCategories);
router.post("/", authencicateToken, createCategory);
router.put("/:id", authencicateToken, updateCategory);
router.delete("/:id", authencicateToken, deleteCategory);

export default router;