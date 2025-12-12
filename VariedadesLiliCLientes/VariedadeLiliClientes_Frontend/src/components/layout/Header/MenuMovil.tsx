import { Leaf, Search, User } from "lucide-react"
import { Link } from "react-router";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    categories: string[];
    normalizePath: (text: string) => string;
    isAuthenticated: boolean;
    logout: () => void;
}

export const MenuMovil = ({ isOpen, onClose, categories, normalizePath, isAuthenticated, logout }: Props) => {
    return (
        <div
            className={`
                md:hidden 
                fixed inset-0 
                z-30 
                bg-white/95 dark:bg-slate-950/95 
                backdrop-blur-xl 
                transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) 
                ${isOpen ? 'translate-x-0' : 'translate-x-full'} 
                pt-24 px-6 flex flex-col
            `}
        >
            <div className="relative mb-8">
                <input
                    type="text"
                    placeholder="¿Qué estás buscando?"
                    className="w-full h-12 pl-11 pr-4 rounded-xl bg-slate-100 dark:bg-slate-900 border-none focus:ring-2 focus:ring-emerald-500 text-base"
                />
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            </div>

            <nav className="flex flex-col gap-2">
                {categories.map((category, index) => {
                    const path = normalizePath(category);
                    return (
                        <Link
                            key={category}
                            to={`/${path}`}
                            onClick={onClose}
                            style={{ transitionDelay: `${index * 50}ms` }}
                            className={`
                                text-xl font-bold text-slate-800 dark:text-white 
                                border-b border-slate-100 dark:border-slate-800 py-4 
                                flex justify-between items-center group
                                ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'} 
                                transition-all duration-500
                            `}
                        >
                            {category}
                            <span className="text-emerald-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                                <Leaf className="w-5 h-5 fill-emerald-100" />
                            </span>
                        </Link>
                    )
                })}
            </nav>

            <div className="mt-auto mb-8 pt-8 border-t border-slate-200 dark:border-slate-800">
                {isAuthenticated ? (
                    <button onClick={logout} className="flex items-center justify-center gap-3 w-full p-4 rounded-xl bg-rose-100 text-rose-700 font-bold shadow-sm active:scale-95 transition-transform">
                        <User className="w-5 h-5" />
                        Cerrar Sesión
                    </button>
                ) : (
                    <Link to="/auth/login" onClick={onClose}>
                        <button className="flex items-center justify-center gap-3 w-full p-4 rounded-xl bg-gradient-to-r from-emerald-600 to-green-700 text-white font-bold shadow-lg shadow-emerald-500/20 active:scale-95 transition-transform">
                            <User className="w-5 h-5" />
                            Iniciar Sesión
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
};
