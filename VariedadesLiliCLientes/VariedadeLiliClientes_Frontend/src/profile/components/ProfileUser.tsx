import { useEffect, useState } from "react"

import { Tabs, TabsContent } from "@/components/ui/tabs"

// Importaciones de tus componentes propios
import { FondoDecorativo } from "./FondoDecorativo"
import { HeaderMovil } from "./HeaderMovil"
import { UserSidebar } from "./UserSidebar"
import { HeaderDesktop } from "./HeaderDesktop"
import { PestañasLista } from "./PestañasLista"
import { GeneralTab } from "./GeneralTab"
import { PedidosTab } from "./PedidosTab"
import { getStoredUserId } from "../utils/auth-storage"
import { FavoritesProduct } from "./FavoriteProductTab"




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

                                <TabsContent value="wishlist" className="animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
                                    {userId ? (
                                        <FavoritesProduct userId={userId} />
                                    ) : (
                                        <div className="p-8 text-center text-slate-500 border border-dashed rounded-xl">
                                            Inicia sesión para ver tu lista de deseos.
                                        </div>
                                    )}
                                </TabsContent>
                            </div>
                        </Tabs>
                    </div>
                </div>
            </main>
        </div>
    )
}