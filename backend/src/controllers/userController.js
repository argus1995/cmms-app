import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Generate the token
const genToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "2h" });

// Controllers
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Check email exists
  const emailExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (emailExists) {
    res.status(400);
    throw new Error("Email exists");
  }

  // Register user
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  // Set token and respond
  const token = genToken(user.id);

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 2 * 60 * 60 * 1000,
  });

  res.status(201).json({
    id: user.id,
    email: user.email,
    role: user.role,
    message: "User registered successfully",
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    res.status(400);
    throw new Error("Invalid user data");
  }

  // Authenticate and set token
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = genToken(user.id);

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 2 * 60 * 60 * 1000,
    });

    res.status(201).json({
      id: user.id,
      email: user.email,
      message: "User logged in successfully",
    });
  } else {
    res.status(401);
    throw new Error("Invalid user data");
  }
});

const profileUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.json({
    message: "User logged out successfully",
  });
});

export { registerUser, loginUser, profileUser, logoutUser };
