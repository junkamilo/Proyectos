import { useState } from "react"
import {
    Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { PackageCheck, ChevronRight, AlertTriangle, Undo2, CheckSquare, Square, XCircle } from "lucide-react"
import type { Pedido } from "@/profile/types/pedidos"
import { useOrderDetails } from "@/profile/hooks/useOrderDetails"

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
    
    // Usamos el Custom Hook
    const {
        comentario, setComentario,
        loading,
        isReturnMode, setIsReturnMode,
        selectedProducts,
        puedeRecibir, puedeCancelar,
        toggleProductSelection,
        handleConfirmarEntrega,
        handleEnviarDevolucion,
        handleCancelarPedido,
        resetState
    } = useOrderDetails(pedido, () => setIsOpen(false));

    const items = pedido.productos || [];

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) resetState();
        }}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="w-full justify-between hover:bg-white dark:hover:bg-slate-800 text-slate-600 group">
                    <span className="text-xs font-medium">Ver detalles del pedido</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl max-h-[85vh] flex flex-col p-0 bg-white dark:bg-slate-900 gap-0 overflow-hidden border-slate-200 dark:border-slate-800">
                
                {/* HEADER */}
                <DialogHeader className="p-6 pb-4 border-b border-slate-100 dark:border-slate-800 shrink-0 bg-white dark:bg-slate-900 z-20">
                    <DialogTitle className="flex items-center gap-3 text-xl">
                        <span className={`${isReturnMode ? "text-red-600" : "text-emerald-600"} font-mono tracking-tight`}>
                            {isReturnMode ? "Solicitar Devolución" : `#ORD-${pedido.id_pedido}`}
                        </span>
                        {!isReturnMode && (
                            <>
                                <span className="h-4 w-px bg-slate-200 dark:bg-slate-700"></span>
                                <span className="text-slate-600 dark:text-slate-300 text-base font-medium">Detalles de Compra</span>
                            </>
                        )}
                    </DialogTitle>
                    <DialogDescription>
                        {isReturnMode ? "Selecciona los productos con problemas." : "Revisa los artículos incluidos."}
                    </DialogDescription>
                </DialogHeader>

                {/* BODY */}
                <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
                    <div className="space-y-8 pb-4">
                        {/* LISTA DE PRODUCTOS */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center sticky top-[-24px] bg-white dark:bg-slate-900 z-10 py-2 border-b border-transparent">
                                <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2 uppercase tracking-wider">
                                    <PackageCheck className="w-4 h-4 text-emerald-500" /> Productos ({items.length})
                                </h4>
                                {isReturnMode && <span className="text-xs font-bold text-red-500 animate-pulse">Seleccionados: {selectedProducts.length}</span>}
                            </div>

                            <div className="grid gap-3">
                                {items.map((item: any, idx: number) => {
                                    const isSelected = selectedProducts.some(p => p.nombre_producto === item.nombre_producto);
                                    return (
                                        <div key={idx} onClick={() => isReturnMode && toggleProductSelection(item)} 
                                            className={`flex items-center gap-4 p-3 rounded-xl border transition-all ${isReturnMode ? "cursor-pointer hover:border-red-300" : "border-slate-100 bg-slate-50/80"} ${isSelected ? "bg-red-50 border-red-500" : ""}`}>
                                            
                                            {isReturnMode && (
                                                <div className={`shrink-0 text-slate-400 ${isSelected ? "text-red-500" : ""}`}>
                                                    {isSelected ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                                                </div>
                                            )}
                                            
                                            <div className="h-16 w-16 rounded-lg bg-white overflow-hidden border border-slate-200 shrink-0 shadow-sm">
                                                <img src={fixImgUrl(item.url_foto_producto)} alt={item.nombre_producto} className="h-full w-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0 grid gap-1">
                                                <p className={`font-semibold truncate ${isSelected ? "text-red-700" : "text-slate-900"}`}>{item.nombre_producto}</p>
                                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                                    <span className="bg-white px-1.5 py-0.5 rounded border">x{item.cantidad}</span>
                                                    <span>a ${Number(item.precio_unitario).toLocaleString('es-CO')}</span>
                                                </div>
                                            </div>
                                            <div className="text-right font-bold text-slate-700 text-sm whitespace-nowrap">
                                                ${(item.cantidad * item.precio_unitario).toLocaleString('es-CO')}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* RESUMEN DE PAGO */}
                        {!isReturnMode && (
                            <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500 font-medium">Estado</span>
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white border capitalize text-slate-700">{pedido.estado}</span>
                                </div>
                                <div className="flex justify-between items-end pt-2 border-t">
                                    <span className="text-sm font-bold text-slate-900 uppercase">Total</span>
                                    <span className="text-2xl font-extrabold text-emerald-600">${Number(pedido.total).toLocaleString('es-CO')}</span>
                                </div>
                            </div>
                        )}

                        {/* CAJA DE COMENTARIOS */}
                        {puedeRecibir && (
                            <div className="space-y-3 pt-2 animate-in slide-in-from-bottom-2 fade-in duration-500">
                                <Label htmlFor="feedback" className={`text-sm font-bold ${isReturnMode ? "text-red-600" : "text-slate-800"}`}>
                                    {isReturnMode ? "Motivo (Obligatorio)" : "Comentarios (Opcional)"}
                                </Label>
                                <Textarea id="feedback" 
                                    placeholder={isReturnMode ? "Ej: Llegó roto..." : "¿Todo bien?"} 
                                    className={`resize-none min-h-[80px] bg-white ${isReturnMode ? "focus-visible:ring-red-500 border-red-200" : "focus-visible:ring-emerald-500"}`}
                                    value={comentario} onChange={(e) => setComentario(e.target.value)} />
                            </div>
                        )}
                    </div>
                </div>

                {/* FOOTER */}
                <DialogFooter className="p-6 pt-4 border-t border-slate-100 bg-slate-50/50 gap-3 sm:gap-0 shrink-0 z-20">
                    {puedeRecibir ? (
                        <>
                            {!isReturnMode ? (
                                <div className="flex w-full gap-3 sm:justify-between flex-col-reverse sm:flex-row">
                                    <Button variant="ghost" onClick={() => setIsReturnMode(true)} className="text-red-500 hover:text-red-600 hover:bg-red-50 w-full sm:w-auto">
                                        <AlertTriangle className="w-4 h-4 mr-2" /> Reportar Problema
                                    </Button>
                                    <Button onClick={handleConfirmarEntrega} disabled={loading} className="bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto shadow-lg">
                                        {loading ? "Procesando..." : <><PackageCheck className="w-4 h-4 mr-2" /> Recibir Todo OK</>}
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex w-full gap-3 justify-end">
                                    <Button variant="outline" onClick={resetState}> <Undo2 className="w-4 h-4 mr-2" /> Cancelar </Button>
                                    <Button onClick={handleEnviarDevolucion} disabled={loading} className="bg-red-600 hover:bg-red-700 text-white">
                                        {loading ? "Enviando..." : "Confirmar Devolución"}
                                    </Button>
                                </div>
                            )}
                        </>
                    ) : puedeCancelar ? (
                        <div className="flex w-full justify-between items-center">
                            <Button variant="ghost" onClick={handleCancelarPedido} disabled={loading} className="text-red-500 hover:bg-red-50">
                                {loading ? "Cancelando..." : <><XCircle className="w-4 h-4 mr-2" /> Cancelar Pedido</>}
                            </Button>
                            <Button variant="outline" onClick={() => setIsOpen(false)}>Cerrar</Button>
                        </div>
                    ) : (
                        <div className="w-full flex justify-end">
                            <Button variant="outline" onClick={() => setIsOpen(false)}>Cerrar</Button>
                        </div>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};