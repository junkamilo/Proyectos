import db from "../utils/db.js";
import bcrypt from 'bcryptjs';

export class Cliente {
  // --- TRAER TODOS LOS CLIENTES ---
  static async findAll() {
    // Seleccionamos todo excepto la contraseña por seguridad
    const [rows] = await db.query(
      "SELECT id_cliente, nombre_completo, email, telefono, fecha_nacimiento, genero, url_foto_perfil, estado, fecha_registro FROM Clientes"
    );
    return rows;
  }

  // --- BUSCAR CLIENTE POR ID ---
  static async findById(id) {
    const [rows] = await db.query(
      `SELECT id_cliente, nombre_completo, email, telefono, fecha_nacimiento, genero, url_foto_perfil, estado, fecha_registro 
       FROM Clientes WHERE id_cliente = ?`,
      [id]
    );
    return rows[0];
  }

  // --- BUSCAR POR EMAIL (Para Login o validaciones) ---
  static async findByEmail(email) {
    const [rows] = await db.query(`SELECT * FROM Clientes WHERE email = ?`, [
      email,
    ]);
    return rows[0];
  }

  // --- CREAR UN CLIENTE ---
  static async create({
    nombre_completo,
    email,
    contrasena,
    telefono,
    fecha_nacimiento,
    genero,
    url_foto_perfil = null,
  }) {
    // Encriptamos la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // NOTA: Se cambió la tabla 'Usuarios' por 'Clientes'
    const [result] = await db.query(
      `INSERT INTO Clientes (nombre_completo, email, contrasena, telefono, fecha_nacimiento, genero, url_foto_perfil) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        nombre_completo,
        email,
        hashedPassword, // Guardamos el hash, no el texto plano
        telefono,
        fecha_nacimiento,
        genero,
        url_foto_perfil,
      ]
    );

    return {
      id_cliente: result.insertId,
      nombre_completo,
      email,
      telefono,
      url_foto_perfil,
    };
  }

  // --- EDITAR CLIENTE ---
  static async updateById(id, data) {
    const {
      nombre_completo,
      email,
      telefono,
      fecha_nacimiento,
      genero,
      url_foto_perfil,
    } = data;

    const [result] = await db.query(
      `UPDATE Clientes 
       SET nombre_completo = ?, email = ?, telefono = ?, fecha_nacimiento = ?, genero = ?, url_foto_perfil = ?
       WHERE id_cliente = ?`,
      [
        nombre_completo,
        email,
        telefono,
        fecha_nacimiento,
        genero,
        url_foto_perfil,
        id,
      ]
    );
    return result;
  }

  // --- ELIMINAR CLIENTE ---
  static async deleteById(id) {
    const [result] = await db.query(
      "DELETE FROM Clientes WHERE id_cliente = ?",
      [id]
    );
    return result;
  }

  // --- CAMBIAR ESTADO (Ej: Suspender usuario) ---
  static async updateEstado(id, estado) {
    const [result] = await db.query(
      "UPDATE Clientes SET estado = ? WHERE id_cliente = ?",
      [estado, id]
    );
    return result;
  }
}
