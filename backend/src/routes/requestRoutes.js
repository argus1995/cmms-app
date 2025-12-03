import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createRequest,
  getRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
} from "../controllers/requestContoller.js";

const router = express.Router();

// Routes
router.post("/", protect, createRequest);
router.get("/", protect, getRequests);
router.get("/:id", protect, getRequestById);
router.put("/:id", protect, updateRequest);
router.delete("/:id", protect, deleteRequest);

export default router;
