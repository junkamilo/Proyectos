import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query'; // Importamos TanStack Query
 // Tu nueva acción
import { Search, Filter, ChevronDown, Grid3x3, List, Sprout, Sun, Leaf, Trees } from 'lucide-react';

import { getProductosPlantas } from '../actions/get-plantas';
import { ProductCard } from '@/components/common/ProductCard';
 // Asegúrate de importar tu tarjeta

export default function PlantasCatalog() {
    const [searchTerm, setSearchTerm] = useState("")
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [sortBy, setSortBy] = useState("popular")
    const [filterDifficulty, setFilterDifficulty] = useState<string>("todo")
    const [filterLight, setFilterLight] = useState<string>("todo")
    const [priceRange, setPriceRange] = useState([0, 200000])
    const [showFilters, setShowFilters] = useState(true)

    // 1. REEMPLAZO DE MOCK DATA POR USEQUERY
    const { data: plants = [], isLoading, isError } = useQuery({
        queryKey: ['productos-plantas'], // Clave única para caché
        queryFn: getProductosPlantas,    // La función que creamos arriba
        staleTime: 1000 * 60 * 10,       // No volver a pedir en 10 minutos
    });

    // 2. Lógica de Filtrado (Igual que antes, pero usando 'plants' que viene de la API)
    const filteredAndSortedPlants = useMemo(() => {
        // Si está cargando, retornamos vacío para evitar errores
        if (isLoading) return [];

        let result = plants.filter((plant) => {
            const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) || plant.type.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesDifficulty = filterDifficulty === "todo" || plant.difficulty === filterDifficulty
            const matchesLight = filterLight === "todo" || plant.light === filterLight
            const matchesPrice = plant.price >= priceRange[0] && plant.price <= priceRange[1]
            return matchesSearch && matchesDifficulty && matchesLight && matchesPrice
        })

        switch (sortBy) {
            case "price-low": result.sort((a, b) => a.price - b.price); break
            case "price-high": result.sort((a, b) => b.price - a.price); break
            case "rating": result.sort((a, b) => parseFloat(String(b.rating)) - parseFloat(String(a.rating))); break
            case "newest": result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break
            default: break
        }
        return result
    }, [plants, searchTerm, filterDifficulty, filterLight, priceRange, sortBy, isLoading])

    // 3. Manejo de estados de carga y error
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-emerald-500"></div>
                <span className="ml-4 text-emerald-800 font-medium">Cargando vivero...</span>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-red-500">
                <Trees className="w-16 h-16 mb-4" />
                <h2 className="text-2xl font-bold">Error cargando las plantas</h2>
                <p>Por favor intenta recargar la página.</p>
            </div>
        )
    }

    return (
        <section className="min-h-screen bg-slate-50 dark:bg-green-950/20 transition-colors duration-500">

            {/* Header de la Sección (Estilo Invernadero) */}
            <div className="relative bg-emerald-50 dark:bg-emerald-900/20 border-b border-emerald-100 dark:border-emerald-900/30 pt-12 pb-16 px-4 md:px-8 overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl translate-x-1/3 -translate-y-1/2" />
                <div className="absolute bottom-0 left-10 w-72 h-72 bg-lime-200/40 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="p-2 bg-emerald-600 text-white rounded-lg shadow-lg shadow-emerald-600/30">
                                    <Leaf className="w-6 h-6" />
                                </span>
                                <span className="text-sm font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-300">
                                    Vivero Natural
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                Plantas de <span className="text-emerald-600 dark:text-emerald-400">Interior</span>
                            </h1>
                            <p className="mt-4 text-slate-600 dark:text-slate-300 max-w-xl text-lg">
                                Purifica tu aire y relaja tu mente. Seleccionamos las especies más resistentes y hermosas para tu hogar.
                            </p>
                        </div>

                        {/* Estadísticas rápidas dinámicas */}
                        <div className="flex gap-8 text-slate-500 dark:text-slate-400">
                            <div className="text-center group">
                                <p className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                                    {plants.length}
                                </p>
                                <p className="text-xs uppercase font-semibold">Disponibles</p>
                            </div>
                            <div className="w-px h-10 bg-emerald-200 dark:bg-emerald-800" />
                            <div className="text-center group">
                                <p className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">100%</p>
                                <p className="text-xs uppercase font-semibold">Orgánico</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">

                {/* --- BARRA DE CONTROL --- */}
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

                {/* --- CONTENIDO PRINCIPAL --- */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

                    {/* SIDEBAR FILTERS */}
                    <aside className={`lg:col-span-1 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-emerald-100 dark:border-slate-800 shadow-sm sticky top-36">

                            {/* Filtro: Dificultad */}
                            <div className="mb-8">
                                <h4 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                                    <Sprout className="w-4 h-4 text-emerald-500" /> Nivel de Cuidado
                                </h4>
                                <div className="space-y-2.5">
                                    {["todo", "Fácil", "Medio", "Difícil"].map((level) => (
                                        <label key={level} className="flex items-center gap-3 cursor-pointer group">
                                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${filterDifficulty === level
                                                ? 'bg-emerald-500 border-emerald-500'
                                                : 'border-slate-300 dark:border-slate-700 bg-transparent group-hover:border-emerald-400'}`}>
                                                {filterDifficulty === level && <div className="w-2 h-2 bg-white rounded-full" />}
                                            </div>
                                            <input type="radio" name="difficulty" value={level} checked={filterDifficulty === level} onChange={(e) => setFilterDifficulty(e.target.value)} className="hidden" />
                                            <span className={`text-sm ${filterDifficulty === level ? 'font-semibold text-emerald-700 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-400'}`}>
                                                {level === "todo" ? "Todos los niveles" : level}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Filtro: Luz */}
                            <div className="mb-8">
                                <h4 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                                    <Sun className="w-4 h-4 text-amber-500" /> Iluminación
                                </h4>
                                <div className="flex flex-col gap-2">
                                    {["todo", "Sombra", "Sombra parcial", "Luz indirecta", "Luz directa"].map((light) => (
                                        <button
                                            key={light}
                                            onClick={() => setFilterLight(light)}
                                            className={`px-3 py-2 text-xs font-medium rounded-lg border text-left transition-all flex items-center justify-between ${filterLight === light
                                                ? "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800"
                                                : "bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"}`}
                                        >
                                            {light === "todo" ? "Cualquier luz" : light}
                                            {filterLight === light && <div className="w-2 h-2 rounded-full bg-amber-500" />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Filtro: Precio */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <h4 className="font-bold text-slate-800 dark:text-white text-sm">Rango de Precio</h4>
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
                                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                    className="w-full h-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                                />
                            </div>
                        </div>
                    </aside>

                    {/* PRODUCT LIST */}
                    <div className="lg:col-span-3">
                        {filteredAndSortedPlants.length > 0 ? (
                            <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                                {filteredAndSortedPlants.map((plant) => (
                                    <div key={plant.id}>
                                        {/* Asegúrate que tu ProductCard acepte este objeto 'plant' */}
                                        <ProductCard product={plant} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            // Estado Vacío
                            <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-emerald-200 dark:border-emerald-900">
                                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-full mb-4">
                                    <Trees className="w-10 h-10 text-emerald-400" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">No encontramos plantas</h3>
                                <p className="text-slate-500 text-center max-w-xs mb-6">
                                    Parece que ninguna planta coincide con tus filtros de luz o dificultad.
                                </p>
                                <button
                                    onClick={() => { setFilterDifficulty("todo"); setFilterLight("todo"); setPriceRange([0, 200000]); setSearchTerm(""); }}
                                    className="px-6 py-2 bg-emerald-700 text-white rounded-lg font-bold hover:bg-emerald-800 transition-colors shadow-lg shadow-emerald-500/20"
                                >
                                    Ver todas las plantas
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}