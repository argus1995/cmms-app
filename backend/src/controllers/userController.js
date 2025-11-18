import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Generate the token
const genToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

// Controllers
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password)
    return res.status(400).json({
      message: "All fields are required",
    });

  // Check email exists
  const emailExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (emailExists)
    return res.status(400).json({
      message: "Email exists",
    });

  // Register user
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // Set token and respond
  if (user) {
    const token = genToken(user.id);

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      id: user.id,
      email: user.email,
      message: "User registered successfully",
    });
  } else {
    res.status(401).json({
      message: "Invalid user data",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password)
    return res.status(400).json({
      message: "Invalid user data",
    });

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
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      id: user.id,
      email: user.email,
      message: "User logged in successfully",
    });
  } else {
    res.status(401).json({
      message: "Invalid user data",
    });
  }
};

const profileUser = (req, res) => res.status(200).json(req.user);

const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.json({
    message: "User logged out successfully",
  });
};

export { registerUser, loginUser, profileUser, logoutUser };
