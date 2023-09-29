import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, URL_CALLBACK } from "../config";
import User from "../models/users";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID as string,
      clientSecret: GOOGLE_CLIENT_SECRET as string,
      callbackURL: URL_CALLBACK as string,
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      return cb(null, profile);
    } 
  )
);

passport.serializeUser(function (user: any, done) {
  done(null, user);
});

passport.deserializeUser(function (user: any, done) {
  // Busca al usuario en tu base de datos utilizando el id y devuelve el usuario
  
    done(null, user);
});
