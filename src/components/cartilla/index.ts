import { Router } from "express";
import { crearCartilla, getCartilla, borrarCartilla, updateCartilla, getAllCartilla } from "./controller";
import {verifyToken} from "../user/controller" ;

const cartillaRouter: Router = Router();

cartillaRouter.get("/", getAllCartilla);
cartillaRouter.post("/", verifyToken, crearCartilla);
cartillaRouter.get("/:id", verifyToken, getCartilla);
cartillaRouter.put("/:id", verifyToken, updateCartilla);
cartillaRouter.delete("/:id", verifyToken, borrarCartilla);

export default cartillaRouter;