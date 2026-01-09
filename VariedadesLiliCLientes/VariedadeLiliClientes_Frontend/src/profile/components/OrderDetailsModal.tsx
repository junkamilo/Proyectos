import { useState } from "react"
import {
    Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { PackageCheck, ChevronRight, AlertTriangle, Undo2, CheckSquare, Square } from "lucide-react"
import type { Pedido } from "../types/pedidos"

// 👇 Importamos AMBOS servicios
import { confirmarEntregaPedido, solicitarDevolucionPedido } from "../action/pedidos.service"

const fixImgUrl = (path?: string) => {
    if (!path) return "https://via.placeholder.com/150";
    if (path.startsWith("http")) return path;
    return `http://localhost:3000${path}`;
};

interface OrderDetailsModalProps {
    pedido: Pedido;
}

export const OrderDetailsModal = ({ pedido }: OrderDetailsModalProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [comentario, setComentario] = useState("");
    const [loading, setLoading] = useState(false);

    // --- NUEVOS ESTADOS PARA DEVOLUCIÓN ---
    const [isReturnMode, setIsReturnMode] = useState(false); // ¿Estamos devolviendo?
    const [selectedProducts, setSelectedProducts] = useState<any[]>([]); // Productos seleccionados

    const items = pedido.productos || [];
    // Permitimos acciones si está enviado o 'reclamado' (para ver estado)
    const puedeRecibir = pedido.estado.toLowerCase() === 'enviado';

    // 1. LÓGICA DE SELECCIÓN DE PRODUCTOS
    const toggleProductSelection = (item: any) => {
        // Verificamos si ya está seleccionado
        const exists = selectedProducts.find(p => p.nombre_producto === item.nombre_producto);

        if (exists) {
            // Si existe, lo quitamos
            setSelectedProducts(selectedProducts.filter(p => p.nombre_producto !== item.nombre_producto));
        } else {
            // Si no existe, lo agregamos. 
            // IMPORTANTE: Asegúrate de que 'item' tenga 'id_producto' desde el backend.
            // Si no lo tienes aún en el JSON, usa nombre_producto temporalmente, pero id es mejor.
            setSelectedProducts([...selectedProducts, {
                id_producto: item.id_producto || 0, // Fallback si falta ID en el SELECT
                nombre_producto: item.nombre_producto,
                cantidad: item.cantidad
            }]);
        }
    };

    // 2. CONFIRMAR RECEPCIÓN (TODO OK)
    const handleConfirmarEntrega = async () => {
        setLoading(true);
        try {
            const response = await confirmarEntregaPedido(pedido.id_pedido, comentario);
            alert(response.message || "¡Gracias! Hemos registrado que recibiste tu pedido.");
            setIsOpen(false);
            window.location.reload();
        } catch (error: any) {
            alert(error.message || "Hubo un error al confirmar.");
        } finally {
            setLoading(false);
        }
    };

    // 3. CONFIRMAR DEVOLUCIÓN (PROBLEMAS)
    const handleEnviarDevolucion = async () => {
        if (selectedProducts.length === 0) {
            alert("⚠️ Selecciona al menos un producto para devolver.");
            return;
        }
        if (!comentario.trim()) {
            alert("⚠️ Por favor escribe el motivo de la devolución.");
            return;
        }

        setLoading(true);
        try {
            // Llamamos al servicio de devolución
            const response = await solicitarDevolucionPedido(pedido.id_pedido, selectedProducts, comentario);

            alert(`✅ Solicitud enviada. Devolviendo ${selectedProducts.length} productos.`);
            setIsOpen(false);
            window.location.reload();
        } catch (error: any) {
            console.error(error);
            alert(error.message || "Error al procesar la devolución.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) { setIsReturnMode(false); setSelectedProducts([]); setComentario(""); } // Reset al cerrar
        }}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="w-full justify-between hover:bg-white dark:hover:bg-slate-800 text-slate-600 group">
                    <span className="text-xs font-medium">Ver detalles del pedido</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl max-h-[85vh] flex flex-col p-0 bg-white dark:bg-slate-900 gap-0 overflow-hidden">

                {/* HEADER DINÁMICO */}
                <DialogHeader className="p-6 pb-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
                    <DialogTitle className="flex items-center gap-3 text-xl">
                        {/* Cambia color según modo */}
                        <span className={`${isReturnMode ? "text-red-600" : "text-emerald-600"} font-mono tracking-tight`}>
                            {isReturnMode ? "Solicitar Devolución" : `#ORD-${pedido.id_pedido}`}
                        </span>

                        {!isReturnMode && (
                            <>
                                <span className="h-4 w-px bg-slate-200 dark:bg-slate-700"></span>
                                <span className="text-slate-600 dark:text-slate-300 text-base font-medium">Detalles</span>
                            </>
                        )}
                    </DialogTitle>
                    <DialogDescription>
                        {isReturnMode
                            ? "Selecciona los productos que presentan problemas."
                            : "Revisa los artículos incluidos y el estado actual del envío."
                        }
                    </DialogDescription>
                </DialogHeader>

                {/* BODY */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-8 pb-4">

                        {/* LISTA DE PRODUCTOS */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center sticky top-[-24px] bg-white dark:bg-slate-900 z-10 py-2 border-b border-transparent">
                                <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2 uppercase tracking-wider">
                                    <PackageCheck className="w-4 h-4 text-emerald-500" />
                                    Productos ({items.length})
                                </h4>
                                {isReturnMode && (
                                    <span className="text-xs font-bold text-red-500 animate-pulse">
                                        Seleccionados: {selectedProducts.length}
                                    </span>
                                )}
                            </div>

                            <div className="grid gap-3">
                                {items.map((item: any, idx: number) => {
                                    // Verificar si está seleccionado
                                    const isSelected = selectedProducts.some(p => p.nombre_producto === item.nombre_producto);

                                    return (
                                        <div
                                            key={idx}
                                            onClick={() => isReturnMode && toggleProductSelection(item)} // Click para seleccionar
                                            className={`
                                                flex items-center gap-4 p-3 rounded-xl border transition-all
                                                ${isReturnMode
                                                    ? "cursor-pointer hover:border-red-300" // Estilos en modo devolución
                                                    : "border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40" // Estilos normales
                                                }
                                                ${isSelected
                                                    ? "bg-red-50 border-red-500 dark:bg-red-900/20 dark:border-red-500"
                                                    : ""
                                                }
                                            `}
                                        >
                                            {/* CHECKBOX VISUAL */}
                                            {isReturnMode && (
                                                <div className={`shrink-0 text-slate-400 ${isSelected ? "text-red-500" : ""}`}>
                                                    {isSelected ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                                                </div>
                                            )}

                                            <div className="h-16 w-16 rounded-lg bg-white overflow-hidden border border-slate-200 shrink-0 shadow-sm">
                                                <img src={fixImgUrl(item.url_foto_producto)} alt={item.nombre_producto} className="h-full w-full object-cover" />
                                            </div>

                                            <div className="flex-1 min-w-0 grid gap-1">
                                                <p className={`font-semibold truncate ${isSelected ? "text-red-700 dark:text-red-300" : "text-slate-900 dark:text-white"}`}>
                                                    {item.nombre_producto}
                                                </p>
                                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                                    <span className="bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-600">
                                                        x{item.cantidad}
                                                    </span>
                                                    <span>a ${Number(item.precio_unitario).toLocaleString('es-CO')}</span>
                                                </div>
                                            </div>
                                            <div className="text-right font-bold text-slate-700 dark:text-slate-300 text-sm whitespace-nowrap">
                                                ${(item.cantidad * item.precio_unitario).toLocaleString('es-CO')}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* RESUMEN DE PAGO (Solo visible en modo normal) */}
                        {!isReturnMode && (
                            <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 space-y-3">
                                <div className="flex justify-between items-end">
                                    <span className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">Total Pagado</span>
                                    <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 leading-none">
                                        ${Number(pedido.total).toLocaleString('es-CO')}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* CAJA DE COMENTARIOS */}
                        {puedeRecibir && (
                            <div className="space-y-3 pt-2 animate-in slide-in-from-bottom-2 fade-in duration-500">
                                <Label htmlFor="feedback" className={`text-sm font-bold ${isReturnMode ? "text-red-600" : "text-slate-800"}`}>
                                    {isReturnMode ? "Motivo de la Devolución (Obligatorio)" : "Confirmación de Entrega (Opcional)"}
                                </Label>
                                <Textarea
                                    id="feedback"
                                    placeholder={isReturnMode ? "Ej: Llegó roto, me faltó una pieza..." : "¿Llegó todo bien? Déjanos un comentario..."}
                                    className={`resize-none min-h-[80px] bg-white dark:bg-slate-950 ${isReturnMode ? "focus-visible:ring-red-500 border-red-200" : "focus-visible:ring-emerald-500"}`}
                                    value={comentario}
                                    onChange={(e) => setComentario(e.target.value)}
                                />
                                <p className="text-xs text-slate-400">
                                    {isReturnMode
                                        ? "Revisaremos tu caso y te contactaremos pronto."
                                        : "Al confirmar, el pedido pasará a estado 'Entregado'."}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* FOOTER CON DOBLE LÓGICA DE BOTONES */}
                <DialogFooter className="p-6 pt-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 gap-3 sm:gap-0 shrink-0 z-20">

                    {puedeRecibir ? (
                        <>
                            {/* MODO NORMAL: Ver Botones "Problema" y "Recibir" */}
                            {!isReturnMode ? (
                                <div className="flex w-full gap-3 sm:justify-between">
                                    <Button
                                        variant="ghost"
                                        onClick={() => setIsReturnMode(true)}
                                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                                    >
                                        <AlertTriangle className="w-4 h-4 mr-2" /> Reportar Problema
                                    </Button>

                                    <Button
                                        onClick={handleConfirmarEntrega}
                                        disabled={loading}
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white flex-1 sm:flex-none"
                                    >
                                        {loading ? "Procesando..." : <><PackageCheck className="w-4 h-4 mr-2" /> Recibir Todo OK</>}
                                    </Button>
                                </div>
                            ) : (
                                /* MODO DEVOLUCIÓN: Ver "Cancelar" y "Confirmar Devolución" */
                                <div className="flex w-full gap-3 justify-end">
                                    <Button
                                        variant="outline"
                                        onClick={() => { setIsReturnMode(false); setSelectedProducts([]); setComentario(""); }}
                                        className="border-slate-300"
                                    >
                                        <Undo2 className="w-4 h-4 mr-2" /> Cancelar
                                    </Button>

                                    <Button
                                        onClick={handleEnviarDevolucion}
                                        disabled={loading}
                                        className="bg-red-600 hover:bg-red-700 text-white"
                                    >
                                        {loading ? "Enviando..." : "Confirmar Devolución"}
                                    </Button>
                                </div>
                            )}
                        </>
                    ) : (
                        // BOTÓN SOLO CERRAR (Si no se puede recibir)
                        <div className="w-full flex justify-between items-center">
                            <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                                Estado: {pedido.estado}
                            </span>
                            <Button variant="outline" onClick={() => setIsOpen(false)}>Cerrar</Button>
                        </div>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};