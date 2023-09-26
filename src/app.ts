// Importa las dependencias
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { PORT } from "./config";
import { check, validationResult } from "express-validator";

// Configura Express
const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Middleware de análisis de JSON
app.use(express.json());

// Define una ruta de ejemplo
app.get("/", (req: Request, res: Response) => {
  console.log(req.headers);
  res.json({ mensaje: "¡Hola desde tu API!" });
});

// Middleware de manejo de errores de validación
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof validationResult) {
    return res.status(422).json({ errores: err.message });
  }
  next(err);
});

// Middleware de manejo de errores genéricos
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ mensaje: "Ha ocurrido un error en el servidor." });
});

export default app;
