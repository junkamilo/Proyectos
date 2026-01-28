import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url'; // 👈 IMPORTANTE para ES Modules
import fs from 'fs'; // Para verificar si la carpeta existe

// ... tus importaciones de rutas ...
import RoutesAdminUsuario from "./src/routes/RoutesAdminUsuario.js";
import RoutesProductos from "./src/routes/RoutesProductos.js";
import RoutesCliente from "./src/routes/RoutesCliente.js";
import RoutesCarrito from "./src/routes/RoutesCarShopoing.js";
import RoutesPedido from "./src/routes/RoutesPedido.js";
import RoutesFavoritesProductos from "./src/routes/RoutesFavoritesProductos.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// --- CONFIGURACIÓN DE IMÁGENES ---

// 1. Obtenemos la ruta del directorio actual (__dirname en ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. Definimos dónde está la carpeta 'uploads'
// NOTA: Si este archivo está en la raíz, usa 'uploads'.
// Si está dentro de 'src', usa '../uploads'. 
// Asumiendo que está en la raíz:
const carpetaUploads = path.join(__dirname, 'uploads');

console.log("📂 Intentando servir archivos desde:", carpetaUploads);

// 3. Verificamos si la carpeta existe (Esto saldrá en los logs de Render)
if (fs.existsSync(carpetaUploads)) {
    console.log("✅ La carpeta uploads EXISTE en el servidor.");
    // Listamos los primeros archivos para ver si tus fotos están ahí
    console.log("📄 Archivos encontrados:", fs.readdirSync(carpetaUploads).slice(0, 5));
} else {
    console.error("❌ ERROR CRÍTICO: La carpeta uploads NO EXISTE en el servidor.");
}

// 4. Servir la carpeta
app.use('/uploads', express.static(carpetaUploads));

// ---------------------------------

app.use("/User", RoutesAdminUsuario);
app.use("/AddProductos", RoutesProductos);
app.use("/api", RoutesCliente);
app.use('/api/car', RoutesCarrito);
app.use('/api/pedido', RoutesPedido);
app.use('/api/favoritos', RoutesFavoritesProductos);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
