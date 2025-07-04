import { Router } from "express";
import { authencicateToken } from "../middlewares/authMiddleware";

import {
  getAllItems,
  createItem,
  updateItem,
  deleteItem
} from "../controllers/itemController";

const router = Router();

router.get("/", authencicateToken, getAllItems);
router.post("/", authencicateToken, createItem);
router.put("/:id", authencicateToken, updateItem);
router.delete("/:id", authencicateToken, deleteItem);

export default router;