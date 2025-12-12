import { useState, useMemo } from "react"
import { Search, Filter, Grid3x3, List, ChevronDown, Box, ShieldCheck, Sun } from "lucide-react"
import { getProductosMateros } from "../actions/get-materos"
import { useQuery } from "@tanstack/react-query"

// --- INTERFACES & MOCK DATA ---
interface Materos {
    id: number
    name: string
    price: number
    image: string
    rating: string | number // Ajustado para aceptar string del toFixed
    category: string
    type: string
    difficulty: string
    light: string
    inStock: number
    isNew?: boolean
}

// Componente de Tarjeta (Inline para este archivo)
const MateroCard = ({ product, viewMode }: { product: Materos; viewMode: "grid" | "list" }) => (
    <div className={`group relative bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-orange-900/10 transition-all duration-300 ${viewMode === 'list' ? 'flex gap-6 p-4' : 'flex flex-col'}`}>

        {/* Badge de Nuevo */}
        {product.isNew && (
            <span className="absolute top-4 left-4 z-10 bg-orange-600 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest rounded-full shadow-lg">
                Nueva Colección
            </span>
        )}

        {/* Imagen con efecto arcilla */}
        <div className={`relative overflow-hidden bg-stone-100 dark:bg-stone-800 ${viewMode === 'list' ? 'w-48 h-48 rounded-2xl' : 'aspect-square'}`}>
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out mix-blend-multiply dark:mix-blend-normal"
                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=800" }} // Fallback
            />
            <div className="absolute inset-0 bg-orange-900/0 group-hover:bg-orange-900/10 transition-colors duration-300" />
        </div>

        {/* Info */}
        <div className={`flex flex-col flex-1 ${viewMode === 'list' ? 'justify-center py-2' : 'p-6'}`}>
            <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">{product.type}</span>
                <div className="flex items-center gap-1 text-amber-500">
                    <span className="text-xs font-bold">{product.rating}</span>
                    <span className="text-[10px]">★</span>
                </div>
            </div>

            <h3 className="font-serif text-xl font-bold text-stone-800 dark:text-stone-100 mb-2 group-hover:text-orange-700 transition-colors">
                {product.name}
            </h3>

            {viewMode === 'list' && (
                <p className="text-stone-500 text-sm mb-4 line-clamp-2">
                    Diseño artesanal perfecto para {product.light.toLowerCase()}. Acabado premium de alta durabilidad.
                </p>
            )}

            <div className="mt-auto flex items-center justify-between pt-4 border-t border-stone-100 dark:border-stone-800">
                <div className="flex flex-col">
                    <span className="text-xs text-stone-400">Precio</span>
                    <span className="text-lg font-bold text-stone-900 dark:text-orange-100">
                        ${product.price.toLocaleString()}
                    </span>
                </div>
                <button className="bg-stone-900 dark:bg-orange-700 text-white p-3 rounded-xl hover:bg-orange-700 dark:hover:bg-orange-600 transition-colors shadow-lg shadow-stone-900/20">
                    <Box className="w-5 h-5" />
                </button>
            </div>
        </div>
    </div>
)

export default function MaterosCatalog() {
    // Estados
    const [searchTerm, setSearchTerm] = useState("")
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [sortBy, setSortBy] = useState("popular")
    const [filterDifficulty, setFilterDifficulty] = useState<string>("todo")
    const [filterLight, setFilterLight] = useState<string>("todo")
    const [priceRange, setPriceRange] = useState([0, 200000]) // Rango ajustado
    const [showFilters, setShowFilters] = useState(true)

    // 3. USO DE REACT QUERY
    const { data: materos = [], isLoading, isError } = useQuery({
        queryKey: ['productos-materos'],
        queryFn: getProductosMateros,
        staleTime: 1000 * 60 * 10, // 10 minutos
    });

    // 4. Lógica de Filtrado usando la data real ('materos')
    const filteredMateros = useMemo(() => {
        if (isLoading) return [];

        let result = materos.filter((item) => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.type.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesDifficulty = filterDifficulty === "todo" || item.difficulty === filterDifficulty
            const matchesLight = filterLight === "todo" || item.light === filterLight
            const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1]
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
    }, [materos, searchTerm, filterDifficulty, filterLight, priceRange, sortBy, isLoading])

    // 5. Renderizado Condicional de Carga y Error
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-100">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-600"></div>
                <span className="ml-4 text-orange-800 font-serif font-bold">Horneando catálogo...</span>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-stone-100 text-stone-600">
                <Box className="w-16 h-16 mb-4 text-orange-500" />
                <h2 className="text-2xl font-serif font-bold">Algo salió mal</h2>
                <p>No pudimos cargar la colección de materos.</p>
            </div>
        )
    }

    return (
        // --- FONDO TIPO TALLER ---
        <section className="min-h-screen bg-stone-100 dark:bg-stone-950/90 transition-colors duration-500 font-sans">

            {/* Header de la Sección */}
            <div className="relative bg-orange-50 dark:bg-orange-900/10 border-b border-orange-100 dark:border-orange-900/20 pt-16 pb-20 px-4 md:px-8 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 dark:opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-multiply" />
                <div className="absolute top-10 right-10 w-64 h-64 bg-orange-300/30 rounded-full blur-[80px]" />
                <div className="absolute bottom-0 left-20 w-80 h-80 bg-stone-400/20 rounded-full blur-[60px]" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="p-2.5 bg-orange-700 text-white rounded-xl shadow-lg shadow-orange-700/20 rotate-3">
                                    <Box className="w-6 h-6" />
                                </span>
                                <span className="text-sm font-bold uppercase tracking-[0.2em] text-orange-800 dark:text-orange-400">
                                    Colección Artesanal
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-serif font-black text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
                                Materos & <span className="text-orange-700 dark:text-orange-500 underline decoration-4 decoration-orange-300/50">Macetas</span>
                            </h1>
                            <p className="mt-6 text-stone-600 dark:text-stone-300 max-w-lg text-lg leading-relaxed">
                                Piezas únicas de cerámica, barro y concreto. Diseñadas para resaltar la belleza natural de tus plantas.
                            </p>
                        </div>

                        {/* Stats Minimalistas */}
                        <div className="flex items-center gap-8 bg-white/50 dark:bg-stone-900/50 backdrop-blur-sm p-4 rounded-2xl border border-orange-100 dark:border-stone-800">
                            <div className="text-right">
                                <p className="text-3xl font-serif font-bold text-stone-800 dark:text-white">{materos.length}</p>
                                <p className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">Piezas</p>
                            </div>
                            <div className="w-px h-10 bg-stone-300 dark:bg-stone-700" />
                            <div className="text-right">
                                <p className="text-3xl font-serif font-bold text-stone-800 dark:text-white">100%</p>
                                <p className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">Hecho a mano</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-8 relative z-20">

                {/* --- BARRA DE CONTROL --- */}
                <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-xl shadow-stone-200/50 dark:shadow-none border border-stone-100 dark:border-stone-800 p-4 mb-12 flex flex-col lg:flex-row gap-4 items-center">

                    {/* Buscador */}
                    <div className="flex-1 w-full relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 group-focus-within:text-orange-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="Buscar por material (ej: Cerámica, Barro)..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-stone-50 dark:bg-stone-800 border-none rounded-xl text-stone-700 dark:text-stone-200 placeholder-stone-400 focus:ring-2 focus:ring-orange-500/50 transition-all"
                        />
                    </div>

                    {/* Acciones */}
                    <div className="flex w-full lg:w-auto gap-3">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${showFilters
                                    ? 'bg-stone-800 text-white dark:bg-orange-700'
                                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300'
                                }`}
                        >
                            <Filter className="w-4 h-4" />
                            <span>Filtros</span>
                        </button>

                        <div className="relative flex-1 lg:flex-none min-w-[180px]">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full h-full appearance-none pl-4 pr-10 py-3 bg-stone-50 dark:bg-stone-800 rounded-xl text-stone-700 dark:text-stone-300 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                            >
                                <option value="popular">Más Vendidos</option>
                                <option value="newest">Nuevas Colecciones</option>
                                <option value="price-low">Precio: Menor a Mayor</option>
                                <option value="price-high">Precio: Mayor a Menor</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                        </div>

                        <div className="flex bg-stone-100 dark:bg-stone-800 p-1 rounded-xl">
                            <button onClick={() => setViewMode("grid")} className={`p-2.5 rounded-lg transition-all ${viewMode === "grid" ? "bg-white dark:bg-stone-700 text-orange-600 shadow-sm" : "text-stone-400"}`}>
                                <Grid3x3 className="w-5 h-5" />
                            </button>
                            <button onClick={() => setViewMode("list")} className={`p-2.5 rounded-lg transition-all ${viewMode === "list" ? "bg-white dark:bg-stone-700 text-orange-600 shadow-sm" : "text-stone-400"}`}>
                                <List className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

                    {/* SIDEBAR FILTERS */}
                    <aside className={`lg:col-span-1 space-y-8 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                        <div className="sticky top-24 pr-4">

                            {/* Filtro: Tipo de Uso */}
                            <div className="mb-8 border-b border-stone-200 dark:border-stone-800 pb-8">
                                <h4 className="font-serif font-bold text-stone-800 dark:text-stone-100 mb-4 flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-orange-600" /> Resistencia
                                </h4>
                                <div className="space-y-3">
                                    {["todo", "Fácil", "Medio", "Difícil"].map((level) => (
                                        <label key={level} className="flex items-center gap-3 cursor-pointer group hover:bg-white dark:hover:bg-stone-800 p-2 rounded-lg transition-colors -ml-2">
                                            <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors border ${filterDifficulty === level
                                                    ? 'bg-orange-600 border-orange-600 text-white'
                                                    : 'border-stone-300 bg-stone-50'
                                                }`}>
                                                {filterDifficulty === level && <div className="w-2 h-2 bg-white rounded-full" />}
                                            </div>
                                            <input type="radio" name="difficulty" value={level} checked={filterDifficulty === level} onChange={(e) => setFilterDifficulty(e.target.value)} className="hidden" />
                                            <span className="text-sm text-stone-600 dark:text-stone-400 group-hover:text-orange-700 dark:group-hover:text-orange-400 transition-colors">
                                                {level === "todo" ? "Cualquier material" :
                                                    level === "Fácil" ? "Alta (Golpes/Clima)" :
                                                        level === "Medio" ? "Media (Cerámica)" : "Delicado (Interior)"}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Filtro: Ubicación */}
                            <div className="mb-8 border-b border-stone-200 dark:border-stone-800 pb-8">
                                <h4 className="font-serif font-bold text-stone-800 dark:text-stone-100 mb-4 flex items-center gap-2">
                                    <Sun className="w-4 h-4 text-orange-600" /> Ubicación Ideal
                                </h4>
                                <div className="grid grid-cols-2 gap-2">
                                    {["todo", "Sombra", "Sombra parcial", "Luz indirecta", "Luz directa"].map((light) => (
                                        <button
                                            key={light}
                                            onClick={() => setFilterLight(light)}
                                            className={`px-3 py-2 text-xs font-bold uppercase tracking-wider rounded border transition-all ${filterLight === light
                                                    ? "bg-stone-800 text-white border-stone-800 dark:bg-orange-600 dark:border-orange-600"
                                                    : "bg-transparent text-stone-500 border-stone-200 hover:border-orange-300 hover:text-orange-600"
                                                }`}
                                        >
                                            {light === "todo" ? "Todas" :
                                                light === "Luz directa" ? "Exterior" :
                                                    light === "Sombra" ? "Interior" : "Mixto"}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Filtro: Precio */}
                            <div>
                                <h4 className="font-serif font-bold text-stone-800 dark:text-stone-100 mb-4">Presupuesto</h4>
                                <div className="bg-white dark:bg-stone-800 p-4 rounded-xl border border-stone-200 dark:border-stone-700">
                                    <input
                                        type="range" min="0" max="200000" step="5000"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                        className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-orange-600 mb-4"
                                    />
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-stone-400">Máximo</span>
                                        <span className="text-lg font-bold text-stone-800 dark:text-white font-mono">
                                            ${priceRange[1].toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => { setFilterDifficulty("todo"); setFilterLight("todo"); setPriceRange([0, 200000]); setSearchTerm(""); }}
                                className="w-full mt-6 py-3 text-sm font-bold text-stone-500 hover:text-orange-600 underline decoration-dashed underline-offset-4 transition-colors"
                            >
                                Limpiar todos los filtros
                            </button>
                        </div>
                    </aside>

                    {/* GRID DE PRODUCTOS */}
                    <div className="lg:col-span-3 pb-20">
                        {filteredMateros.length > 0 ? (
                            <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8" : "space-y-6"}>
                                {filteredMateros.map((matero) => (
                                    <MateroCard key={matero.id} product={matero} viewMode={viewMode} />
                                ))}
                            </div>
                        ) : (
                            // Empty State
                            <div className="flex flex-col items-center justify-center py-24 bg-white/50 dark:bg-stone-900/50 rounded-3xl border-2 border-dashed border-stone-300 dark:border-stone-700 text-center">
                                <div className="w-20 h-20 bg-stone-200 dark:bg-stone-800 rounded-full flex items-center justify-center mb-6 text-stone-400">
                                    <Box className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-stone-700 dark:text-stone-200 mb-2">
                                    Estante vacío
                                </h3>
                                <p className="text-stone-500 max-w-sm mx-auto mb-8">
                                    No encontramos materos con esas características específicas de material o precio.
                                </p>
                                <button
                                    onClick={() => { setFilterDifficulty("todo"); setFilterLight("todo"); setPriceRange([0, 200000]); setSearchTerm(""); }}
                                    className="px-8 py-3 bg-orange-700 text-white rounded-xl font-bold hover:bg-orange-800 transition-colors shadow-lg shadow-orange-700/20"
                                >
                                    Ver catálogo completo
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}