import { User, X, Menu, Search, ShoppingCart, UserCheck } from "lucide-react"
import { Link } from "react-router"

interface Props {
    onToggleMenu: () => void;
    isMenuOpen: boolean;
    isAuthenticated: boolean;
}

export const IconActions = ({ onToggleMenu, isMenuOpen, isAuthenticated }: Props) => {
    return (
        <div className="flex items-center gap-3 sm:gap-4">

            {/* Buscador Icono (Solo Móvil) */}
            <button className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                <Search className="w-5 h-5" />
            </button>

            {/* Carrito */}
            <button className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition-colors group">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute top-1 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white group-hover:scale-110 transition-transform">
                    1
                </span>
            </button>

            {/* Usuario (Desktop) */}
            {isAuthenticated ? (
                <div className="bg-emerald-100 rounded-full p-2">
                    <UserCheck className="text-emerald-700" />
                </div>
            ) : (
                <Link to="/auth/register">
                    <User className="text-slate-600 hover:text-emerald-600" />
                </Link>
            )}

            {/* --- AQUÍ ESTÁ EL BOTÓN DE MENÚ (HAMBURGUESA) --- */}
            <button
                onClick={onToggleMenu}
                className="md:hidden relative z-50 p-2 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                aria-label="Menu"
            >
                {/* Cambia el icono si está abierto o cerrado */}
                {isMenuOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    <Menu className="w-6 h-6" />
                )}
            </button>

        </div>
    );
};
