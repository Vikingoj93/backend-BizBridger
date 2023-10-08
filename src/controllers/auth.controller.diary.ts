import { Request, Response, NextFunction } from "express";
import { Event } from "../models/diary";
import { IEvent } from "../types/diary";
import { IUserMongodb } from "../types/user";
import { validateDate } from "../libs/validate";

export async function events(req: Request, res: Response) {
  try {
    const user = req.user as IUserMongodb;
    const body: IEvent = await req.body;

    if (
      body.title.length > 40 ||
      body.description.length > 250 ||
      !validateDate(body.Date)
    ) {
      return res.status(400).json({ error: "Datos inválido" });
    }

    // Validar el formato de la hora (HH:MM)
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (body.Time !== null) {
      if (body.required) {
        if (!timeRegex.test(body.Time)) {
          return res.status(400).json({ error: "Datos inválidos" });
        }
      } else {
        return res.status(400).json({ error: "Datos invalidos" });
      }
    }

    const currentDate = new Date(); // Obtener la fecha y hora actual

    // Validar la fecha
    if (body.Date < currentDate.toISOString().slice(0, 10)) {
      return res.status(400).json({
        error: "La fecha del evento debe ser superior a la fecha actual",
      });
    }

    // Si la fecha es el día actual, validar la hora
    if (body.Date === currentDate.toISOString().slice(0, 10)) {
      const currentTime = currentDate.toISOString().slice(11, 16); // Obtener la hora actual en formato HH:MM
      if (body.Time && body.Time < currentTime) {
        return res.status(400).json({
          error: "La hora del evento debe ser superior a la hora actual",
        });
      }
    }

    const newEvent = await new Event({
      ...body,
      userId: user._id,
    });

    if (newEvent) {
      await newEvent.save();
      res.json({ message: "Su evento se registro con exito!!" });
    }

    res
      .status(400)
      .json({ message: "Error al momento de registrar el evento" });
  } catch (error) {
    if (error instanceof Error) {
      res.json({ message: error });
    }
    console.log(error);
  }
}
export function tasks(req: Request, res: Response) {}
export function notes(req: Request, res: Response) {}
