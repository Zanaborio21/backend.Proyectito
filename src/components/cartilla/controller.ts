import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const crearCartilla = async function createCartilla(req: Request, res: Response): Promise<void> {
    try {
      const { titulo, descripcion, link } = req.body;
      await prisma.cartilla.create({
        data: {
          titulo,
          descripcion,
          link,
        },
      });
      res.json({ message: "Cartilla creada correctamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al crear la cartilla" });
    }
  }

export const borrarCartilla = async function deleteCartilla(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await prisma.cartilla.delete({
        where: {
          id: parseInt(id),
        },
      });
      res.json({ message: "Cartilla eliminada correctamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al eliminar la cartilla" });
    }
  }

export const getCartilla = async function getCartillaById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const cartilla = await prisma.cartilla.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (cartilla) {
        res.json(cartilla);
      } else {
        res.status(404).json({ error: "Cartilla no encontrada" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al buscar la cartilla" });
    }
  }

export const updateCartilla = async function updateCartilla(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { titulo, descripcion, link } = req.body;
      await prisma.cartilla.update({
        where: {
          id: parseInt(id),
        },
        data: {
          titulo,
          descripcion,
          link,
        },
      });
      res.json({ message: "Cartilla actualizada correctamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al actualizar la cartilla" });
    }
  }

export const getAllCartilla = async function getAllCartilla(req: Request, res: Response): Promise<void> {
    try {
      const cartillas = await prisma.cartilla.findMany();
      res.json(cartillas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener las cartillas" });
    }
  }
