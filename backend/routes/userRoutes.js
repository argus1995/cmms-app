import express from "express";

const router = express.Router();

router.post("/register", (req, res) =>
  res.json({ message: "This is register" })
);
router.post("/login", (req, res) => res.json({ message: "This is login" }));

export default router;
