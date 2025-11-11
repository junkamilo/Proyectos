import db from "../utils/db.js";


export class AdminUsuario {
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

  //refres el token
  static async updateRefreshToken(id, refreshToken) {
    await db.query(
      "UPDATE Usuarios SET refreshToken = ? WHERE id_usuario = ?",
      [refreshToken, id]
    );
  }
}
