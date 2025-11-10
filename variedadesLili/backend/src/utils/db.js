import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Creamos la conexión
const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Esto debe imprimirse en consola si se conectó
console.log("✅ Conectado a MySQL");

export default connection;
