import { Productos } from "../models/Productos.js";

export class ServiceProductos {
  static async AddProductoService(data) {
    try {
      // Validar campos obligatorios
      const camposObligatorios = [
        "nombre_producto",
        "url_foto_producto",
        "cantidad",
        "descripcion",
        "precio",
        "tamano",
        "categoria",
        "material",
        "estado",
      ];

      //validamos que los campos deben ser llenados obligatoriamente
      for (const campo of camposObligatorios) {
        if (!data[campo]) {
          return {
            error: true,
            code: 400,
            message: `El campo '${campo}' es de caracter obligatorio.`,
          };
        }
      }

      // Insertamos un producto instanciando Productos model
      const nuevoProducto = await Productos.AddProductos(data);

      return {
        error: false,
        code: 201,
        message: "Producto agregado correctamente",
        data: nuevoProducto,
      };
    } catch (error) {
      console.error("[ServiceProductos:AddProductoService] Error:", error);

      return {
        error: true,
        code: 500,
        message: "Error interno al agregar el producto",
        details: process.env.NODE_ENV === "development" ? error.message : null,
      };
    }
  }
  static async GetAllProductosService() {
    try {
      const productos = await Productos.GetAllProductos();

      return {
        error: false,
        code: 200,
        message: "Productos obtenidos correctamente",
        data: productos,
      };
    } catch (error) {
      console.error("[ServiceProductos:GetAllProductosService] Error:", error);

      return {
        error: true,
        code: 500,
        message: "Error interno al obtener los productos",
        details: process.env.NODE_ENV === "development" ? error.message : null,
      };
    }
  }
}
