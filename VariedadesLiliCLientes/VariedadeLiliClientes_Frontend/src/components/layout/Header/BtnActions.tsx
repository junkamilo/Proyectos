
import { User, LogIn, UserPlus } from 'lucide-react'; // Iconos sugeridos
import { useHeader } from '@/components/hooks/useHeader';
import { Link } from 'react-router';


export const BtnActions = () => {
    // 1. Extraemos isAuthenticated y closeMenu (para cerrar el menú al dar click)
    const { logout, isAuthenticated, closeMenu } = useHeader();

    return (
        <div className="mt-auto mb-8 pt-8 border-t border-slate-200 dark:border-slate-800 space-y-3">

            {/* 2. LÓGICA CONDICIONAL */}
            {isAuthenticated ? (
                // --- CASO A: USUARIO LOGUEADO (Mostrar Logout) ---
                <button
                    onClick={() => {
                        logout();
                        closeMenu(); // Cerramos el menú tras salir
                    }}
                    className="flex items-center justify-center gap-3 w-full p-4 rounded-xl bg-rose-100 text-rose-700 font-bold shadow-sm active:scale-95 transition-transform hover:bg-rose-200"
                >
                    <User className="w-5 h-5" />
                    Cerrar Sesión
                </button>
            ) : (
                // --- CASO B: USUARIO NUEVO (Mostrar Registro / Login) ---
                <>
                    <Link
                        to="/login"
                        onClick={closeMenu}
                        className="flex items-center justify-center gap-3 w-full p-3 rounded-xl bg-slate-100 text-slate-700 font-bold active:scale-95 transition-transform hover:bg-slate-200"
                    >
                        <LogIn className="w-5 h-5" />
                        Iniciar Sesión
                    </Link>

                    <Link
                        to="/registro"
                        onClick={closeMenu}
                        className="flex items-center justify-center gap-3 w-full p-3 rounded-xl bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-200 active:scale-95 transition-transform hover:bg-emerald-700"
                    >
                        <UserPlus className="w-5 h-5" />
                        Registrarme
                    </Link>
                </>
            )}
        </div>
    )
}
//Cerrar Sesión
//Iniciar Sesión
