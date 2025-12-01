import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createPreventiveMaintenance,
  deletePreventiveMaintenance,
  getPreventiveMaintenanceById,
  getPreventiveMaintenances,
  updatePreventiveMaintenance,
} from "../controllers/preventiveMaintenanceController.js";

const router = express.Router();

// Routes
router.post("/", protect, createPreventiveMaintenance);
router.get("/", protect, getPreventiveMaintenances);
router.get("/:id", protect, getPreventiveMaintenanceById);
router.put("/:id", protect, updatePreventiveMaintenance);
router.delete("/:id", protect, deletePreventiveMaintenance);

export default router;
