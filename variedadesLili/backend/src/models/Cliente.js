import db from "../utils/db.js";
import bcrypt from "bcryptjs";

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

  static async updateClient(id_cliente, data) {
    const connection = await db.getConnection();
    try {
      // data debe ser un objeto: { nombre_completo: '...', telefono: '...' }
      const keys = Object.keys(data);
      const values = Object.values(data);

      if (keys.length === 0) return { affectedRows: 0 };

      // Construimos la query dinámicamente: "UPDATE Clientes SET campo1=?, campo2=? WHERE id_cliente=?"
      const setClause = keys.map((key) => `${key} = ?`).join(", ");
      const sql = `UPDATE Clientes SET ${setClause} WHERE id_cliente = ?`;

      // Agregamos el ID al final de los valores
      const [result] = await connection.query(sql, [...values, id_cliente]);

      return result;
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    }
  }

  static async getByIdWithStats(id_cliente) {
    const connection = await db.getConnection();
    try {
      // Consulta 1: Datos del cliente
      const [cliente] = await connection.query(
        "SELECT id_cliente, nombre_completo, email, telefono, url_foto_perfil, estado, fecha_registro FROM Clientes WHERE id_cliente = ?",
        [id_cliente]
      );

      if (cliente.length === 0) return null;

      // Consulta 2: Conteo real de pedidos
      const [pedidos] = await connection.query(
        "SELECT COUNT(*) as total FROM Pedidos WHERE id_cliente = ?",
        [id_cliente]
      );

      // Combinamos los datos
      return {
        ...cliente[0],
        total_pedidos: pedidos[0].total, // Este es el dato real
      };
    } finally {
      connection.release();
    }
  }

  static async updatePhoto(id_cliente, url_foto) {
    const [result] = await db.query(
      "UPDATE Clientes SET url_foto_perfil = ? WHERE id_cliente = ?",
      [url_foto, id_cliente]
    );
    return result;
  }
}
  