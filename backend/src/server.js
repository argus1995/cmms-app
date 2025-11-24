import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import assetCategoryRoutes from "./routes/assetCategoryRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

// parse JSON, form data, and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/asset-categories", assetCategoryRoutes);

// Error Handler
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
