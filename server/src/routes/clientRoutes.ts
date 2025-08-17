import { Router } from "express";
import { authencicateToken } from "../middlewares/authMiddleware";

import {
  getAllClients,
  createClient,
  updateClient,
  deleteClient
} from "../controllers/clientController";

const router = Router();

router.get("/", getAllClients);
router.post("/", createClient);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);

export default router;