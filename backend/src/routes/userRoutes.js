import express from "express";
import {
  loginUser,
  logoutUser,
  profileUser,
  registerUser,
} from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, profileUser);
router.post("/logout", logoutUser);

export default router;
