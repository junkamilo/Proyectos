import { NavLink } from "react-router-dom";
import { Navar } from "../navar/Navar";
import { useSearch } from "../../context/SearchContext";

export const Header = () => {
    const { setQuery } = useSearch();
    return (
        <header className="sticky top-0 z-50 flex flex-col bg-white shadow-lg transition-all duration-300 font-sans">

            {/* --- PARTE SUPERIOR: Logo, Buscador, Acciones --- */}
            <div className="w-full border-b border-gray-100">
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">

                    {/* 1. Logo Rappi */}
                    <a href="#" aria-label="Inicio" className="flex items-center gap-1 transition-transform hover:scale-105 shrink-0">
                        <span className="text-3xl font-black text-[#ff4d38] tracking-tighter">Rappi</span>
                        <span className="text-2xl text-[#ff4d38]">⚡</span>
                    </a>

                    {/* 2. Ubicación (Visible en Desktop, icono en Mobile) */}
                    <div className="hidden sm:flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-xl cursor-pointer transition-colors shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#ff4d38]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        <div className="flex flex-col leading-tight">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Ubicación</span>
                            <span className="text-sm font-bold text-gray-800 truncate max-w-[120px]">Bucaramanga</span>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>

                    {/* 3. Buscador Central (Estilo Rappi) */}
                    <div className="hidden md:flex flex-grow max-w-2xl mx-4">
                        <div className="relative w-full group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-focus-within:text-[#ff4d38] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </div>
                            <input
                                type="text"
                                onChange={(e) => setQuery(e.target.value)}
                                className="block w-full pl-11 pr-4 py-3 bg-gray-100 border-none rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff4d38]/20 focus:bg-white transition-all shadow-sm"
                                placeholder="Buscar en Rappi..."
                            />
                        </div>
                    </div>

                    {/* 4. Botones Derecha */}
                    <div className="flex items-center gap-3 shrink-0">
                        <NavLink
                            to="/ejemploPrueba"
                            className={({ isActive }) =>
                                `px-5 py-3 rounded-2xl font-bold shadow-lg flex items-center gap-2 transition-all ${isActive
                                    ? "bg-[#533c39] text-white scale-105 shadow-orange-600/40"   // ACTIVO
                                    : "bg-[#ff4d38] text-white hover:bg-[#e04330] hover:scale-105"}`
                            }
                        >
                            <span className="hidden sm:inline">Ejemplo Prueba</span>
                            <span className="sm:hidden">0</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </NavLink>
                    </div>

                </div>
            </div>

            {/* --- PARTE INFERIOR: Navar (Categorías / Reglas) --- */}
            <div className="bg-white/95 backdrop-blur">
                <Navar />
            </div>
        </header>
    );
};
