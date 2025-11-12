import db from "../utils/db.js";

export class Productos {
  static async AddProductos({
    nombre_producto,
    url_foto_producto,
    cantidad,
    descripcion,
    precio,
    tamano,
    categoria,
    material,
    estado,
  }) {
    const [result] = await db.query(
      `
      INSERT INTO Productos (
        nombre_producto,
        url_foto_producto,
        cantidad,
        descripcion,
        precio,
        tamano,
        categoria,
        material,
        estado
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        nombre_producto,
        url_foto_producto,
        cantidad,
        descripcion,
        precio,
        tamano,
        categoria,
        material,
        estado,
      ]
    );

    return { id: result.insertId, nombre_producto };
  }
}
