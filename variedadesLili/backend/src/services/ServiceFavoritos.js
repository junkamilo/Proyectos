import { Favoritos } from "../models/Favoritos.js";

export class ServiceFavoritos {
  // Obtener la lista de deseos
  static async GetWishlistService(id_cliente) {
    try {
      // Validar que venga el ID
      if (!id_cliente) {
        return {
          error: true,
          code: 400,
          message: "ID de cliente requerido.",
        };
      }

      // Llamar al Modelo
      const lista = await Favoritos.getByClient(id_cliente);

      // Retornar respuesta estandarizada
      return {
        error: false,
        code: 200,
        data: lista || [], // Aseguramos que siempre devuelva un array
        message: "Lista de favoritos obtenida correctamente.",
      };
    } catch (error) {
      console.error("[ServiceFavoritos] Error:", error);
      return {
        error: true,
        code: 500,
        message: "Error interno al obtener los favoritos.",
      };
    }
  }

  static async AddFavoriteService(id_cliente, id_producto) {
    try {
      if (!id_cliente || !id_producto) {
        return {
          error: true,
          code: 400,
          message: "Faltan datos (cliente o producto).",
        };
      }

      await Favoritos.add(id_cliente, id_producto);

      return {
        error: false,
        code: 201, // 201 = Creado exitosamente
        message: "Producto agregado a tus favoritos.",
      };
    } catch (error) {
      // Manejo específico si ya existe
      if (error.message === "DUPLICATE_ENTRY") {
        return {
          error: true, // Lo marcamos como error o advertencia según prefieras
          code: 409, // 409 = Conflicto
          message: "Este producto ya está en tu lista de deseos.",
        };
      }

      console.error("[ServiceFavoritos] Error:", error);
      return {
        error: true,
        code: 500,
        message: "Error interno al agregar favorito.",
      };
    }
  }
}
