import dotenv from "dotenv";
import express from "express";
import cors from "cors";

//rutas
import RoutesAdminUsuario from './src/routes/RoutesAdminUsuario.js';

// Cargar variables de entorno
dotenv.config();

// Crear instancia de Express
const app = express();

// Habilitar CORS
app.use(cors());
app.use(express.json()); // IMPORTANTE para recibir JSON


// Rutas del resto de módulos
app.use('/User', RoutesAdminUsuario);


// Puerto y arranque del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
