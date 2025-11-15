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
  static async UpdateProductoService(data) {
    try {
      if (!data.id_producto) {
        return {
          error: true,
          code: 400,
          message: "El 'id_producto' es obligatorio para actualizar.",
        };
      }

      const camposObligatorios = [
        "nombre_producto",
        "cantidad",
        "descripcion",
        "precio",
        "tamano",
        "categoria",
        "material",
        "estado",
      ];

      for (const campo of camposObligatorios) {
        if (data[campo] === undefined || data[campo] === null) {
          return {
            error: true,
            code: 400,
            message: `El campo '${campo}' es obligatorio.`,
          };
        }
      }

      // url_foto_producto puede venir vacío → NO la borramos
      const urlFinal = data.url_foto_producto
        ? data.url_foto_producto
        : undefined;

      const actualizado = await Productos.UpdateProductos(
        data.id_producto,
        data.nombre_producto,
        urlFinal,
        data.cantidad,
        data.descripcion,
        data.precio,
        data.tamano,
        data.categoria,
        data.material,
        data.estado
      );

      if (!actualizado.updated) {
        return {
          error: true,
          code: 400,
          message: "No se pudo actualizar el producto.",
        };
      }

      return {
        error: false,
        code: 200,
        message: "Producto actualizado correctamente",
        data: actualizado,
      };
    } catch (error) {
      console.error("[ServiceProductos:UpdateProductoService] Error:", error);

      return {
        error: true,
        code: 500,
        message: "Error interno al actualizar el producto",
        details: process.env.NODE_ENV === "development" ? error.message : null,
      };
    }
  }
  static async DeleteProductoService(id_producto) {
    try {
      const response = await Productos.DeleteProducto(id_producto);
      if (!response.deleted) {
        return {
          error: true,
          message: "No se pudo eliminar el producto",
          code: "NOT_FOUND",
        };
      }

      return {
        error: false,
        message: "Producto eliminado correctamente",
      };
    } catch (err) {
      console.error("[ServiceProductos:DeleteProductoService] Error:", err);
      return {
        error: true,
        message: "Error interno al eliminar el producto",
        code: "INTERNAL_ERROR",
      };
    }
  }
}
