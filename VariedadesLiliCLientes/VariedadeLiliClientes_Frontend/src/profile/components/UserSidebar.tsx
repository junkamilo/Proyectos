import { Button } from "@/components/ui/button";
import { useUserProfile } from "../hooks/useUserProfile";
import { ProfileCard } from "./ProfileCard";

export const UserSidebar = () => {
    // 1. Usamos nuestro Custom Hook (La Lógica)
    const { user, isLoading, isError, hasNoSession, logout } = useUserProfile();

    // 2. Manejo de Estados de UI
    if (isLoading) {
        return (
            <aside className="sticky top-24 space-y-6 animate-pulse">
                <div className="h-[400px] bg-slate-200 dark:bg-slate-800 rounded-[2rem] w-full shadow-lg"></div>
            </aside>
        );
    }

    if (isError || hasNoSession || !user) {
        return (
            <aside className="sticky top-24 p-6 text-center border border-dashed border-slate-300 rounded-3xl">
                <p className="text-slate-500 mb-4">
                    {hasNoSession ? "Sesión no encontrada" : "Error cargando perfil"}
                </p>
                <Button variant="outline" onClick={() => window.location.href = '/login'}>
                    Iniciar Sesión
                </Button>
            </aside>
        );
    }

    // 3. Renderizamos el Componente Puro
    return <ProfileCard user={user} onLogout={logout} />;
};