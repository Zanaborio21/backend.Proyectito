import { Router } from "express";
import { crearUsuario, login } from "./controller";

const userRouter: Router = Router();

userRouter.post("/crearUser", crearUsuario);
userRouter.post("/login", login);

export default userRouter;
