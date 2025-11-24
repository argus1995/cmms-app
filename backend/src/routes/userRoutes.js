import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  loginUser,
  logoutUser,
  profileUser,
  registerUser,
} from "../controllers/userController.js";

const router = express.Router();

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, profileUser);
router.post("/logout", protect, logoutUser);

export default router;
