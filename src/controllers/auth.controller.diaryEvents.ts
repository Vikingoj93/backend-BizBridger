import { Request, Response } from "express";
import { Event } from "../models/personal/agenda/diary";
import { IEvent } from "../types/diary";
import { IUserMongodb } from "../types/user";
import { validateDate } from "../libs/validate";
import { date, hours } from "../config";


export async function getEvents(req: Request, res: Response) {
  const user = req.user as IUserMongodb;
  const userId = user._id;

  const events = await Event.find({ userId });
  return res.json(events);
}

export async function postEvents(req: Request, res: Response) {
  try {
    const user = req.user as IUserMongodb;
    const body: IEvent = await req.body;

    console.log(body)
    // Validar que los datos del frontend tienen un formato valido
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

    const currentDate = date; // Obtener la fecha y hora actual

    // Validar la fecha
    if (body.Date < currentDate) {
      return res.status(400).json({
        error: "La fecha del evento debe ser superior a la fecha actual",
      });
    }

    // Si la fecha es el día actual, validar la hora
    if (body.Date === currentDate) {
      const currentTime = hours; // Obtener la hora actual en formato HH:MM
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
      return res.json({ message: "Su evento se registro con exito!!" });
    }

    return res
      .status(400)
      .json({ message: "Error al momento de registrar el evento" });
  } catch (error) {
    if (error instanceof Error) {
      return res.json({ message: error });
    }
    return console.log(error);
  }
}


export async function updateEvent(req: Request, res: Response) {
  const user = req.user as IUserMongodb;
  const userId = req.query.user;
  const eventId = req.query.event;
  const data: IEvent = req.body;
  console.log(data);
  if (user) {
    try {
      if (user._id.toString() === userId) {
        const updateEvent = await Event.findByIdAndUpdate(
          { _id: eventId, userId: userId },
          {
            $set: {
              title: data.title,
              description: data.description,
              Date: data.Date,
              required: data.required,
              Time: data.Time,
              category: data.category,
            },
          },
          { new: true }
        );

        if (updateEvent) {
          console.log(updateEvent);
          return res.json({ message: "Evento actualizado exitosamente" });
        } else {
          return res
            .status(400)
            .json({ error: "Error al actualizar el evento" });
        }
      } else {
        return res.status(400).json({
          error: "Esta intentando actualizar un evento que no le pertenece",
        });
      }
    } catch (error) {
      return console.log(error);
    }
  } else {
    return res.status(400).json({ error: "Erorr al actualizar el evento" });
  }
}

export async function eventDelete(req: Request, res: Response) {
  const userId = req.query.user;
  const eventId = req.query.event;
  const user = req.user as IUserMongodb;
  if (user) {
    try {
      if (user?._id.toString() === userId) {
        const eventDeleted = await Event.findByIdAndDelete({
          _id: eventId,
          userId: userId,
        });
        if (eventDeleted) {
          return res.json({ message: "Evento eliminado1" });
        } else {
          return res.status(400).json({ error: "error al eliminar evento2" });
        }
      } else {
        return res.status(400).json({ error: "error al eliminar evento3" });
      }
    } catch (error) {
      return res.status(400).json({ error: "error al eliminar evento4" });
    }
  }
}
