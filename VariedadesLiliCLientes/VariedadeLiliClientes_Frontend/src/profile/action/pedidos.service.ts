import { pedidosApi } from "../api/pedidos.api";
import type { Pedido } from "../types/pedidos";

export const getHistorialPedidos = async (userId: string | number): Promise<Pedido[]> => {

    if (!userId) return [];

    try {
        const response = await pedidosApi.get(`/historial/${userId}`);
        const jsonBody = response.data;

        if (jsonBody.data && jsonBody.data.data && Array.isArray(jsonBody.data.data)) {
            return jsonBody.data.data;
        }

        
        if (jsonBody.data && Array.isArray(jsonBody.data)) {
            return jsonBody.data;
        }

        throw new Error("La respuesta del servidor no tiene el formato esperado de lista.");

    } catch (error: any) {
        console.error("❌ Error en getHistorialPedidos:", error);

        return [];
    }
};

export const confirmarEntregaPedido = async (idPedido: string | number, comentario: string): Promise<any> => {

    if (!idPedido) throw new Error("ID de pedido requerido");

    try {
        
        const response = await pedidosApi.patch(`/recibir/${idPedido}`, {
            comentario: comentario 
        });

        const jsonBody = response.data;

        
        if (jsonBody.status === 'success') {
            return jsonBody;
        }

        
        throw new Error(jsonBody.message || "No se pudo actualizar el estado del pedido.");

    } catch (error: any) {
        console.error("❌ Error en confirmarEntregaPedido:", error);

        
        const mensaje = error.response?.data?.message || error.message || "Error de conexión";

        
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

export const cancelarPedido = async (idPedido: string | number): Promise<any> => {
    if (!idPedido) throw new Error("ID de pedido requerido");

    try {
        
        const response = await pedidosApi.patch(`/cancelar/${idPedido}`);

        const jsonBody = response.data;

        if (jsonBody.status === 'success') {
            return jsonBody;
        }
        throw new Error(jsonBody.message || "No se pudo cancelar el pedido.");

    } catch (error: any) {
        console.error("❌ Error en cancelarPedido:", error);
        throw new Error(error.response?.data?.message || "Error de conexión");
    }
};