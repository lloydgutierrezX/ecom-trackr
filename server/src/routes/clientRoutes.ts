import { Router } from "express";
import { authencicateToken } from "../middlewares/authMiddleware";

import {
  getAllClients,
  createClient,
  updateClient,
  deleteClient
} from "../controllers/clientController";

const router = Router();

router.get("/", authencicateToken, getAllClients);
router.post("/", authencicateToken, createClient);
router.put("/:id", authencicateToken, updateClient);
router.delete("/:id", authencicateToken, deleteClient);

export default router;