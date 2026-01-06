import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Package, Truck, CheckCircle, AlertCircle, ChevronRight, Calendar } from "lucide-react"

// --- Tipos de Datos ---
interface Producto {
    id: number;
    nombre: string;
    imagen: string;
    cantidad: number;
}

interface Pedido {
    id: string;
    fecha: string;
    estado: 'pendiente' | 'enviado' | 'entregado' | 'cancelado';
    total: number;
    items: Producto[];
}

// --- Mock Data (Datos de prueba) ---
const pedidosMock: Pedido[] = [
    {
        id: "ORD-2023-001",
        fecha: "12 Oct 2023",
        estado: "entregado",
        total: 125.50,
        items: [
            { id: 1, nombre: "Camiseta Básica", imagen: "https://via.placeholder.com/50", cantidad: 2 },
            { id: 2, nombre: "Pantalón Chino", imagen: "https://via.placeholder.com/50", cantidad: 1 },
        ]
    },
    {
        id: "ORD-2023-002",
        fecha: "15 Oct 2023",
        estado: "enviado",
        total: 89.99,
        items: [
            { id: 3, nombre: "Zapatillas Urban", imagen: "https://via.placeholder.com/50", cantidad: 1 },
        ]
    },
    {
        id: "ORD-2023-003",
        fecha: "18 Oct 2023",
        estado: "pendiente",
        total: 45.00,
        items: [
            { id: 4, nombre: "Gorra Snapback", imagen: "https://via.placeholder.com/50", cantidad: 1 },
        ]
    }
];

// --- Helper para estilos de estado ---
const getEstadoStyles = (estado: string) => {
    switch (estado) {
        case 'entregado':
            return { color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", icon: CheckCircle, label: "Entregado" };
        case 'enviado':
            return { color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", icon: Truck, label: "Enviado" };
        case 'pendiente':
            return { color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", icon: Package, label: "Preparando" };
        case 'cancelado':
            return { color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", icon: AlertCircle, label: "Cancelado" };
        default:
            return { color: "bg-slate-100 text-slate-700", icon: Package, label: estado };
    }
};

export const PedidosTab = () => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Mis Pedidos</h2>
                <p className="text-sm text-muted-foreground">{pedidosMock.length} pedidos realizados</p>
            </div>

            <div className="grid gap-4">
                {pedidosMock.map((pedido) => {
                    const statusInfo = getEstadoStyles(pedido.estado);
                    const StatusIcon = statusInfo.icon;

                    return (
                        <Card key={pedido.id} className="overflow-hidden border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow duration-200">
                            <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 p-4 flex flex-row items-center justify-between border-b border-slate-100 dark:border-slate-800">
                                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                                    <span className="font-mono text-sm font-bold text-slate-700 dark:text-slate-200">
                                        #{pedido.id}
                                    </span>
                                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {pedido.fecha}
                                    </div>
                                </div>
                                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                                    <StatusIcon className="w-3.5 h-3.5" />
                                    <span className="capitalize">{statusInfo.label}</span>
                                </div>
                            </CardHeader>

                            <CardContent className="p-4 md:p-6">
                                <div className="flex flex-col md:flex-row justify-between gap-6">
                                    {/* Lista de items (Resumida) */}
                                    <div className="flex-1">
                                        <div className="flex -space-x-2 overflow-hidden py-2">
                                            {pedido.items.map((item) => (
                                                <div key={item.id} className="inline-block h-12 w-12 rounded-full ring-2 ring-white dark:ring-slate-950 bg-slate-100 overflow-hidden relative">
                                                     {/* Reemplazar src con item.imagen */}
                                                    <img 
                                                        src={`https://api.dicebear.com/7.x/shapes/svg?seed=${item.id}`} 
                                                        alt={item.nombre} 
                                                        className="h-full w-full object-cover" 
                                                    />
                                                </div>
                                            ))}
                                            {pedido.items.length > 3 && (
                                                 <div className="flex h-12 w-12 items-center justify-center rounded-full ring-2 ring-white dark:ring-slate-950 bg-slate-100 text-xs font-medium text-slate-500">
                                                    +{pedido.items.length - 3}
                                                 </div>
                                            )}
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                                            {pedido.items[0].nombre} 
                                            {pedido.items.length > 1 && <span className="text-xs"> y {pedido.items.length - 1} más...</span>}
                                        </p>
                                    </div>

                                    {/* Precio Total */}
                                    <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center min-w-[100px]">
                                        <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Total</span>
                                        <span className="text-lg font-bold text-slate-900 dark:text-white">
                                            ${pedido.total.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="p-2 bg-slate-50 dark:bg-slate-900/30 border-t border-slate-100 dark:border-slate-800">
                                <Button variant="ghost" className="w-full justify-between hover:bg-white dark:hover:bg-slate-800 text-slate-600 group">
                                    <span className="text-xs font-medium">Ver detalles del pedido</span>
                                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};