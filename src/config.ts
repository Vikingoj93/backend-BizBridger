import dotenv from 'dotenv';

// Configura dotenv para cargar el archivo .env correspondiente al entorno actual

const env = process.env.NODE_ENV || 'development';

dotenv.config({ path: `.env.${env}` });

//variables de entorno
export const URL_CALLBACK = process.env.URL_CALLBACK || "http://localhost:4000/google/callback"
export const URL_FRONTEND = process.env.URL_FRONTEND || 'http://localhost:3000'
export const PORT = process.env.PORT || 4000;
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
export const API_KEY = process.env.API_KEY || 'mi_clave_secreta_dev';
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || undefined
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || undefined
