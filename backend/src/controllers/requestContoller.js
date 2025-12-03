import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createRequest = asyncHandler(async (req, res) => {
  const { title, description, asset_id, priority, status, requester_id } =
    req.body;

  // Validation
  if (!title || !description || !requester_id) {
    res.status(400);
    throw new Error("Some fields are required");
  }

  // Create request
  const createdData = await prisma.request.create({
    data: {
      title,
      description,
      asset_id: Number(asset_id),
      priority,
      status,
      requester_id: Number(requester_id),
    },
  });

  res.status(201).json({
    message: "Request created successfully",
    data: createdData,
  });
});

const getRequests = asyncHandler(async (req, res) => {
  const data = await prisma.request.findMany();
  res.status(200).json(data);
});

const getRequestById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if not a number
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  // Find request
  const dataById = await prisma.request.findUnique({
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

const updateRequest = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, asset_id, priority, status, requester_id } =
    req.body;

  // Validation
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  // Build dynamic update data
  const data = {};

  if (title) data.title = title;
  if (description) data.description = description;
  if (asset_id) data.asset_id = Number(asset_id);
  if (priority) data.priority = priority;
  if (status) data.status = status;
  if (requester_id) data.requester_id = Number(requester_id);

  // If nothing to update
  if (Object.keys(data).length === 0) {
    return res.status(400).json({ message: "No fields to update" });
  }

  try {
    // Update request
    const updatedData = await prisma.request.update({
      where: { id: Number(id) },
      data,
    });

    res.status(200).json({
      message: "The request updated successfully",
      data: updatedData,
    });
  } catch (error) {
    if (error.code === "P2025") {
      throw new Error("Request not found");
    } else {
      throw error;
    }
  }
});

const deleteRequest = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validation
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    // Delete request
    const deletedData = await prisma.request.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({
      message: "The request deleted successfully",
      data: deletedData,
    });
  } catch (error) {
    if (error.code === "P2025") {
      throw new Error("Request not found");
    } else {
      throw error;
    }
  }
});

export {
  createRequest,
  getRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
};
