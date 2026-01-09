import { useEffect, useState } from "react"
import { Shield } from "lucide-react"

// Importaciones de Shadcn UI
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

// Importaciones de tus componentes propios
import { FondoDecorativo } from "./FondoDecorativo"
import { HeaderMovil } from "./HeaderMovil"
import { UserSidebar } from "./UserSidebar"
import { HeaderDesktop } from "./HeaderDesktop"
import { PestañasLista } from "./PestañasLista"
import { GeneralTab } from "./GeneralTab"
import { PedidosTab } from "./PedidosTab"
import { getStoredUserId } from "../utils/auth-storage"


// --- SUB-COMPONENTE LOCAL: Notificaciones ---
const NotificationsTab = () => (
    <Card className="border-none shadow-sm bg-white dark:bg-slate-900 rounded-3xl">
        <CardHeader>
            <CardTitle>Preferencias de Contacto</CardTitle>
            <CardDescription>Personaliza cómo nos comunicamos contigo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {[
                { title: "Estado de Pedidos", desc: "Alertas sobre envíos y entregas", default: true },
                { title: "Nuevas Colecciones", desc: "Avisos sobre plantas de temporada", default: true },
                { title: "Tips de Cuidado", desc: "Guías semanales para tus plantas", default: false },
            ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className="space-y-0.5">
                        <p className="font-medium text-slate-900 dark:text-white">{item.title}</p>
                        <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                    <Switch defaultChecked={item.default} className="data-[state=checked]:bg-emerald-600" />
                </div>
            ))}
        </CardContent>
    </Card>
)

// --- COMPONENTE PRINCIPAL ---

export default function ProfilePage() {

    // 1. ESTADO PARA EL ID DEL USUARIO
    const [userId, setUserId] = useState<string | number | null>(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    // 2. EFECTO PARA LEER EL LOCALSTORAGE AL MONTAR
    useEffect(() => {
        // Usamos tu función getStoredUserId
        const storedId = getStoredUserId();
        
        if (storedId) {
            setUserId(Number(storedId)); // Convertimos a número si tu backend espera número
        } else {
            console.warn("⚠️ No se encontró usuario en sesión. Redirigiendo...");
            // Opcional: window.location.href = '/login'; 
        }
        setIsAuthLoading(false);
    }, []);

    // Data básica para los contadores (Estos también podrías cargarlos dinámicamente luego)
    const userStats = {
        ordersCount: 3,
        wishlistCount: 12,
        notificationsCount: 5
    };

    // Si aún está cargando la sesión, mostramos un spinner o nada
    if (isAuthLoading) {
        return <div className="min-h-screen flex items-center justify-center">Cargando perfil...</div>;
    }

    return (
        <div>
            {/* --- FONDO DECORATIVO --- */}
            <FondoDecorativo />

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
                {/* Header Móvil */}
                <HeaderMovil />

                <div className="grid gap-8 lg:grid-cols-[350px_1fr]">
                    {/* COLUMNA IZQUIERDA */}
                    <UserSidebar />

                    {/* COLUMNA DERECHA (CONTENIDO) */}
                    <div className="space-y-6">
                        {/* Header Desktop */}
                        <HeaderDesktop />

                        <Tabs defaultValue="general" className="w-full">
                            {/* Lista de Pestañas con Scroll Horizontal */}
                            <PestañasLista stats={userStats} />

                            <div className="mt-6">
                                {/* Pestaña General */}
                                <TabsContent value="general" className="animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
                                    <GeneralTab />
                                </TabsContent>

                                {/* ✅ PESTAÑA PEDIDOS CON ID DINÁMICO */}
                                <TabsContent value="orders" className="animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
                                    {userId ? (
                                        <PedidosTab userId={userId} />
                                    ) : (
                                        <div className="p-8 text-center text-slate-500 border border-dashed rounded-xl">
                                            Debes iniciar sesión para ver tus pedidos.
                                        </div>
                                    )}
                                </TabsContent>

                                {/* Pestaña Seguridad */}
                                <TabsContent value="security" className="animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
                                    <Card className="border-none shadow-sm bg-white dark:bg-slate-900 rounded-3xl p-8 text-center text-slate-500">
                                        <Shield className="w-12 h-12 mx-auto mb-4 text-emerald-200" />
                                        <p>Configuración de seguridad (Componente placeholder)</p>
                                    </Card>
                                </TabsContent>

                                {/* Pestaña Notificaciones */}
                                <TabsContent value="notifications" className="animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
                                    <NotificationsTab />
                                </TabsContent>
                            </div>
                        </Tabs>
                    </div>
                </div>
            </main>
        </div>
    )
}