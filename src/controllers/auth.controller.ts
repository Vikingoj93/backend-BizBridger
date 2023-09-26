import { validateUserData } from "../libs/validade";
import User from '../models/users'
import {IUser} from '../types/user'
import {Request, Response} from 'express'

export const signup = async (req: Request, res: Response) => {
    try {    
        //datos para registrar un usuario
        const data: IUser = await req.body;
    
        if (!validateUserData(data)) {
          return res.send({ error: "los datos enviados no son validos" }).status(500);
        }
    
        const newUser = new User(data);
        const result = await newUser.save();
    
        return res.send({
          message: "usuario registrado con exito",
          user: result,
        });
      } catch (error) {
        console.error("error:", error);
        return res.send(
          { error: "error al registrar usuario" }).status(500);
      }
}

export const update = async (req:Request, res:Response) => {
    try {

  //datos para actualizar un usuario
  const data: IUser = await req.body;

  //busca el usuario para validar existencia
  const userExist = await User.findOne({ email: data.email });

  //validar existencia
  if (!userExist) {
    return res.send(
      { error: "no existe el usuario" }).status(400);
  }
  //validar datos
  if (!validateUserData(data)) {
    return res.send(
      { error: "los datos enviados no son validos" }).status(500);
  }

  //actualiza usuario con el nuevo proveedor
  const userUpdate = await User.findOneAndUpdate(
    { email: data.email },
    data,
    { new: true }
  );

  //devuelve un mensaje de error si el usuario se actulizo con campos no validos
  if (!validateUserData(userUpdate)) {
    return res.send({error: 'Los datos no se actualizaron correctamente'}).status(500);
  }

  return res.send({
    message: `Se agrego un nuevo proveedor al usuario ${userExist.email}`,
  });
    } catch (error) {
        return res.send({error: "error al actualizar el usuario"}).status(500);
    }
}