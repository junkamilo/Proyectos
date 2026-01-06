import dotenv from "dotenv";
import express from "express";
import cors from "cors";

//rutas
import RoutesAdminUsuario from "./src/routes/RoutesAdminUsuario.js";
import RoutesProductos from "./src/routes/RoutesProductos.js";
import RoutesCliente from "./src/routes/RoutesCliente.js";
import RoutesCarrito from "./src/routes/RoutesCarShopoing.js";
import RoutesPedido from "./src/routes/RoutesPedido.js";

import path from "path";

// Cargar variables de entorno
dotenv.config();

// Crear instancia de Express
const app = express();

// Habilitar CORS
app.use(cors());
app.use(express.json()); // IMPORTANTE para recibir JSON

// 1. OBTENER LA RUTA FÍSICA REAL DEL PROYECTO
const carpetaUploads = path.join(process.cwd(), 'uploads');

//multer
app.use('/uploads', express.static(carpetaUploads));

// Rutas del resto de módulos
app.use("/User", RoutesAdminUsuario);
app.use("/AddProductos", RoutesProductos);
app.use("/api", RoutesCliente);
app.use('/api/car', RoutesCarrito);
app.use('/api/pedido', RoutesPedido);

// Puerto y arranque del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
