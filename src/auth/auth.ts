import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  URL_CALLBACK,
} from "../config";
import User from "../models/users";
import { signUp, update } from "../libs/register.controller";
import { IUser} from "../types/user";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID as string,
      clientSecret: GOOGLE_CLIENT_SECRET as string,
      callbackURL: URL_CALLBACK as string,
    },
    async function (accessToken, refreshToken, profile: any, cb) {
      try {
        const userExist: IUser | null = await User.findOne({ email: profile._json.email });

        if (!userExist) {
          console.log("usuario no existe, obteniendo datos para enviar a al backend");

          const newUser = new User({
            name: profile.displayName,
            email: profile._json.email,
            image: profile._json.picture,
            providers: [
              {
                providerId: profile.id,
                provider: profile.provider,
              },
            ],
          });

          console.log(newUser);
          await signUp(newUser);
          return cb(null, newUser);
        }

        const validateProvider = userExist.providers.some(
          (provider: any) =>
            provider.provider === profile.provider &&
            provider.providerId === profile.id
        );

        if (!validateProvider) {
          userExist.providers.push({
            providerId: profile.id,
            provider: profile.provider,
          });

          await update(userExist);
          return cb(null, userExist);
        }

        console.log("inicio de sesión exitoso");
        return cb(null, userExist);
      } catch (error) {
        return cb(null);
      }     
    }
  )
);

passport.serializeUser((user: any, done) => {
  // Serializar al usuario, por ejemplo, usando su ID o email
  done(null, user._id); // Usando el email como ejemplo, puedes adaptarlo según tus necesidades
});

passport.deserializeUser( async (id: string, done) => {
  // Deserializar al usuario usando el email (o el ID) y buscarlo en tu base de datos
  const userId = await User.findOne({ _id: id }) 

  if (userId) {
    return done(null, userId);
  }
    return done(new Error('Usuario no encontrado'), null);
  });
