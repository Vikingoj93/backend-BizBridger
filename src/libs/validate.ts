import { IUser } from "../types/user";
import { Request, Response } from "express";

// validaciones de usuario
export const validateUserData = (data: IUser): boolean => {
  if (!data.email || !data.name) {
    return false;
  }

  for (const provider of data.providers) {
    if (!provider.provider || !provider.providerId) {
      return false;
    }
  }
  return true;
};

// validaciones de controller diary

// Validar el formato de fecha ("YYYY-MM-DD")
export const validateDate = (dataDate: string) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(dataDate);
};

// Validar el formato de la hora (HH:MM)
export const validateTime = (dataDate: string, currentDate: string, dataTime: string, dataRequired: boolean) => {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if(dataDate === currentDate) {
    if (dataTime && dataRequired) {
      timeRegex.test(dataTime)
    }
  }
  
};
