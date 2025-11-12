import { ResponseProvider } from "../providers/responseProvider.js";
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
}
