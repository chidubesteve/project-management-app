import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const Prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await Prisma.user.findMany();
    res.status(200).json(users);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `error retrieving users ${error.message}` });
  }
};
