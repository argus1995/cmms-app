import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createAsset,
  deleteAsset,
  getAssetById,
  getAssets,
  updateAsset,
} from "../controllers/assetController.js";

const router = express.Router();

// Routes
router.post("/", protect, createAsset);
router.get("/", protect, getAssets);
router.get("/:id", protect, getAssetById);
router.put("/:id", protect, updateAsset);
router.delete("/:id", protect, deleteAsset);

export default router;
