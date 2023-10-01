export interface IUser {
    name: string;
    email: string;
    image: string;
    createdAt: Date;
    providers: IAuthProviders[];
  }
  
  export interface IAuthProviders {
      provider: string;
      providerId: string;
  }

  interface PassportExtension {
    passport: {
      // Define aquí las propiedades que quieras agregar a passport
      user: IUser; // Supongo que IUser es una interfaz existente
      // Otras propiedades relacionadas con passport
    };
  }
  
  // nuevo módulo en TypeScript para extender req.session
  declare module 'express-session' {
    interface SessionData extends PassportExtension {}
  }