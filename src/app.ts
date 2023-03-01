import express, { type Application } from "express";
import { cartillaRouter, userRouter } from "./components";
import cors from "cors";


const app: Application = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

//Rutas
app.use("/api/v1/user", userRouter);
app.use("/api/v1/cartilla", cartillaRouter);

export default app;