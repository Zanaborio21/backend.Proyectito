import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { compare, hash } from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

const prisma = new PrismaClient();
const jwtSecret = process.env.JWT_SECRET || "secret";

export const login = async function login(req: Request, res: Response): Promise<void> {
  const { nombre, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { nombre },
  });

  if (!user) {
    res.status(401).json({ message: "Usuario o contraseña incorrectos" });
    return;
  }

  const isPasswordValid = await compare(password, user.password);

  if (!isPasswordValid) {
    res.status(401).json({ message: "Usuario o contraseña incorrectos" });
    return;
  }

  const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: "1h" });

  res.status(200).json({ token });
};

export const verifyToken = async function verifyToken(
  req: Request,
  res: Response,
  next: () => void
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "Token no proporcionado" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;
    req.body.userId = decodedToken.id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token inválido" });
    return;
  }
};
