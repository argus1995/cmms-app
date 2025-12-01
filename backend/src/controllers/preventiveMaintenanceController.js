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

  // Create the maintenance
  const createdData = await prisma.preventiveMaintenance.create({
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
    message: "Maintenance created successfully",
    data: createdData,
  });
});

const getPreventiveMaintenances = asyncHandler(async (req, res) => {
  const data = await prisma.preventiveMaintenance.findMany();
  res.status(200).json(data);
});

const getPreventiveMaintenanceById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if not a number
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  // Find the maintenance
  const dataById = await prisma.preventiveMaintenance.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (dataById) {
    res.status(200).json(dataById);
  } else {
    res.status(400);
    throw new Error("No data found");
  }
});

const updatePreventiveMaintenance = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    asset_id,
    title,
    description,
    frequency,
    next_due_date,
    last_done_date,
    assigned_to,
  } = req.body;

  // Validation
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  // Build dynamic update data
  const data = {};

  if (asset_id) data.asset_id = Number(asset_id);
  if (title) data.title = title;
  if (description) data.description = description;
  if (frequency) data.frequency = frequency;
  if (next_due_date) data.next_due_date = new Date(next_due_date);
  if (last_done_date) data.last_done_date = new Date(last_done_date);
  if (assigned_to) data.assigned_to = Number(assigned_to);

  // If nothing to update
  if (Object.keys(data).length === 0) {
    return res.status(400).json({ message: "No fields to update" });
  }

  try {
    // Update the maintenance
    const updatedData = await prisma.preventiveMaintenance.update({
      where: { id: Number(id) },
      data,
    });

    res.status(200).json({
      message: "The maintenance updated successfully",
      data: updatedData,
    });
  } catch (error) {
    if (error.code === "P2025") {
      throw new Error("Maintenance not found");
    } else {
      throw error;
    }
  }
});

const deletePreventiveMaintenance = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validation
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    // Delete the maintenance
    const deletedData = await prisma.preventiveMaintenance.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({
      message: "The maintenance deleted successfully",
      data: deletedData,
    });
  } catch (error) {
    if (error.code === "P2025") {
      throw new Error("Maintenance not found");
    } else {
      throw error;
    }
  }
});

export {
  createPreventiveMaintenance,
  getPreventiveMaintenances,
  getPreventiveMaintenanceById,
  updatePreventiveMaintenance,
  deletePreventiveMaintenance,
};
