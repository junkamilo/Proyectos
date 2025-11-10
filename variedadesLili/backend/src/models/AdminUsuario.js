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
}
