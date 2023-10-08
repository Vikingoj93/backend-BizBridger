import { Request, Response, NextFunction } from "express";
import { IUserMongodb } from "../types/user";


export function profile(req: Request, res: Response) {
  const user = req.user as IUserMongodb
  if (user && req.isAuthenticated()) {
    res.json({
      name: user.name,
      email: user.email
    })
  }else{
    res.json(false)
  }
}

