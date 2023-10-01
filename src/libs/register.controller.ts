import { validateUserData } from "./validate";
import User from '../models/users'
import {IUser} from '../types/user'
import {Request, Response} from 'express'

export const signin = async (req:Request, res: Response) => {
  res.json({message: "login"})
}

export const signUp = async (UserNew: IUser) => {
    try {    
        //datos para registrar un usuario
        const data = UserNew;
    
        if (!validateUserData(data)) {
          return new Error("los datos enviados no son validos")
        }
            
        const newUser = new User(data);
        const result = await newUser.save();
    
        return {user: result};
      } catch (error) {
        console.error("error:", error);
        return new Error("error al registrar usuario" );
      }
}

export const update = async (UpdateUser: IUser) => {
    try {

  //datos para actualizar un usuario
  const data = UpdateUser;

  //busca el usuario para validar existencia
  const userExist = await User.findOne({ email: data.email });

  //validar existencia
  if (!userExist) {
    return new Error("no existe el usuario");
  }
  //validar datos
  if (!validateUserData(data)) {
    return new Error("los datos enviados no son validos");
  }

  //actualiza usuario con el nuevo proveedor
  const userUpdate = await User.findOneAndUpdate(
    { email: data.email },
    data,
    { new: true }
  );

  //devuelve un mensaje de error si el usuario se actulizo con campos no validos
  if (!validateUserData(userUpdate)) {
    return new Error('Los datos no se actualizaron correctamente');
  }

  return {message: `Se agrego un nuevo proveedor al usuario ${userExist.email}`}
    } catch (error) {
        return {error: "error al actualizar el usuario"}
    }
}