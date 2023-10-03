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

export interface IUserMongodb {
  _id: string,
  name: string,
  email: string,
  image: string,
  providers: [
    {
      provider: string,
      providerId: string,
      _id: string
    }
  ],
  __v: number
}