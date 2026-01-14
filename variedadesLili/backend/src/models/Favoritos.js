import db from "../utils/db.js";

export class Favoritos {
  static async getByClient(id_cliente) {
    const sql = `
      SELECT 
        f.id_favorito,
        f.fecha_agregado,
        p.id_producto,
        p.nombre_producto,
        p.precio,
        p.url_foto_producto,
        p.cantidad AS stock
      FROM Favoritos f
      JOIN Productos p ON f.id_producto = p.id_producto
      WHERE f.id_cliente = ?
      ORDER BY f.fecha_agregado DESC
    `;

    const [rows] = await db.query(sql, [id_cliente]);
    return rows;
  }

  static async add(id_cliente, id_producto) {
    try {
      const sql = `INSERT INTO Favoritos (id_cliente, id_producto) VALUES (?, ?)`;

      const [result] = await db.query(sql, [id_cliente, id_producto]);
      return result;
    } catch (error) {
      // Código de error MySQL para "Entrada Duplicada" (1062)
      if (error.code === "ER_DUP_ENTRY") {
        throw new Error("DUPLICATE_ENTRY");
      }
      throw error;
    }
  }
}
