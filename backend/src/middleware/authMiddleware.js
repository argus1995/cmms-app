import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const protect = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user
      req.user = await prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
        select: {
          id: true,
          email: true,
          name: true,
        },
      });
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({
        message: "Invalid token",
      });
    }
  } else {
    res.status(401).json({ message: "No token" });
  }
};

export default protect;
