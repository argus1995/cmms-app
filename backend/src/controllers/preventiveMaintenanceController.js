import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createPreventiveMaintenance = asyncHandler(async (req, res) => {
  const {
    asset_id,
    title,
    description,
    frequency,
    next_due_date,
    last_done_date,
    assigned_to,
    is_active,
  } = req.body;

  // Validation
  if (
    !asset_id ||
    !title ||
    !description ||
    !frequency ||
    !next_due_date ||
    !last_done_date
  ) {
    res.status(400);
    throw new Error("Some fields are required");
  }

  // Create the schedule
  const createdPreventiveMaintenance =
    await prisma.preventiveMaintenance.create({
      data: {
        asset_id: Number(asset_id),
        title,
        description,
        frequency,
        next_due_date: new Date(next_due_date),
        last_done_date: new Date(last_done_date),
        assigned_to: Number(assigned_to),
        is_active,
      },
    });

  res.status(201).json({
    message: "Preventive maintenance created successfully",
    data: createdPreventiveMaintenance,
  });
});

// const getAssets = asyncHandler(async (req, res) => {
//   const assets = await prisma.asset.findMany();
//   res.status(200).json(assets);
// });

// const getAssetById = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   // Check if not a number
//   if (!/^\d+$/.test(id)) {
//     return res.status(400).json({ message: "Invalid ID format" });
//   }

//   // Find the asset
//   const asset = await prisma.asset.findUnique({
//     where: {
//       id: Number(id),
//     },
//   });

//   if (asset) {
//     res.status(200).json(asset);
//   } else {
//     res.status(400);
//     throw new Error("No data found");
//   }
// });

// const updateAsset = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const { name, category_id, location, status, purchase_date, description } =
//     req.body;

//   // Validation
//   if (!/^\d+$/.test(id)) {
//     return res.status(400).json({ message: "Invalid ID format" });
//   }

//   // Build dynamic update data
//   const data = {};

//   if (name) data.name = name;
//   if (category_id) data.category_id = Number(category_id);
//   if (location) data.location = location;
//   if (status) data.status = status;
//   if (purchase_date) data.purchase_date = new Date(purchase_date);
//   if (description) data.description = description;

//   // If nothing to update
//   if (Object.keys(data).length === 0) {
//     return res.status(400).json({ message: "No fields to update" });
//   }

//   try {
//     // Update the asset
//     const updatedAsset = await prisma.asset.update({
//       where: { id: Number(id) },
//       data,
//     });

//     res.status(200).json({
//       message: "The asset updated successfully",
//       data: updatedAsset,
//     });
//   } catch (error) {
//     if (error.code === "P2025") {
//       throw new Error("Asset not found");
//     } else {
//       throw error;
//     }
//   }
// });

// const deleteAsset = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   // Validation
//   if (!/^\d+$/.test(id)) {
//     return res.status(400).json({ message: "Invalid ID format" });
//   }

//   try {
//     // Delete the asset
//     const deletedAsset = await prisma.asset.delete({
//       where: { id: Number(id) },
//     });

//     res.status(200).json({
//       message: "The asset deleted successfully",
//       data: deletedAsset,
//     });
//   } catch (error) {
//     if (error.code === "P2025") {
//       throw new Error("Asset not found");
//     } else {
//       throw error;
//     }
//   }
// });

export { createPreventiveMaintenance };
