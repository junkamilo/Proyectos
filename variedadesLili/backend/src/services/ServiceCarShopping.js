import { CardShopping } from "../models/CardShopping.js";

export class ServiceCarrito {
  
  // --- AGREGAR PRODUCTO AL CARRITO ---
  static async AddToCartService(data) {
    try {
      // 1. Validar campos obligatorios
      const camposObligatorios = ["id_cliente", "id_producto", "cantidad"];

      for (const campo of camposObligatorios) {
        if (!data[campo]) {
          return {
            error: true,
            code: 400,
            message: `El campo '${campo}' es obligatorio.`,
          };
        }
      }

      // 2. Validar que la cantidad sea positiva
      if (data.cantidad <= 0) {
        return {
          error: true,
          code: 400,
          message: "La cantidad debe ser mayor a 0.",
        };
      }

      // 3. Llamar al modelo
      const result = await CardShopping.addToCart(data);

      return {
        error: false,
        code: 201,
        message: "Producto agregado al carrito exitosamente",
        data: result,
      };

    } catch (error) {
      console.error("[ServiceCarrito:AddToCartService] Error:", error);
      return {
        error: true,
        code: 500,
        message: "Error interno al agregar al carrito",
        details: process.env.NODE_ENV === "development" ? error.message : null,
      };
    }
  }

  // --- OBTENER CARRITO DEL CLIENTE ---
  static async GetCartService(id_cliente) {
    try {
      if (!id_cliente) {
        return {
          error: true,
          code: 400,
          message: "El ID del cliente es requerido.",
        };
      }

      const carrito = await CardShopping.getCartByClient(id_cliente);

      // Opcional: Calcular el total absoluto del carrito aquí si quieres enviarlo ya listo
      // const total = carrito.reduce((acc, item) => acc + parseFloat(item.subtotal), 0);

      return {
        error: false,
        code: 200,
        message: "Carrito obtenido correctamente",
        data: carrito,
        // totalCarrito: total (opcional)
      };

    } catch (error) {
      console.error("[ServiceCarrito:GetCartService] Error:", error);
      return {
        error: true,
        code: 500,
        message: "Error interno al obtener el carrito",
        details: process.env.NODE_ENV === "development" ? error.message : null,
      };
    }
  }

  // --- ACTUALIZAR CANTIDAD ---
  static async UpdateQuantityService(data) {
    try {
      // Validamos campos necesarios para identificar qué actualizar
      const camposObligatorios = ["id_cliente", "id_producto", "cantidad"];

      for (const campo of camposObligatorios) {
        if (data[campo] === undefined || data[campo] === null) {
          return {
            error: true,
            code: 400,
            message: `El campo '${campo}' es obligatorio para actualizar.`,
          };
        }
      }

      if (data.cantidad <= 0) {
        return {
          error: true,
          code: 400,
          message: "La cantidad debe ser mayor a 0. Si deseas eliminar, usa el endpoint de eliminar.",
        };
      }

      const response = await CardShopping.updateQuantity(data);

      if (!response.updated) {
        return {
          error: true,
          code: 404, // Not Found
          message: "No se encontró el producto en el carrito de este cliente.",
        };
      }

      return {
        error: false,
        code: 200,
        message: "Cantidad actualizada correctamente",
      };

    } catch (error) {
      console.error("[ServiceCarrito:UpdateQuantityService] Error:", error);
      return {
        error: true,
        code: 500,
        message: "Error interno al actualizar la cantidad",
        details: process.env.NODE_ENV === "development" ? error.message : null,
      };
    }
  }

  // --- ELIMINAR UN ITEM ---
  static async RemoveItemService(id_cliente, id_producto) {
    try {
      if (!id_cliente || !id_producto) {
        return {
          error: true,
          code: 400,
          message: "Se requieren id_cliente e id_producto.",
        };
      }

      const response = await CardShopping.removeItem(id_cliente, id_producto);

      if (!response.deleted) {
        return {
          error: true,
          code: 404,
          message: "El producto no estaba en el carrito o ya fue eliminado.",
        };
      }

      return {
        error: false,
        code: 200,
        message: "Producto eliminado del carrito correctamente",
      };

    } catch (error) {
      console.error("[ServiceCarrito:RemoveItemService] Error:", error);
      return {
        error: true,
        code: 500,
        message: "Error interno al eliminar el producto del carrito",
        details: process.env.NODE_ENV === "development" ? error.message : null,
      };
    }
  }

  // --- VACIAR CARRITO (Al comprar o limpiar) ---
  static async ClearCartService(id_cliente) {
    try {
      if (!id_cliente) {
        return {
          error: true,
          code: 400,
          message: "El ID del cliente es requerido.",
        };
      }

      const response = await CardShopping.clearCart(id_cliente);

      // Nota: Si response.cleared es false, puede significar que el carrito ya estaba vacío,
      // por lo que generalmente no retornamos error 404, sino éxito igual.
      
      return {
        error: false,
        code: 200,
        message: "Carrito vaciado correctamente",
      };

    } catch (error) {
      console.error("[ServiceCarrito:ClearCartService] Error:", error);
      return {
        error: true,
        code: 500,
        message: "Error interno al vaciar el carrito",
        details: process.env.NODE_ENV === "development" ? error.message : null,
      };
    }
  }
}