import http from 'http';
import {PORT} from './config'
import app from './app'; 
import {connectDB} from './mongoose'

// Crea una instancia del servidor HTTP utilizando la aplicación Express
const server = http.createServer(app);

// Conecta a MongoDB 
connectDB()

// Inicia el servidor y comienza a escuchar en el puerto especificado
server.listen(PORT, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${PORT}`);
});

// Manejo de errores del servidor
server.on('error', (error: any) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES':
      console.error(`El puerto ${PORT} requiere permisos elevados.`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`El puerto ${PORT} ya está en uso.`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});
