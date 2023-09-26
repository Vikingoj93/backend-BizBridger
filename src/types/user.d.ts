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