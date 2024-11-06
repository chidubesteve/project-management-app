import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const Prisma = new PrismaClient();

export const getProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const projects = await Prisma.project.findMany();
    res.status(200).json(projects);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `error retrieving projects ${error.message}` });
  }
};
export const createProject = async (
  req: Request,
  res: Response
): Promise<void> => {
    const {name, description, startDate, endDate} = req.body
  try {
      const newProject = await Prisma.project.create({
          data: {
              name,
              description,
              startDate,
              endDate
        }
    });
    res.status(201).json(newProject);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `error creating project ${error.message}` });
  }
};
