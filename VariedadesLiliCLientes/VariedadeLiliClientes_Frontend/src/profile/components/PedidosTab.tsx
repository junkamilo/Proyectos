import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Package, Truck, CheckCircle, AlertCircle, Calendar, Loader2 } from "lucide-react"


import type { Pedido } from "../types/pedidos"
import { getHistorialPedidos } from "../action/pedidos.service"
import { OrderDetailsModal } from "./OrderDetailsModal"


// --- Helper para estilos de estado ---
const getEstadoStyles = (estado: string) => {
    const estadoLower = estado?.toLowerCase() || "";
    switch (estadoLower) {
        case 'entregado':
        case 'recibido':
            return { color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", icon: CheckCircle, label: "Entregado" };
        case 'enviado':
            return { color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", icon: Truck, label: "Enviado" };
        case 'pendiente':
        case 'pagado':
        case 'activo':
            return { color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", icon: Package, label: "Preparando" };
        case 'cancelado':
            return { color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", icon: AlertCircle, label: "Cancelado" };
        default:
            return { color: "bg-slate-100 text-slate-700", icon: Package, label: estado };
    }
};

// --- Helper para URLs de imágenes ---
const fixImgUrl = (path?: string) => {
    if (!path) return "https://via.placeholder.com/150";
    if (path.startsWith("http")) return path;
    return `http://localhost:3000${path}`; // Ajusta al puerto de tu backend
};

// --- COMPONENTE PRINCIPAL ---
interface PedidosTabProps {
    userId: number | string; // ID del usuario para buscar su historial
}

export const PedidosTab = ({ userId }: PedidosTabProps) => {

    // Estado local
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Cargar datos al montar
    useEffect(() => {
        const fetchData = async () => {
            console.log("🔍 [PedidosTab] ID recibido:", userId);
            if (!userId) return;

            try {
                setLoading(true);
                const data = await getHistorialPedidos(userId);
                console.log("✅ [PedidosTab] Datos recibidos API:", data);
                setPedidos(data);
            } catch (err: any) {
                console.error("Error cargando pedidos:", err);
                setError("No pudimos cargar tu historial en este momento.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    // --- RENDER: CARGANDO ---
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 space-y-4 text-slate-400">
                <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
                <p>Cargando tu historial de compras...</p>
            </div>
        );
    }

    // --- RENDER: ERROR ---
    if (error) {
        return (
            <div className="p-6 text-center rounded-xl bg-red-50 text-red-600 border border-red-100">
                <p>{error}</p>
                <Button variant="outline" className="mt-4 border-red-200 hover:bg-red-100" onClick={() => window.location.reload()}>
                    Intentar de nuevo
                </Button>
            </div>
        );
    }

    // --- RENDER: VACÍO ---
    if (pedidos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
                <Package className="w-16 h-16 mb-4 text-slate-300" />
                <h3 className="text-xl font-semibold text-slate-900">Aún no tienes pedidos</h3>
                <p className="text-slate-500 max-w-sm mt-2 mb-6">Parece que no has realizado ninguna compra todavía. ¡Explora nuestro catálogo!</p>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    Ir a la Tienda
                </Button>
            </div>
        );
    }

    // --- RENDER: LISTA DE PEDIDOS ---
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Mis Pedidos</h2>
                <p className="text-sm text-muted-foreground">{pedidos.length} pedidos realizados</p>
            </div>

            <div className="grid gap-4">
                {pedidos.map((pedido) => {
                    // Datos calculados
                    const statusInfo = getEstadoStyles(pedido.estado);
                    const StatusIcon = statusInfo.icon;

                    // Asumiendo que tu backend devuelve los productos dentro de una propiedad 'productos' o 'detalles'
                    // Si tu interfaz Pedido no tiene esto, debes agregarlo al types/pedidos.d.ts
                    const items = (pedido as any).productos || [];

                    const fechaFormat = new Date(pedido.fecha_pedido).toLocaleDateString('es-CO', {
                        day: 'numeric', month: 'short', year: 'numeric'
                    });

                    return (
                        <Card key={pedido.id_pedido} className="overflow-hidden border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow duration-200 group">

                            {/* Header de la Tarjeta */}
                            <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 p-4 flex flex-row items-center justify-between border-b border-slate-100 dark:border-slate-800">
                                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                                    <span className="font-mono text-sm font-bold text-slate-700 dark:text-slate-200">
                                        #ORD-{pedido.id_pedido}
                                    </span>
                                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {fechaFormat}
                                    </div>
                                </div>
                                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                                    <StatusIcon className="w-3.5 h-3.5" />
                                    <span className="capitalize">{statusInfo.label}</span>
                                </div>
                            </CardHeader>

                            {/* Contenido */}
                            <CardContent className="p-4 md:p-6">
                                <div className="flex flex-col md:flex-row justify-between gap-6">

                                    {/* Lista de Imágenes (Items) */}
                                    <div className="flex-1">
                                        <div className="flex -space-x-2 overflow-hidden py-2">
                                            {items.length > 0 ? (
                                                items.map((item: any, index: number) => (
                                                    <div key={index} className="inline-block h-12 w-12 rounded-full ring-2 ring-white dark:ring-slate-950 bg-slate-100 overflow-hidden relative">
                                                        <img
                                                            src={fixImgUrl(item.url_foto_producto || item.img)}
                                                            alt={item.nombre_producto || item.nombre}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                ))
                                            ) : (
                                                <span className="text-sm text-slate-400 italic">Sin detalles de productos</span>
                                            )}
                                        </div>

                                        {/* Texto resumen de productos */}
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                                            {items.length > 0
                                                ? `${items[0].nombre_producto || items[0].nombre}`
                                                : "Detalles no disponibles"}
                                            {items.length > 1 && <span className="text-xs text-slate-500"> y {items.length - 1} más...</span>}
                                        </p>
                                    </div>

                                    {/* Precio Total */}
                                    <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center min-w-[100px]">
                                        <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Total</span>
                                        <span className="text-lg font-bold text-slate-900 dark:text-white">
                                            ${Number(pedido.total).toLocaleString('es-CO')}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>

                            {/* Footer / Botón */}
                            <CardFooter className="p-2 bg-slate-50 dark:bg-slate-900/30 border-t border-slate-100 dark:border-slate-800">
                                <OrderDetailsModal pedido={pedido} />
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};