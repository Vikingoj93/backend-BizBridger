// Importa las dependencias
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import router from "./routes/auth.router";
import passport from "passport";
import "./auth/auth";
import session from "express-session";
import { URL_FRONTEND, SESSION_SECRET } from "./config";
import { IUserMongodb } from "./types/user";
import {isAuthenticated} from './middlewares/isAuthenticated'  

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
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      sameSite: "none",
      secure: false, // cambiar a true cuando vaya a produccion
      maxAge: 1000 * 60 * 60 * 24 * 7, // One Week
    },
  })
);
app.use(helmet());
app.use(morgan("dev"));

// Middleware de análisis de JSON
app.use(express.json());

// Middleware de auth

// Ruta para la autenticación con Google
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Ruta de callback después de la autenticación de Google
app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: true }),
  function (req: Request, res: Response) {
    // Redirige primero a una ruta en el servidor
    const user = req.user as IUserMongodb
    if (user as IUserMongodb) {
      res.redirect("/redirect/frontend");
    }
  }
);

// Ruta en el servidor para redirigir al frontend
app.get("/redirect/frontend", async (req: Request, res: Response) => {
    res.redirect(URL_FRONTEND + "/dashboard");
});

app.get('/', (req: Request, res: Response)=>{
  if (req.isAuthenticated()) {
    res.send('autenticated')
  }else{
    res.send('unAuthenticated')
  }
});

app.get('/logout', (req: Request, res: Response, next: NextFunction)=>{
  if (req.user) {
    req.logOut((err)=>{
      if (err) {
        return next(err)
      }else{
        res.json('done')
      }
    })
  }
})

app.use('/api', isAuthenticated, router);

// Middleware de manejo de errores genéricos
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ mensaje: "Ha ocurrido un error en el servidor." });
});

export default app;
