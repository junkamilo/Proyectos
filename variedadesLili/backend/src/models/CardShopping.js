import db from "../utils/db.js";

export class CardShopping{


  // --- AGREGAR PRODUCTO AL CARRITO ---
  // Si el producto ya existe para ese cliente, suma la cantidad nueva a la existente.
  static async addToCart({ id_cliente, id_producto, cantidad }) {
    const [result] = await db.query(
      `INSERT INTO Carrito_Compras (id_cliente, id_producto, cantidad) 
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE cantidad = cantidad + ?`,
      [id_cliente, id_producto, cantidad, cantidad]
    );

    return { 
      message: "Producto agregado o actualizado",
      insertId: result.insertId 
    };
  }

  // --- OBTENER EL CARRITO DE UN CLIENTE ---
  // Hace un JOIN con Productos para traer nombre, precio y foto.
  static async getCartByClient(id_cliente) {
    const [rows] = await db.query(
      `SELECT 
        c.id_carrito,
        c.id_cliente,
        c.cantidad,
        c.fecha_agregado,
        p.id_producto,
        p.nombre_producto,
        p.url_foto_producto,
        p.precio,
        p.estado as estado_producto,
        p.cantidad as stock_disponible,
        (p.precio * c.cantidad) as subtotal
      FROM Carrito_Compras c
      INNER JOIN Productos p ON c.id_producto = p.id_producto
      WHERE c.id_cliente = ?`,
      [id_cliente]
    );
    return rows;
  }

  // --- ACTUALIZAR CANTIDAD DE UN ITEM ---
  // Se usa cuando el usuario cambia el número en el input del carrito
  static async updateQuantity({ id_cliente, id_producto, cantidad }) {
    const [result] = await db.query(
      `UPDATE Carrito_Compras 
       SET cantidad = ? 
       WHERE id_cliente = ? AND id_producto = ?`,
      [cantidad, id_cliente, id_producto]
    );

    return { updated: result.affectedRows > 0 };
  }

  // --- ELIMINAR UN PRODUCTO DEL CARRITO ---
  static async removeItem(id_cliente, id_producto) {
    const [result] = await db.query(
      `DELETE FROM Carrito_Compras 
       WHERE id_cliente = ? AND id_producto = ?`,
      [id_cliente, id_producto]
    );

    return { deleted: result.affectedRows > 0 };
  }

  // --- VACIAR CARRITO COMPLETO ---
  // Se usa cuando el cliente finaliza la compra o le da a "Vaciar carrito"
  static async clearCart(id_cliente) {
    const [result] = await db.query(
      `DELETE FROM Carrito_Compras WHERE id_cliente = ?`,
      [id_cliente]
    );

    return { cleared: result.affectedRows > 0 };
  }
  
  // --- CONTAR ITEMS EN EL CARRITO ---
  // Útil para mostrar el numerito en el icono del carrito en el navbar
  static async countItems(id_cliente) {
    const [rows] = await db.query(
      `SELECT SUM(cantidad) as total_items 
       FROM Carrito_Compras 
       WHERE id_cliente = ?`,
      [id_cliente]
    );
    return rows[0].total_items || 0;
  }

}