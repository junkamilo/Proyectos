import { X, Menu, Search, ShoppingCart, UserCheck, LogOut, LogIn, UserPlus } from "lucide-react"
import { Link } from "react-router";
import ShoppingCartFeature from "../carShopping/ShoppingCartFeature";


interface Props {
    onToggleMenu: () => void;
    isMenuOpen: boolean;
    isAuthenticated: boolean;
    logout: () => void;
}

export const IconActions = ({ onToggleMenu, isMenuOpen, isAuthenticated, logout }: Props) => {
    return (
        <div className="flex items-center gap-3 sm:gap-4">

            {/* Buscador Móvil */}
            <button className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                <Search className="w-5 h-5" />
            </button>

            {/* Carrito */}
            {isAuthenticated ? (
                // CASO A: SI ESTÁ LOGUEADO -> Muestra el botón que abre el MODAL
                <ShoppingCartFeature />
            ) : (
                // CASO B: NO ESTÁ LOGUEADO -> Muestra link al login (tu comportamiento actual)
                <Link
                    to="/login"
                    className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition-colors group"
                >
                    <ShoppingCart className="w-6 h-6" />
                    {/* Badge decorativo para invitar a loguearse */}
                    <span className="absolute top-1 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white group-hover:scale-110 transition-transform">
                        0
                    </span>
                </Link>
            )}


            {/* --- ZONA DE USUARIO (DESKTOP) --- */}
            {isAuthenticated ? (
                // OPCIÓN A: USUARIO LOGUEADO
                <div className="hidden md:flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-700">
                    <div className="bg-emerald-100 dark:bg-emerald-900/30 rounded-full p-2" title="Sesión Iniciada">
                        <UserCheck className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                    </div>
                    <button
                        onClick={logout}
                        title="Cerrar Sesión"
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-full transition-all duration-300 transform hover:scale-105"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            ) : (
                // OPCIÓN B: USUARIO NO LOGUEADO (Botones explícitos)
                <div className="hidden md:flex items-center gap-2 pl-2">

                    {/* Botón Ingresar (Sutil) */}
                    <Link
                        to="/login"
                        className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-full transition-all"
                    >
                        <LogIn className="w-4 h-4" />
                        <span>Ingresar</span>
                    </Link>

                    {/* Botón Registrarse (Llamativo) */}
                    <Link
                        to="/register"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-full shadow-md shadow-emerald-200 active:scale-95 transition-all"
                    >
                        <UserPlus className="w-4 h-4" />
                        <span>Registrarme</span>
                    </Link>
                </div>
            )}

            {/* Botón Menú Hamburguesa (Móvil) */}
            <button
                onClick={onToggleMenu}
                className="md:hidden relative z-50 p-2 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                aria-label="Menu"
            >
                {isMenuOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    <Menu className="w-6 h-6" />
                )}
            </button>

        </div>
    );
};
