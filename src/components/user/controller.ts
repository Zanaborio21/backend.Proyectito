import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

export const crearUsuario = async function createUser(req: Request, res: Response) {
  const { nombre, password } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: { nombre },
  });

  if (existingUser) {
    return res.status(400).json({ message: "El usuario ya existe" });
  }

  const hashPassword = await hash(password, 10);

  const user = await prisma.user.create({
    data: {
      nombre,
      password: hashPassword,
    },
  });

  res.status(201).json(user);
}

