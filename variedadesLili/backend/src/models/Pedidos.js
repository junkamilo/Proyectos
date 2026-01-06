import db from "../utils/db.js";

export class Pedidos {
  // Crear un pedido nuevo (Transacción Compleja)
  static async CrearPedido(id_cliente) {
    // 1. Obtenemos una conexión exclusiva para poder hacer transacciones
    const connection = await db.getConnection();

    try {
      // INICIAMOS LA TRANSACCIÓN
      await connection.beginTransaction();

      // PASO A: Obtener productos del carrito del cliente
      const [itemsCarrito] = await connection.query(
        `SELECT c.id_producto, c.cantidad, p.precio, p.nombre_producto 
         FROM Carrito_Compras c
         JOIN Productos p ON c.id_producto = p.id_producto
         WHERE c.id_cliente = ?`,
        [id_cliente]
      );

      if (itemsCarrito.length === 0) {
        throw new Error("El carrito está vacío, no se puede crear el pedido.");
      }

      // PASO B: Calcular el total
      const total = itemsCarrito.reduce(
        (sum, item) => sum + item.precio * item.cantidad,
        0
      );

      // PASO C: Insertar la cabecera del Pedido
      const [pedidoResult] = await connection.query(
        `INSERT INTO Pedidos (id_cliente, total, estado) VALUES (?, ?, 'pagado')`,
        [id_cliente, total]
      );
      const id_pedido = pedidoResult.insertId;

      // PASO D: Procesar cada producto (Insertar detalle y Restar Stock)
      for (const item of itemsCarrito) {
        // D1. Insertar en Detalle_Pedidos
        await connection.query(
          `INSERT INTO Detalle_Pedidos (id_pedido, id_producto, cantidad, precio_unitario) 
           VALUES (?, ?, ?, ?)`,
          [id_pedido, item.id_producto, item.cantidad, item.precio]
        );

        // D2. Descontar del inventario (Stock)
        await connection.query(
          `UPDATE Productos SET cantidad = cantidad - ? WHERE id_producto = ?`,
          [item.cantidad, item.id_producto]
        );
      }

      // PASO E: Vaciar el carrito del cliente
      await connection.query(
        "DELETE FROM Carrito_Compras WHERE id_cliente = ?",
        [id_cliente]
      );

      // SI TODO SALIÓ BIEN, CONFIRMAMOS CAMBIOS
      await connection.commit();

      return {
        success: true,
        id_pedido,
        total,
        message: "Compra realizada con éxito",
      };
    } catch (error) {
      // SI ALGO FALLA, DESHACEMOS TODO
      await connection.rollback();
      throw error;
    } finally {
      // Liberamos la conexión
      connection.release();
    }
  }

  //traemos los produtos con su respectivo id cliente
  static async GetPedidoById(id_pedido) {
    // 1. Obtener la Cabecera (Pedido + Cliente)
    const [cabecera] = await db.query(
      `SELECT 
        p.id_pedido,
        p.fecha_pedido,
        p.estado,
        p.total,
        p.direccion_envio, -- Asegúrate de tener este campo en tu tabla Pedidos
        c.nombre_completo,
        c.email,
        c.url_foto_perfil
       FROM Pedidos p
       JOIN Clientes c ON p.id_cliente = c.id_cliente
       WHERE p.id_pedido = ?`,
      [id_pedido]
    );

    if (cabecera.length === 0) return null;

    // 2. Obtener los Productos (Detalle)
    const [productos] = await db.query(
      `SELECT 
        prod.nombre_producto,
        dp.cantidad,
        dp.precio_unitario,
        prod.url_foto_producto
       FROM Detalle_Pedidos dp
       JOIN Productos prod ON dp.id_producto = prod.id_producto
       WHERE dp.id_pedido = ?`,
      [id_pedido]
    );

    // 3. Retornamos ambos datos crudos
    return {
      datos_pedido: cabecera[0],
      lista_productos: productos,
    };
  }

  // Obtener pedidos de un cliente (Historial)
  static async GetPedidosPorCliente(id_cliente) {
    const [rows] = await db.query(
      `SELECT * FROM Pedidos WHERE id_cliente = ? ORDER BY fecha_pedido DESC`,
      [id_cliente]
    );
    return rows;
  }

  // Obtener los productos de un pedido específico
  static async GetDetallePedido(id_pedido) {
    const [rows] = await db.query(
      `SELECT 
        dp.id_detalle,
        p.id_producto,
        p.nombre_producto,
        p.url_foto_producto,
        dp.cantidad,
        dp.precio_unitario,
        (dp.cantidad * dp.precio_unitario) as subtotal
       FROM Detalle_Pedidos dp
       JOIN Productos p ON dp.id_producto = p.id_producto
       WHERE dp.id_pedido = ?`,
      [id_pedido]
    );

    return rows;
  }

  static async GetAllPedidosConDetalles() {
    // Usamos COALESCE para manejar nulos directamente desde SQL
    const [rows] = await db.query(`
      SELECT 
        p.id_pedido,
        p.fecha_pedido,
        p.estado,
        p.total,
        p.direccion_envio,
        
        -- DATOS CLIENTE (Blindados)
        COALESCE(c.nombre_completo, 'Usuario Eliminado') as nombre_completo,
        COALESCE(c.email, 'No disponible') as email,
        c.url_foto_perfil, -- Puede ser null, lo manejamos en el servicio
        
        -- DATOS PRODUCTO
        dp.cantidad,
        dp.precio_unitario,
        prod.nombre_producto,
        prod.url_foto_producto
        
      FROM Pedidos p
      -- IMPORTANTE: LEFT JOIN es obligatorio aquí
      LEFT JOIN Clientes c ON p.id_cliente = c.id_cliente
      LEFT JOIN Detalle_Pedidos dp ON p.id_pedido = dp.id_pedido
      LEFT JOIN Productos prod ON dp.id_producto = prod.id_producto
      
      ORDER BY p.fecha_pedido DESC
    `);

    return rows;
  }

  //actualizamos el estado del pedido
  static async UpdateEstadoPedido(id_pedido, nuevo_estado) {
    const [result] = await db.query(
      `UPDATE Pedidos SET estado = ? WHERE id_pedido = ?`,
      [nuevo_estado, id_pedido]
    );
    return result;
  }
}
