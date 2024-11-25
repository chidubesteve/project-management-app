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

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, cognitoId, teamId, profilePictureUrl } = req.body;
    const newUser = await Prisma.user.create({
      data: { username, cognitoId, teamId, profilePictureUrl },
    });
    res.status(201).json({message: "User created successfully", user: newUser});
  } catch (error: any) {
    res.status(500).json({ message: `error creating user ${error.message}` });
  }
};
