import { Search, Filter, Grid3x3, List } from "lucide-react"

// 1. Definimos qué necesita este componente para funcionar
interface BarraControlProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    sortBy: string;
    setSortBy: (value: string) => void;
    showFilters: boolean;
    setShowFilters: (value: boolean) => void;
    // El viewMode es visual, pero debe compartirse con la lista, así que también lo recibimos
    viewMode: "grid" | "list";
    setViewMode: (mode: "grid" | "list") => void;
    placeholder?: string;
}

// 2. Recibimos las props (ya no usamos useState aquí para los datos)
export const BarraControl = ({
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    showFilters,
    setShowFilters,
    viewMode,
    setViewMode,
    placeholder = "Buscar producto..."
}: BarraControlProps) => {

    return (
        <div className="flex flex-col lg:flex-row gap-4 mb-8 sticky top-20 z-30 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-md py-4 -mx-4 px-4 lg:mx-0 lg:px-0 lg:static lg:bg-transparent">
            {/* Search */}
            <div className="flex-1 relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                <input
                    type="text"
                    placeholder={placeholder}
                    // 3. Usamos los valores que vienen del padre
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
                
                {/**botones de grid y lista */}
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
