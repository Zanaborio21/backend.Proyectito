import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.JWT_SECRET;

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response): Promise<void> => {
  const { nombre, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { nombre } });
    if (!user) {
      res.status(404).json({ message: "Ta malo el usuario" });
      return;
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ message: "Ta mala la pass" });
      return;
    }

    const token = sign({ id: user.id }, secretKey!);

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del token" });
  } finally {
    await prisma.$disconnect();
  }
};
