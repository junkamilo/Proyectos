import db from "../utils/db.js";

export class Productos {
  //Agregamos productos
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
  //seleccionamos todos los productos
  static async GetAllProductos() {
    const [rows] = await db.query(`
    SELECT 
      id_producto,
      nombre_producto,
      url_foto_producto,
      cantidad,
      descripcion,
      precio,
      tamano,
      categoria,
      material,
      estado,
      fecha_creacion,
      fecha_actualizacion
    FROM Productos
    ORDER BY fecha_creacion DESC;
  `);

    return rows;
  }

  static async GetProductosPorCategoria(categoria) {
    const [rows] = await db.query(
      `
    SELECT 
      id_producto,
      nombre_producto,
      url_foto_producto,
      cantidad,
      descripcion,
      precio,
      tamano,
      categoria,
      material,
      estado,
      fecha_creacion,
      fecha_actualizacion
    FROM Productos
    WHERE categoria = ? 
    ORDER BY fecha_creacion DESC;
  `,
      [categoria]
    ); // Pasamos la categoría como parámetro seguro

    return rows;
  }
  //actualizamos o editamos los productos
  static async UpdateProductos(
    id_producto,
    nombre_producto,
    url_foto_producto,
    cantidad,
    descripcion,
    precio,
    tamano,
    categoria,
    material,
    estado
  ) {
    // Construimos partes dinámicas
    let query = `
    UPDATE Productos
    SET 
      nombre_producto = ?,
      cantidad = ?,
      descripcion = ?,
      precio = ?,
      tamano = ?,
      categoria = ?,
      material = ?,
      estado = ?,
      fecha_actualizacion = NOW()
  `;

    const params = [
      nombre_producto,
      cantidad,
      descripcion,
      precio,
      tamano,
      categoria,
      material,
      estado,
    ];

    // Solo agregamos la imagen si viene definida
    if (url_foto_producto !== undefined) {
      query += `, url_foto_producto = ?`;
      params.push(url_foto_producto);
    }

    query += ` WHERE id_producto = ?`;
    params.push(id_producto);

    const [result] = await db.query(query, params);

    return { updated: result.affectedRows > 0 };
  }
  // Eliminar un producto por ID
  static async DeleteProducto(id_producto) {
    const query = `
    DELETE FROM Productos
    WHERE id_producto = ?
  `;

    const [result] = await db.query(query, [id_producto]);

    return {
      deleted: result.affectedRows > 0,
    };
  }
}
