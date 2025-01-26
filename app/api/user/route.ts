import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get User Details
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userId = req.query.id as string; // Get user ID from query params

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Update User Details
export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userId = req.query.id as string; // Get user ID from query params
    const { name, email } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,

      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
