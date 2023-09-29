// Importa las dependencias
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { validationResult } from "express-validator";
import router from "./routes/auth.router";
import passport from "passport";
import "./auth/auth";
import session from "express-session";
import { URL_FRONTEND } from "./config";
import { connectDB } from "./mongoose";

// Configuracion Express
const app = express();
app.use(
  session({
    secret: "keyboard cat", // Cambia esto a una cadena secreta única
    resave: false, // Establece resave en false para eliminar la advertencia
    saveUninitialized: true, // Establece saveUninitialized en true para eliminar la advertencia
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: URL_FRONTEND,
    credentials: true, // Si estás utilizando cookies o sesiones
  })
);
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
    cookie: {
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7 // One Week
    }
  }))
app.use(helmet());
app.use(morgan("dev"));

// Middleware de análisis de JSON
app.use(express.json());

// Ruta para la autenticación con Google
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

// Ruta de callback después de la autenticación de Google
app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: true }),
  function (req: Request, res: Response) {
    // Redirige primero a una ruta en el servidor
    if (req.user) {
      // Redirige al servidor "/redirect/frontend" con el "code"
      res.redirect("/redirect/frontend");
    }
  }
);

// Ruta en el servidor para redirigir al frontend
app.get("/redirect/frontend", async (req: Request, res: Response) => {
  
    res.redirect(URL_FRONTEND + "/dashboard");
  
});

app.get("/", (req: Request, res: Response) => {
  console.log(req.user);
  res.json({ hello: "hello" });
});

app.get("/getuser", async (req: Request, res: Response) => {
  if (req.user) {
    const userId: any = req.user;
  res.json(userId);
  }
});

app.get("/signout", async function (req, res, next) {
  if (req.user) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }else{
        res.send("done")
      }
    });
  } else {
    res.send("done");
  }
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
