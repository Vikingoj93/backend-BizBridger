import {IUser} from '../types/user'

export function validateRes(res:any) {
    if (res.status === 200) {
      return true;
    } else {
      console.error(
        "Error en la solicitud:",
        res.status,
        res.statusText
      )
      return false;
    }
  }

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