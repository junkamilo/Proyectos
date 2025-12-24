import { ResponseProvider } from "../providers/ResponseProvider.js";
import { ServiceCarrito } from "../services/ServiceCarShopping.js";


export class ControllerCarrito {
  
  // --- AGREGAR AL CARRITO ---
  static AddToCart = async (req, res) => {
    try {
      const { body } = req;

      // Llamamos al servicio
      const response = await ServiceCarrito.AddToCartService(body);

      // Si el servicio reporta error (ej: validación fallida)
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      // Éxito
      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      console.error("[ControllerCarrito:AddToCart] Error:", error);
      return ResponseProvider.error(res, "Error interno del servidor", 500);
    }
  };

  // --- OBTENER CARRITO POR CLIENTE ---
  static GetCartByClient = async (req, res) => {
    try {
      const { id } = req.params; // El ID del cliente viene en la URL

      const response = await ServiceCarrito.GetCartService(id);

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
      console.error("[ControllerCarrito:GetCartByClient] Error:", error);
      return ResponseProvider.error(res, "Error interno del servidor", 500);
    }
  };

  // --- ACTUALIZAR CANTIDAD ---
  static UpdateQuantity = async (req, res) => {
    try {
      const { body } = req;
      // El body debe traer { id_cliente, id_producto, cantidad }

      const response = await ServiceCarrito.UpdateQuantityService(body);

      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      return ResponseProvider.success(
        res,
        response.data, // A veces es null en actualizaciones, está bien
        response.message,
        response.code
      );
    } catch (error) {
      console.error("[ControllerCarrito:UpdateQuantity] Error:", error);
      return ResponseProvider.error(res, "Error interno del servidor", 500);
    }
  };

  // --- ELIMINAR ITEM ESPECÍFICO ---
  static RemoveItem = async (req, res) => {
    try {
      // OJO: Aquí asumimos que la ruta envía ambos parámetros
      // Ejemplo de ruta: /remove/:id_cliente/:id_producto
      const { id_cliente, id_producto } = req.params;

      const response = await ServiceCarrito.RemoveItemService(id_cliente, id_producto);

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
      console.error("[ControllerCarrito:RemoveItem] Error:", error);
      return ResponseProvider.error(res, "Error interno del servidor", 500);
    }
  };

  // --- VACIAR CARRITO COMPLETO ---
  static ClearCart = async (req, res) => {
    try {
      const { id } = req.params; // ID del cliente

      const response = await ServiceCarrito.ClearCartService(id);

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
      console.error("[ControllerCarrito:ClearCart] Error:", error);
      return ResponseProvider.error(res, "Error interno del servidor", 500);
    }
  };
}