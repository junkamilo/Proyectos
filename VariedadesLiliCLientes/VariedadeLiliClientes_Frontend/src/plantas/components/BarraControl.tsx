import { Search, Filter, ChevronDown, Grid3x3, List } from "lucide-react"
import { useState } from "react"

export const BarraControl = () => {

    const [showFilters, setShowFilters] = useState(true);
    const [sortBy, setSortBy] = useState("popular");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="flex flex-col lg:flex-row gap-4 mb-8 sticky top-20 z-30 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-md py-4 -mx-4 px-4 lg:mx-0 lg:px-0 lg:static lg:bg-transparent">
            {/* Search */}
            <div className="flex-1 relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                <input
                    type="text"
                    placeholder="Buscar planta (ej: Monstera, Ficus)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-emerald-100 dark:border-emerald-900/50 rounded-xl bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-sm"
                />
            </div>

            {/* Botones de Control */}
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl font-medium transition-all whitespace-nowrap ${showFilters
                        ? 'bg-emerald-800 text-white border-emerald-800 dark:bg-emerald-700'
                        : 'bg-white text-slate-600 border-emerald-100 hover:border-emerald-300 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'}`}
                >
                    <Filter className="w-4 h-4" />
                    {showFilters ? 'Ocultar Filtros' : 'Filtros'}
                </button>

                <div className="relative min-w-[180px]">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full appearance-none px-4 py-2.5 bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-300 font-medium focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                        <option value="popular">🔥 Más Populares</option>
                        <option value="newest">🌱 Recién Llegadas</option>
                        <option value="price-low">💰 Precio: Bajo a Alto</option>
                        <option value="price-high">💎 Precio: Alto a Bajo</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>

                <div className="flex bg-white dark:bg-slate-900 rounded-xl border border-emerald-100 dark:border-slate-800 p-1">
                    <button onClick={() => setViewMode("grid")} className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600" : "text-slate-400 hover:text-slate-600"}`}>
                        <Grid3x3 className="w-5 h-5" />
                    </button>
                    <button onClick={() => setViewMode("list")} className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600" : "text-slate-400 hover:text-slate-600"}`}>
                        <List className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}
