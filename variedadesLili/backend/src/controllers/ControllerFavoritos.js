// 👇 Importamos el SERVICIO, no el Modelo
import { ResponseProvider } from "../providers/ResponseProvider.js";
import { ServiceFavoritos } from "../services/ServiceFavoritos.js";

export class ControllerFavoritos {
  static GetWishlist = async (req, res) => {
    try {
      const { id } = req.params;

      // Llamada al Servicio
      const response = await ServiceFavoritos.GetWishlistService(id);

      // Manejo de respuesta basado en el retorno del servicio
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
      console.error("Error en ControllerFavoritos:", error);
      return ResponseProvider.error(res, "Error interno del servidor", 500);
    }
  };

  static AddFavorite = async (req, res) => {
    try {
      const { id } = req.params; // ID del cliente desde la URL
      const { id_producto } = req.body; // ID del producto desde el Body (JSON)

      const response = await ServiceFavoritos.AddFavoriteService(
        id,
        id_producto
      );

      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      return ResponseProvider.success(
        res,
        null,
        response.message,
        response.code
      );
    } catch (error) {
      console.error(error);
      return ResponseProvider.error(res, "Error interno", 500);
    }
  };
}
