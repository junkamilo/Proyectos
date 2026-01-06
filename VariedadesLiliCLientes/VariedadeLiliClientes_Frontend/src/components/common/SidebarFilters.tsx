import { Scaling, Box, DollarSign, RotateCcw } from "lucide-react"

interface SidebarFiltersProps {
    showFilters: boolean;

    // Filtro Tamaño (Reemplaza Dificultad)
    filterTamano: string;
    setFilterTamano: (value: string) => void;

    // Filtro Material (Reemplaza Luz)
    filterMaterial: string;
    setFilterMaterial: (value: string) => void;

    // Precio
    priceRange: number[];
    setPriceRange: (value: number[]) => void;

    // Reset
    onReset: () => void;
}

export const SidebarFilters = ({
    showFilters,
    filterTamano,
    setFilterTamano,
    filterMaterial,
    setFilterMaterial,
    priceRange,
    setPriceRange,
    onReset
}: SidebarFiltersProps) => {

    return (
        <aside className={`lg:col-span-1 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-emerald-100 dark:border-slate-800 shadow-sm sticky top-36">

                {/* --- 1. FILTRO: TAMAÑO --- */}
                {/* Mapeado a ENUM: 'pequeño', 'mediano', 'grande' */}
                <div className="mb-8">
                    <h4 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                        <Scaling className="w-4 h-4 text-emerald-500" /> Tamaño
                    </h4>
                    <div className="space-y-2.5">
                        {["todo", "pequeño", "mediano", "grande"].map((size) => (
                            <label key={size} className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${filterTamano === size
                                    ? 'bg-emerald-500 border-emerald-500'
                                    : 'border-slate-300 dark:border-slate-700 bg-transparent group-hover:border-emerald-400'}`}>
                                    {filterTamano === size && <div className="w-2 h-2 bg-white rounded-full" />}
                                </div>
                                <input
                                    type="radio"
                                    name="tamano"
                                    value={size}
                                    checked={filterTamano === size}
                                    onChange={(e) => setFilterTamano(e.target.value)}
                                    className="hidden"
                                />
                                <span className="text-sm text-slate-600 dark:text-slate-400 capitalize">
                                    {size === "todo" ? "Todos los tamaños" : size}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* --- 2. FILTRO: MATERIAL --- */}
                {/* Mapeado a ENUM: 'cerámica', 'plástico', 'madera', etc. */}
                <div className="mb-8">
                    <h4 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                        <Box className="w-4 h-4 text-amber-500" /> Material
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {["todo", "cerámica", "plástico", "madera", "metal", "tierra", "natural"].map((mat) => (
                            <button
                                key={mat}
                                onClick={() => setFilterMaterial(mat)}
                                className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all capitalize ${filterMaterial === mat
                                    ? "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800"
                                    : "bg-slate-50 text-slate-600 border-slate-200 hover:border-amber-300 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400"}`}
                            >
                                {mat === "todo" ? "Todos" : mat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- 3. FILTRO: PRECIO --- */}
                <div>
                    <div className="flex justify-between mb-2">
                        <h4 className="font-bold text-slate-800 dark:text-white text-sm flex gap-2 items-center">
                            <DollarSign className="w-4 h-4 text-emerald-600" /> Precio Máximo
                        </h4>
                        <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                            ${priceRange[1].toLocaleString()}
                        </span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="200000"
                        step="5000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                        className="w-full h-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                </div>

                {/* --- BOTÓN DE RESET --- */}
                <button
                    onClick={onReset}
                    className="w-full mt-6 flex items-center justify-center gap-2 text-xs text-slate-400 hover:text-emerald-600 transition-colors border-t border-slate-100 dark:border-slate-800 pt-4"
                >
                    <RotateCcw className="w-3 h-3" />
                    Restaurar filtros
                </button>
            </div>
        </aside>
    )
}