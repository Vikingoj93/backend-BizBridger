import { Request, Response, NextFunction } from "express";
import { URL_FRONTEND } from "../config";

export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    console.log("esta autenticado");
    return next(); // El usuario está autenticado, permite continuar
  }else{
    res.redirect(`/auth/google`)
  }
};
