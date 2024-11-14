import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const Prisma = new PrismaClient();

export const search = async (req: Request, res: Response): Promise<void> => {
  try {
    const { query } = req.query;
    const tasks = await Prisma.task.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query as string,
            },
          },
          {
            description: {
              contains: query as string,
            },
          },
        ],
      },

    });
    const projects = await Prisma.project.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query as string,
            },
          },
          {
            description: {
              contains: query as string,
            },
          },
        ],
      },

    });
    const users = await Prisma.user.findMany({
      where: {
        OR: [
          {
            username: {
              contains: query as string,
            },
          },
        ],
      },

    });
    res.status(200).json({tasks, projects, users});
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `error retrieving search result ${error.message}` });
  }
};