import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoutes.js";
import assetCategoryRoutes from "./routes/assetCategoryRoutes.js";
import assetRoutes from "./routes/assetRoutes.js";
import preventiveMaintenaceRoutes from "./routes/preventiveMaintenanceRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";

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
app.use("/api/assets", assetRoutes);
app.use("/api/preventive-maintenances", preventiveMaintenaceRoutes);
app.use("/api/requests", requestRoutes);

// Error Handler
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
