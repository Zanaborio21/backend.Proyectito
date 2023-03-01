import express, { type Application } from "express";
import cors from "cors";

const app: Application = express();
app.use(cors({ origin: "*" }));
app.use(express.json());


export default app;