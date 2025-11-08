import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connection from "./utils/db.js";

// Cargar variables de entorno
dotenv.config();

// Crear instancia de Express
const app = express();

// Habilitar CORS
app.use(cors());
app.use(express.json()); // IMPORTANTE para recibir JSON

// ✅ Ruta para probar la conexión DB
// app.get("/test-db", async (req, res) => {
//   try {
//     const [rows] = await connection.query("SELECT 1 + 1 AS resultado");
//     res.json({
//       ok: true,
//       resultado: rows[0].resultado,
//     });
//   } catch (err) {
//     res.status(500).json({
//       ok: false,
//       error: err.message,
//     });
//   }
// });

// Puerto y arranque del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
