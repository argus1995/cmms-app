import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createAssetCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // Validation
  if (!name) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Check if category exists
  const assetCategoryExists = await prisma.assetCategory.findUnique({
    where: {
      name,
    },
  });
  if (assetCategoryExists) {
    res.status(400);
    throw new Error("Asset category exists");
  }

  // Create the category
  const createdAssetCategory = await prisma.assetCategory.create({
    data: {
      name,
    },
  });
  res.status(201).json({
    id: createdAssetCategory.id,
    name: createdAssetCategory.name,
    message: "Asset category created successfully",
  });
});

const getAssetCategories = asyncHandler(async (req, res) => {
  const assetCategories = await prisma.assetCategory.findMany();
  res.status(200).json(assetCategories);
});

const getAssetCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if not a number
  if (isNaN(id)) {
    res.status(400);
    throw new Error("Invalid ID format");
  }

  // Find the category
  const assetCategory = await prisma.assetCategory.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (assetCategory) {
    res.status(200).json(assetCategory);
  } else {
    res.status(404);
    throw new Error("No data found");
  }
});

const updateAssetCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  // Validation
  if (isNaN(id)) {
    res.status(400);
    throw new Error("Invalid ID format");
  }

  if (!name) {
    res.status(400);
    throw new Error("Name is required");
  }

  try {
    // Update the category
    const updatedAssetCategory = await prisma.assetCategory.update({
      where: {
        id: Number(id),
      },
      data: { name },
    });

    res.status(200).json({
      message: "The asset category updated successfully",
      data: updatedAssetCategory,
    });
  } catch (error) {
    if (error.code === "P2025") {
      throw new Error("Asset category not found");
    } else if (error.code === "P2002") {
      throw new Error("Asset category already exists");
    } else {
      throw error;
    }
  }
});

const deleteAssetCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validation
  if (isNaN(id)) {
    res.status(400);
    throw new Error("Invalid ID format");
  }

  try {
    // Delete the category
    const deletedAssetCategory = await prisma.assetCategory.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({
      message: "The asset category deleted succesfully",
      data: deletedAssetCategory,
    });
  } catch (error) {
    if (error.code === "P2025") {
      throw new Error("Asset category not found");
    } else {
      throw error;
    }
  }
});

export {
  createAssetCategory,
  getAssetCategories,
  getAssetCategoryById,
  updateAssetCategory,
  deleteAssetCategory,
};
