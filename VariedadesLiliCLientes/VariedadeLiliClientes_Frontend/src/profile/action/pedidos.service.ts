import { pedidosApi } from "../api/pedidos.api";
import type { Pedido } from "../types/pedidos";

export const getHistorialPedidos = async (userId: string | number): Promise<Pedido[]> => {

    if (!userId) return [];

    try {
        const response = await pedidosApi.get(`/historial/${userId}`);
        const jsonBody = response.data; // Nivel 0: { status: 'success', data: { error: false, data: [...] } }

        // console.log("📦 JSON Crudo:", jsonBody); // Descomenta si quieres depurar

        // --- CORRECCIÓN DE LA MUÑECA RUSA ---

        // Caso 1: Estructura anidada (Tu caso actual)
        // jsonBody.data existe Y jsonBody.data.data es el array real
        if (jsonBody.data && jsonBody.data.data && Array.isArray(jsonBody.data.data)) {
            return jsonBody.data.data;
        }

        // Caso 2: Estructura simple (Por si limpias el backend luego)
        // jsonBody.data es directamente el array
        if (jsonBody.data && Array.isArray(jsonBody.data)) {
            return jsonBody.data;
        }

        throw new Error("La respuesta del servidor no tiene el formato esperado de lista.");

    } catch (error: any) {
        console.error("❌ Error en getHistorialPedidos:", error);
        // Retornamos array vacío para que la UI no explote, pero mostramos error en consola
        return [];
    }
};

/**
 * Actualiza el estado del pedido a 'entregado' y guarda el comentario.
 */
export const confirmarEntregaPedido = async (idPedido: string | number, comentario: string): Promise<any> => {

    if (!idPedido) throw new Error("ID de pedido requerido");

    try {
        // Hacemos la petición PATCH a /api/pedido/recibir/:id
        const response = await pedidosApi.patch(`/recibir/${idPedido}`, {
            comentario: comentario // Enviamos el comentario en el body
        });

        const jsonBody = response.data;

        // Validamos que la respuesta sea exitosa (basado en tu ResponseProvider)
        if (jsonBody.status === 'success') {
            return jsonBody;
        }

        // Si el backend responde 200 pero con error lógico
        throw new Error(jsonBody.message || "No se pudo actualizar el estado del pedido.");

    } catch (error: any) {
        console.error("❌ Error en confirmarEntregaPedido:", error);

        // Extraemos el mensaje de error del backend si existe (axios error response)
        const mensaje = error.response?.data?.message || error.message || "Error de conexión";

        // Lanzamos el error para que el Modal pueda mostrar el alert
        throw new Error(mensaje);
    }
};

export const solicitarDevolucionPedido = async (
    idPedido: string | number,
    productos: any[],
    motivo: string
): Promise<any> => {

    if (!idPedido) throw new Error("ID de pedido requerido");

    try {
        // Hacemos POST a /api/pedido/devolucion/:id
        const response = await pedidosApi.post(`/devolucion/${idPedido}`, {
            productos,
            motivo
        });

        const jsonBody = response.data;

        if (jsonBody.status === 'success') {
            return jsonBody;
        }

        throw new Error(jsonBody.message || "Error al solicitar devolución.");

    } catch (error: any) {
        console.error("❌ Error en solicitarDevolucionPedido:", error);
        const mensaje = error.response?.data?.message || error.message || "Error de conexión";
        throw new Error(mensaje);
    }
};