import { Request, Response } from "express";
import { INotes } from "../types/diary";
import { Note } from "../models/personal/agenda/note";
import { IUserMongodb } from "../types/user";

export async function getNotes(req: Request, res: Response) {
  const user = req.user as IUserMongodb;
  const userId = user._id
  const notes = await Note.find({ userId });

  console.log(notes)

  return res.json(notes)

}
export async function postNotes(req: Request, res: Response) {

    try {
        const {_id} = req.user as IUserMongodb;
        const body: INotes = req.body;
    
        // Validar que los datos del frontend tienen un formato valido
        if (
          body.description.length > 250
        ) {
          return res.status(400).json({ error: "Datos inválido" });
        }
    
        const newNote = await new Note({
          ...body,
          userId: _id,
        });
    
        if (newNote) {
          await newNote.save();
          return res
            .status(200)
            .json({ message: "Su Nota se registro con exito!!" });
        }
    
        return res
          .status(400)
          .json({ message: "Error al momento de registrar la nota" });
      } catch (error) {
        if (error instanceof Error) {
          return res.json({ message: error });
        }
        return console.log(error); 
      }

}
export async function updateNotes(req: Request, res: Response) {
    const {_id} = req.user as IUserMongodb
  const userId = req.query.user
  const noteId = req.query.note
  const data : INotes = req.body

  if (_id) {
    try {
      if (_id.toString() === userId) {
        const updateNote = await Note.findByIdAndUpdate(
          { _id: noteId, userId: userId },
          {
            $set: {
              description: data.description,
              category: data.category,
            },
          },
          { new: true }
        );

        if (updateNote) {
          console.log(updateNote);
          return res.json({ message: "nota actualizada exitosamente" });
        } else {
          return res
            .status(400)
            .json({ error: "Error al actualizar la nota" });
        }
      } else {
        return res.status(400).json({
          error: "Esta intentando actualizar una nota que no le pertenece",
        });
      }
    } catch (error) {
      return console.log(error);
    }
  } else {
    return res.status(400).json({ error: "Erorr al actualizar la nota" });
  }
}
export async function noteDelete(req: Request, res: Response) {
    const {_id} = req.user as IUserMongodb;
  const userId = req.query.user;
  const noteId = req.query.note;
  if (_id) {
    try {
      if (_id?.toString() === userId) {
        const noteDeleted = await Note.findByIdAndDelete({
          _id: noteId,
          userId: userId,
        });
        if (noteDeleted) {
          return res.json({ message: "nota eliminada" });
        } else {
          return res.status(400).json({ error: "error al eliminar nota" });
        }
      } else {
        return res.status(400).json({ error: "error al eliminar nota" });
      }
    } catch (error) {
      return res.status(400).json({ error: "error al eliminar nota" });
    }
  }
}
