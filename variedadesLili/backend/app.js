import dotenv from "dotenv";
import express from "express";
import cors from "cors";

//rutas
import RoutesAdminUsuario from './src/routes/RoutesAdminUsuario.js';
import RoutesProductos from './src/routes/RoutesProductos.js';
import RoutesCliente from './src/routes/RoutesCliente.js';

// Cargar variables de entorno
dotenv.config();

// Crear instancia de Express
const app = express();

// Habilitar CORS
app.use(cors());
app.use(express.json()); // IMPORTANTE para recibir JSON

//multer
app.use("/uploads", express.static("uploads"));


// Rutas del resto de módulos
app.use('/User', RoutesAdminUsuario);
app.use('/AddProductos', RoutesProductos);
app.use('/api', RoutesCliente);


// Puerto y arranque del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
