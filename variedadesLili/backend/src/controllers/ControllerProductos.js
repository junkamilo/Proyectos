import { ResponseProvider } from "../providers/ResponseProvider.js";
import { ServiceProductos } from "../services/ServiceProductos.js";

export class ControllerProductos {
  static AddProducto = async (req, res) => {
    try {
      const { body, file } = req;

      // Añadimos la URL del archivo al body (si existe)
      if (file) {
        body.url_foto_producto = `/uploads/productos/${file.filename}`;
      }

      const response = await ServiceProductos.AddProductoService(body);

      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      console.error("[ControllerProductos:AddProducto] Error:", error);
      return ResponseProvider.error(res, "Error en el servidor", 500);
    }
  };
  static GetAllProductos = async (req, res) => {
     try {
      // 1. Verificamos si la URL trae un parámetro de categoría
      // Ejemplo: /productos?categoria=plantas
      const { categoria } = req.query;

      let response;

      // 2. Lógica de Decisión (Routing interno)
      if (categoria) {
        // Opción A: Si hay categoría, usamos el nuevo servicio
        console.log(`[Controller] Filtrando por: ${categoria}`);
        response = await ServiceProductos.GetProductosPorCategoriaService(
          categoria
        );
      } else {
        // Opción B: Si no hay categoría, traemos todo (comportamiento original)
        console.log("[Controller] Obteniendo todo el catálogo");
        response = await ServiceProductos.GetAllProductosService();
      }

      // 3. Manejo de Errores del Servicio (Lógica unificada)
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      // 4. Respuesta Exitosa
      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      console.error("[ControllerProductos:GetAllProductos] Error:", error);
      return ResponseProvider.error(res, "Error en el servidor", 500);
    }
  };
  static async UpdateProducto(req, res) {
    try {
      const { id } = req.params;
      const { body, file } = req;

      const data = {
        id_producto: id,
        ...body,
        url_foto_producto: file
          ? `/uploads/productos/${file.filename}`
          : body.url_foto_producto, // mantiene la URL si no suben nueva
      };

      const response = await ServiceProductos.UpdateProductoService(data);

      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      return ResponseProvider.success(
        res,
        response.message,
        response.data,
        response.code
      );
    } catch (error) {
      console.error("[ControllerProductos:UpdateProducto] Error:", error);
      return ResponseProvider.error(res, "Error interno del servidor", 500);
    }
  }
  static async DeleteProducto(req, res) {
    try {
      const { id } = req.params;

      const response = await ServiceProductos.DeleteProductoService(id);
      if (response.error) {
        return ResponseProvider.error(res, response.message, 400);
      }

      return ResponseProvider.success(res, response.message);
    } catch (error) {
      console.error("[DeleteProducto]", error);
      return ResponseProvider.error(res, "Error interno del servidor", 500);
    }
  }
}
