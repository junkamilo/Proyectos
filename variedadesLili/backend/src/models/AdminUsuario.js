import db from "../utils/db.js";

export class AdminUsuario {
  //treamos todos los usuarios
  static async findAll() {
    const [rows] = await db.query("SELECT * FROM Usuarios");
    return rows;
  }

  //informacion de usuario
  static async findByLoginIdentifier(identifier) {
    const [rows] = await db.query(
      `
      SELECT * 
      FROM Usuarios
      WHERE email = ? OR username = ?
    `,
      [identifier, identifier]
    );
    return rows[0];
  }

  //elegimos usuario por id
  static async findById(id) {
    const [rows] = await db.query(
      `SELECT * FROM Usuarios WHERE id_usuario = ?`,
      [id]
    );
    return rows[0];
  }

  //creamos un usuario:
  static async create({
    nombre,
    username,
    email,
    contrasena,
    rol = "usuario",
    url_foto_perfil = null,
  }) {
    const [result] = await db.query(
      `INSERT INTO Usuarios (nombre, username, email, contrasena, rol, url_foto_perfil) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [nombre, username, email, contrasena, rol, url_foto_perfil]
    );
    return {
      id_usuario: result.insertId,
      nombre,
      username,
      email,
      rol,
      url_foto_perfil,
    };
  }

  //eliminamos usuario por id
  static async deleteById(id) {
    const [result] = await db.query(
      "DELETE FROM Usuarios WHERE id_usuario = ?",
      [id]
    );
    return result;
  }

  //editamos usuarios
  static async updateById(id, data) {
    const { nombre, username, email, rol, url_foto_perfil } = data;
    const [result] = await db.query(
      `
      UPDATE Usuarios 
      SET nombre = ?, username = ?, email = ?, rol = ?, url_foto_perfil = ?
      WHERE id_usuario = ?
      `,
      [nombre, username, email, rol, url_foto_perfil, id]
    );
    return result;
  }

  //refres el token
  static async updateRefreshToken(id, refreshToken) {
    await db.query(
      "UPDATE Usuarios SET refreshToken = ? WHERE id_usuario = ?",
      [refreshToken, id]
    );
  }
}
