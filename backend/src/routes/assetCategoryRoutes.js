import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createAssetCategory,
  deleteAssetCategory,
  getAssetCategories,
  getAssetCategoryById,
  updateAssetCategory,
} from "../controllers/assetCategoryController.js";

const router = express.Router();

// Routes
router.post("/", protect, createAssetCategory);
router.get("/", protect, getAssetCategories);
router.get("/:id", protect, getAssetCategoryById);
router.put("/:id", protect, updateAssetCategory);
router.delete("/:id", protect, deleteAssetCategory);

export default router;
