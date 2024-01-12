import { Request, Response } from "express";
import { IUserMongodb } from "../types/user";
import { Task } from "../models/personal/agenda/task";
import { IEvent, ITask } from "../types/diary";
import { validateDate } from "../libs/validate";
import { date } from "../config";

export async function getTasks(req: Request, res: Response) {
  const user = req.user as IUserMongodb;
  const userId = user._id;

  const tasks = await Task.find({ userId });
  return res.json(tasks);
}

export async function postTasks(req: Request, res: Response) {
  try {
    const user = req.user as IUserMongodb;
    const body: ITask = req.body;

    // Validar que los datos del frontend tienen un formato valido
    if (
      body.title.length > 40 ||
      body.description.length > 250
    ) {
      return res.status(400).json({ error: "Datos inválido" });
    }

    if (body.Date) {
      if (!validateDate(body.Date)) {
        return res.status(400).json({ error: "Datos inválido" });
      }
    }

    const currentDate = date;

    // Validar la fecha
    if (currentDate < date) {
      return res.status(400).json({
        error: "La fecha del evento debe ser superior a la fecha actual",
      });
    }

    const newTask = await new Task({
      ...body,
      userId: user._id,
    });

    if (newTask) {
      await newTask.save();
      return res
        .status(200)
        .json({ message: "Su tarea se registro con exito!!" });
    }

    return res
      .status(400)
      .json({ message: "Error al momento de registrar el tarea" });
  } catch (error) {
    if (error instanceof Error) {
      return res.json({ message: error });
    }
    return console.log(error); 
  }
}

export async function updateTasks(req:Request, res: Response) {
  const user = req.user as IUserMongodb
  const userId = req.query.user
  const taskId = req.query.task
  const data : IEvent = req.body

  if (user) {
    try {
      if (user._id.toString() === userId) {
        const updateTask = await Task.findByIdAndUpdate(
          { _id: taskId, userId: userId },
          {
            $set: {
              title: data.title,
              description: data.description,
              Date: data.Date,
              required: data.required,
              category: data.category,
            },
          },
          { new: true }
        );

        if (updateTask) {
          console.log(updateTask);
          return res.json({ message: "Tarea actualizada exitosamente" });
        } else {
          return res
            .status(400)
            .json({ error: "Error al actualizar la tarea" });
        }
      } else {
        return res.status(400).json({
          error: "Esta intentando actualizar una tarea que no le pertenece",
        });
      }
    } catch (error) {
      return console.log(error);
    }
  } else {
    return res.status(400).json({ error: "Erorr al actualizar la tarea" });
  }
}

export async function taskDelete(req: Request, res: Response) {
  const user = req.user as IUserMongodb;
  const userId = req.query.user;
  const taskId = req.query.task;
  if (user) {
    try {
      if (user?._id.toString() === userId) {
        const eventDeleted = await Task.findByIdAndDelete({
          _id: taskId,
          userId: userId,
        });
        if (eventDeleted) {
          return res.json({ message: "Tarea eliminada" });
        } else {
          return res.status(400).json({ error: "error al eliminar tarea" });
        }
      } else {
        return res.status(400).json({ error: "error al eliminar tarea" });
      }
    } catch (error) {
      return res.status(400).json({ error: "error al eliminar tarea" });
    }
  }
}
