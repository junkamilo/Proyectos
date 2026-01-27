import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// 1. CAMBIO IMPORTANTE: Usamos createPool en lugar de createConnection
// Un Pool maneja múltiples conexiones y las recicla, es vital para transacciones.
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306, // Asegúrate de tener el puerto (usualmente 3306)

  // Configuraciones recomendadas para producción
  waitForConnections: true,
  connectionLimit: 10, // Máximo 10 conexiones simultáneas
  queueLimit: 0,
  //ACTIVA LA CONEXIÓN SEGURA SSL
  ssl: {
    minVersion: "TLSv1.2",
    rejectUnauthorized: true,
  },
});

// Esto solo se imprimirá cuando se inicie el archivo, no garantiza conexión inmediata,
// pero el Pool gestionará la conexión cuando hagas la primera consulta.
console.log("✅ Pool de conexiones configurado");

// 2. Wrapper (Envoltorio)
// Creamos este objeto para mantener compatibilidad con tus modelos actuales
const db = {
  // Para consultas normales (Productos.js)
  query: async (sql, params) => {
    return await pool.query(sql, params);
  },

  // Para transacciones (Pedidos.js) - ESTO ES LO QUE FALTABA
  getConnection: async () => {
    return await pool.getConnection();
  },
};

export default db;
