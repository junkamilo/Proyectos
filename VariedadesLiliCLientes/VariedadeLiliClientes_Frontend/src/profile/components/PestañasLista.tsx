import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Package, Shield, Bell, Heart } from "lucide-react"

// Definimos la interfaz de las props que recibirá el componente
interface PestañasListaProps {
    stats?: {
        ordersCount?: number;
        notificationsCount?: number;
        wishlistCount?: number;
    };
}

export const PestañasLista = ({ stats = {} }: PestañasListaProps) => {

    // Configuración de las pestañas
    const tabsConfig = [
        {
            val: "general",
            icon: User,
            label: "Perfil",
            count: 0
        },
        {
            val: "orders",
            icon: Package,
            label: "Pedidos",
            count: stats.ordersCount || 0 // Valor real inyectado
        },
        {
            val: "wishlist", // Corregido de "Deceos"
            icon: Heart,     // Cambiado a Heart que es más semántico para deseos
            label: "Lista de Deseos",
            count: stats.wishlistCount || 0
        }
    ];

    return (
        <div className="sticky top-0 z-30 w-full bg-stone-50/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-transparent transition-all duration-200 data-[stuck=true]:border-slate-200">
            <div className="mx-auto max-w-full md:px-0 py-4">
                <TabsList className="w-full justify-start md:justify-center bg-transparent p-1 h-auto overflow-x-auto flex-nowrap scrollbar-hide gap-2">
                    {tabsConfig.map((tab) => (
                        <TabsTrigger
                            key={tab.val}
                            value={tab.val}
                            className="
                                group relative px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ease-out
                                
                                /* ESTADO INACTIVO */
                                text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100
                                hover:bg-white/50 dark:hover:bg-slate-800/50
                                
                                /* ESTADO ACTIVO */
                                data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800
                                data-[state=active]:text-emerald-700 dark:data-[state=active]:text-emerald-400
                                data-[state=active]:shadow-sm data-[state=active]:shadow-emerald-900/5
                                data-[state=active]:ring-1 data-[state=active]:ring-slate-200 dark:data-[state=active]:ring-slate-700
                                
                                /* INTERACCIÓN */
                                active:scale-95
                            "
                        >
                            <div className="flex items-center gap-2.5 relative z-10">
                                {/* Icono */}
                                <tab.icon className="w-4 h-4 transition-transform duration-300 group-data-[state=active]:scale-110 group-data-[state=active]:fill-emerald-100/50" />

                                <span>{tab.label}</span>

                                {/* BADGE / CONTADOR (Solo se muestra si es mayor a 0) */}
                                {tab.count > 0 && (
                                    <span className="
                                        ml-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1.5 text-[10px] font-bold
                                        bg-slate-200 text-slate-700 
                                        group-data-[state=active]:bg-emerald-100 group-data-[state=active]:text-emerald-700
                                        dark:bg-slate-700 dark:text-slate-300
                                        dark:group-data-[state=active]:bg-emerald-900/30 dark:group-data-[state=active]:text-emerald-400
                                    ">
                                        {tab.count > 99 ? '99+' : tab.count}
                                    </span>
                                )}
                            </div>
                        </TabsTrigger>
                    ))}
                </TabsList>
            </div>
        </div>
    )
}