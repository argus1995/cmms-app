import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);

connectDB().then(() => {
  app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
});
