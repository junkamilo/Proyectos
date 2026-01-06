import { Pedidos } from "../models/Pedidos.js";

// Función auxiliar para "Hace X tiempo"
const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval = seconds / 3600;
  if (interval > 1) return `Hace ${Math.floor(interval)} horas`;
  interval = seconds / 60;
  if (interval > 1) return `Hace ${Math.floor(interval)} minutos`;
  return "Hace un momento";
};

// Función auxiliar de fecha
const formatearFechaRelativa = (fechaSQL) => {
  if (!fechaSQL) return "Sin fecha";
  const fecha = new Date(fechaSQL);
  const ahora = new Date();
  const diff = Math.floor((ahora - fecha) / 1000);
  if (diff < 3600) return "Hace un momento";
  if (diff < 86400) return `Hace ${Math.floor(diff / 3600)} horas`;
  return fecha.toLocaleDateString("es-CO");
};

export class ServicePedidos {
  // Lógica para procesar la compra
  static async CrearPedidoService(data) {
    try {
      // 1. Validación de campos obligatorios
      if (!data.id_cliente) {
        return {
          error: true,
          code: 400,
          message:
            "El campo 'id_cliente' es obligatorio para procesar la compra.",
        };
      }

      // 2. Llamamos al Modelo (que maneja la transacción SQL)
      const resultado = await Pedidos.CrearPedido(data.id_cliente);

      // 3. Respuesta Exitosa
      return {
        error: false,
        code: 201,
        message: "Compra realizada con éxito",
        data: resultado,
      };
    } catch (error) {
      console.error("[ServicePedidos:CrearPedidoService] Error:", error);

      // Manejo de error específico: Carrito Vacío (lanzado desde el modelo)
      if (error.message.includes("carrito está vacío")) {
        return {
          error: true,
          code: 400, // Bad Request
          message:
            "No se puede procesar la compra porque el carrito está vacío.",
        };
      }

      // Error Genérico
      return {
        error: true,
        code: 500,
        message: "Error interno al procesar el pedido",
        details: process.env.NODE_ENV === "development" ? error.message : null,
      };
    }
  }

  static async GetPedidoDetalladoService(id_pedido) {
    try {
      const resultado = await Pedidos.GetPedidoById(id_pedido);

      if (!resultado) {
        return { error: true, code: 404, message: "Pedido no encontrado" };
      }

      const { datos_pedido, lista_productos } = resultado;

      // --- AQUÍ CONSTRUIMOS TU JSON PERSONALIZADO ---
      const pedidoFormateado = {
        id: `ORD-${datos_pedido.id_pedido}`, // Formato "ORD-7829"
        fecha: timeAgo(datos_pedido.fecha_pedido), // "Hace 2 horas"
        estado: datos_pedido.estado,
        usuario: {
          nombre: datos_pedido.nombre_completo,
          avatar: datos_pedido.url_foto_perfil || "https://i.pravatar.cc/150", // Fallback si es null
          email: datos_pedido.email,
        },
        direccion: datos_pedido.direccion_envio || "Dirección no registrada",
        productos: lista_productos.map((prod) => ({
          nombre: prod.nombre_producto,
          cantidad: prod.cantidad,
          precio: Number(prod.precio_unitario), // Asegurar que sea número
          img: prod.url_foto_producto || "https://via.placeholder.com/50",
        })),
        total: Number(datos_pedido.total),
      };

      return {
        error: false,
        code: 200,
        message: "Pedido obtenido con éxito",
        data: pedidoFormateado,
      };
    } catch (error) {
      console.error("[ServicePedidos] Error:", error);
      return { error: true, code: 500, message: "Error interno" };
    }
  }

  // Lógica para obtener el historial
  static async GetHistorialService(id_cliente) {
    try {
      if (!id_cliente) {
        return {
          error: true,
          code: 400,
          message:
            "El 'id_cliente' es obligatorio para consultar el historial.",
        };
      }

      const pedidos = await Pedidos.GetPedidosPorCliente(id_cliente);

      return {
        error: false,
        code: 200,
        message: "Historial de pedidos obtenido correctamente",
        data: pedidos,
      };
    } catch (error) {
      console.error("[ServicePedidos:GetHistorialService] Error:", error);

      return {
        error: true,
        code: 500,
        message: "Error interno al obtener el historial",
        details: process.env.NODE_ENV === "development" ? error.message : null,
      };
    }
  }
  // Servicio para obtener detalles
  static async GetDetallePedidoService(id_pedido) {
    try {
      if (!id_pedido) {
        return {
          error: true,
          code: 400,
          message: "El 'id_pedido' es obligatorio.",
        };
      }

      const detalles = await Pedidos.GetDetallePedido(id_pedido);

      return {
        error: false,
        code: 200,
        message: "Detalles del pedido obtenidos correctamente",
        data: detalles,
      };
    } catch (error) {
      console.error("[ServicePedidos:GetDetallePedidoService] Error:", error);
      return {
        error: true,
        code: 500,
        message: "Error interno al obtener los detalles",
        details: process.env.NODE_ENV === "development" ? error.message : null,
      };
    }
  }

  static async GetAllPedidosService() {
    try {
      const filasCrud = await Pedidos.GetAllPedidosConDetalles();

      const pedidosMap = new Map();

      for (const fila of filasCrud) {
        const id = fila.id_pedido;

        if (!pedidosMap.has(id)) {
          pedidosMap.set(id, {
            id: `ORD-${id}`,
            fecha: formatearFechaRelativa(fila.fecha_pedido),
            estado: fila.estado,

            // AQUÍ ESTABA EL POSIBLE ERROR:
            // No lanzamos error, simplemente asignamos lo que venga de SQL
            usuario: {
              nombre: fila.nombre_completo, // Ya viene con texto gracias a COALESCE
              avatar:
                fila.url_foto_perfil || "https://ui-avatars.com/api/?name=X", // Fallback si no hay foto
              email: fila.email,
            },

            direccion: fila.direccion_envio || "Dirección no registrada",
            productos: [],
            total: Number(fila.total),
          });
        }

        // Solo agregamos productos si la fila tiene datos de producto
        if (fila.nombre_producto) {
          pedidosMap.get(id).productos.push({
            nombre: fila.nombre_producto,
            cantidad: fila.cantidad,
            precio: Number(fila.precio_unitario),
            img: fila.url_foto_producto || "https://via.placeholder.com/50",
          });
        }
      }

      const listaFinal = Array.from(pedidosMap.values());

      return {
        error: false,
        code: 200,
        message: "Lista de pedidos obtenida correctamente",
        data: listaFinal,
      };
    } catch (error) {
      // Si sigue fallando, esto nos dirá exactamente dónde
      console.error("🔴 ERROR CRÍTICO EN SERVICE:", error);
      return {
        error: true,
        code: 500,
        message: "Error interno al procesar pedidos",
        details: error.message,
      };
    }
  }

  static async MarcarComoEnviadoService(id_pedido) {
    try {
      // 1. Ejecutamos la actualización
      const result = await Pedidos.UpdateEstadoPedido(id_pedido, 'enviado');

      // 2. Validamos si se actualizó alguna fila
      if (result.affectedRows === 0) {
        return {
          error: true,
          code: 404,
          message: "El pedido no existe o no se pudo actualizar.",
        };
      }

      return {
        error: false,
        code: 200,
        message: "Pedido marcado como ENVIADO correctamente.",
        data: { id_pedido, nuevo_estado: 'enviado' }
      };

    } catch (error) {
      console.error("[ServicePedidos:MarcarEnviado] Error:", error);
      return {
        error: true,
        code: 500,
        message: "Error interno al actualizar el estado",
      };
    }
  }
}
