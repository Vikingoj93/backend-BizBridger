import dotenv from 'dotenv';

// Configura dotenv para cargar el archivo .env correspondiente al entorno actual

const env = process.env.NODE_ENV || 'development';

dotenv.config({ path: `.env.${env}` });

// Exporta las variables de entorno según el entorno actual
export const PORT = process.env.PORT || 3000;
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
export const API_KEY = process.env.API_KEY || 'mi_clave_secreta_dev';
