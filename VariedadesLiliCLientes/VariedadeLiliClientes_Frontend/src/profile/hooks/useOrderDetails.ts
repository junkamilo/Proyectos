import { useState } from "react";
import type { Pedido } from "../types/pedidos";
import { cancelarPedido, confirmarEntregaPedido, solicitarDevolucionPedido } from "../action/pedidos.service";


export const useOrderDetails = (pedido: Pedido, onClose: () => void) => {
    const [comentario, setComentario] = useState("");
    const [loading, setLoading] = useState(false);
    const [isReturnMode, setIsReturnMode] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState<any[]>([]);

    // --- LÓGICA DE PERMISOS ---
    const estadoLower = pedido.estado?.toLowerCase() || "";
    const puedeRecibir = estadoLower === 'enviado';
    const puedeCancelar = ['pendiente', 'pagado', 'activo'].includes(estadoLower);

    // --- MANEJADORES ---

    const toggleProductSelection = (item: any) => {
        const exists = selectedProducts.find(p => p.nombre_producto === item.nombre_producto);
        if (exists) {
            setSelectedProducts(selectedProducts.filter(p => p.nombre_producto !== item.nombre_producto));
        } else {
            setSelectedProducts([...selectedProducts, {
                id_producto: item.id_producto || 0,
                nombre_producto: item.nombre_producto,
                cantidad: item.cantidad
            }]);
        }
    };

    const resetState = () => {
        setIsReturnMode(false);
        setSelectedProducts([]);
        setComentario("");
    };

    // --- ACCIONES API ---

    const handleConfirmarEntrega = async () => {
        setLoading(true);
        try {
            const response = await confirmarEntregaPedido(pedido.id_pedido, comentario);
            alert(response.message || "¡Pedido recibido correctamente!");
            onClose();
            window.location.reload();
        } catch (error: any) {
            alert(error.message || "Error al confirmar.");
        } finally {
            setLoading(false);
        }
    };

    const handleEnviarDevolucion = async () => {
        if (selectedProducts.length === 0) {
            alert("⚠️ Selecciona al menos un producto.");
            return;
        }
        if (!comentario.trim()) {
            alert("⚠️ Escribe el motivo de la devolución.");
            return;
        }

        setLoading(true);
        try {
            await solicitarDevolucionPedido(pedido.id_pedido, selectedProducts, comentario);
            alert(`✅ Solicitud de devolución enviada.`);
            onClose();
            window.location.reload();
        } catch (error: any) {
            console.error(error);
            alert(error.message || "Error al procesar devolución.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancelarPedido = async () => {
        if (!confirm("¿Cancelar pedido? Esta acción es irreversible.")) return;
        
        setLoading(true);
        try {
            const response = await cancelarPedido(pedido.id_pedido);
            alert(response.message || "Pedido cancelado.");
            onClose();
            window.location.reload();
        } catch (error: any) {
            alert(error.message || "Error al cancelar.");
        } finally {
            setLoading(false);
        }
    };

    return {
        // Estados
        comentario, setComentario,
        loading,
        isReturnMode, setIsReturnMode,
        selectedProducts,
        puedeRecibir,
        puedeCancelar,
        
        // Métodos
        toggleProductSelection,
        handleConfirmarEntrega,
        handleEnviarDevolucion,
        handleCancelarPedido,
        resetState
    };
};