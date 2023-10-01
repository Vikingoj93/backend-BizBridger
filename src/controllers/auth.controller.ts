import { Request, Response, NextFunction } from "express";

export function profile(req: Request, res: Response) {
  if (req.user) {
    const userId: any = req.user;
    res.json(userId);
  }
}

export function tasks(req: Request, res: Response) {}
