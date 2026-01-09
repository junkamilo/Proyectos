import { ResponseProvider } from "../providers/ResponseProvider.js";
import { ServicePedidos } from "../services/ServicePedido.js";

export class ControllerPedidos {
  // 1. Método para procesar la compra (POST)
  static CrearPedido = async (req, res) => {
    try {
      // Extraemos el body de la petición (aquí viene el { id_cliente })
      const { body } = req;

      console.log(
        "[ControllerPedidos] Iniciando proceso de compra para cliente:",
        body.id_cliente
      );

      // Llamamos al servicio
      const response = await ServicePedidos.CrearPedidoService(body);

      // Si el servicio retornó error (ej. carrito vacío), respondemos con error
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      // Si todo salió bien, respondemos con éxito (201 Created)
      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      console.error("[ControllerPedidos:CrearPedido] Error:", error);
      return ResponseProvider.error(res, "Error interno del servidor", 500);
    }
  };

  // 2. Método para obtener el historial (GET)
  static GetHistorial = async (req, res) => {
    try {
      // Extraemos el ID de los parámetros de la URL
      // Ejemplo: GET /api/pedidos/historial/5  -> id_cliente = 5
      const { id_cliente } = req.params;

      console.log(
        "[ControllerPedidos] Obteniendo historial para cliente:",
        id_cliente
      );

      const response = await ServicePedidos.GetHistorialService(id_cliente);

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
      console.error("[ControllerPedidos:GetHistorial] Error:", error);
      return ResponseProvider.error(res, "Error interno del servidor", 500);
    }
  };

  // 3. Método para ver qué productos hay en un pedido (GET)
  static GetDetalle = async (req, res) => {
    try {
      const { id_pedido } = req.params;

      const response = await ServicePedidos.GetDetallePedidoService(id_pedido);

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
      console.error("[ControllerPedidos:GetDetalle] Error:", error);
      return ResponseProvider.error(res, "Error interno del servidor", 500);
    }
  };

  static GetOnePedido = async (req, res) => {
    try {
      const { id } = req.params; // El id viene de la URL (ej: /api/pedidos/45)

      const response = await ServicePedidos.GetPedidoDetalladoService(id);

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
      return ResponseProvider.error(res, "Error interno", 500);
    }
  };

  static GetAllPedidos = async (req, res) => {
    console.log("👉 Entrando al Controlador: GetAllPedidos");
    try {
      const response = await ServicePedidos.GetAllPedidosService();

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
      return ResponseProvider.error(res, "Error interno", 500);
    }
  };

  static MarcarEnviado = async (req, res) => {
    try {
      const { id } = req.params; // Viene de la URL /enviar/:id

      const response = await ServicePedidos.MarcarComoEnviadoService(id);

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
      return ResponseProvider.error(res, "Error interno", 500);
    }
  };

  static MarcarEntregado = async (req, res) => {
    try {
      const { id } = req.params; // ID del pedido
      const { comentario } = req.body; // Comentario enviado desde el modal

      const response = await ServicePedidos.MarcarComoEntregadoService(
        id,
        comentario
      );

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
      console.error(error);
      return ResponseProvider.error(res, "Error interno", 500);
    }
  };

  static SolicitarDevolucion = async (req, res) => {
    try {
      const { id } = req.params; // ID del pedido desde la URL
      const { productos, motivo } = req.body; // Datos desde el Frontend

      console.log(`[Controller] Procesando devolución pedido #${id}`);

      const response = await ServicePedidos.SolicitarDevolucionService(
        id,
        productos,
        motivo
      );

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
      console.error(error);
      return ResponseProvider.error(res, "Error interno del servidor", 500);
    }
  };

  static CancelarPedido = async (req, res) => {
    try {
      const { id } = req.params;

      console.log(`[Controller] Cancelando pedido #${id}`);

      const response = await ServicePedidos.CancelarPedidoService(id);

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
      console.error(error);
      return ResponseProvider.error(res, "Error interno del servidor", 500);
    }
  };
}
