import { useState, useMemo } from 'react'
import { Search, Filter, Grid3x3, List, ChevronDown, PiggyBank, Coins, Sparkles, Star, Heart, Palette, Crown } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getProductosAlcancia } from '../action/get-alcancia'

// --- MOCK DATA PARA ALCANCÍAS ---
// Reutilizamos la interfaz dada, pero reinterpretamos los campos:
// difficulty -> Tamaño/Capacidad del ahorro
// light -> Estilo/Temática
// Interface ajustada a la respuesta de la API
interface AlcanciaData {
    id: number
    name: string
    price: number
    image: string
    rating: number | string
    category: string
    type: string
    difficulty: string
    light: string
    inStock: number
    isNew?: boolean
}

// Componente de Tarjeta (Estilo Juguetón/Burbuja)
const AlcanciaCard = ({ product, viewMode }: { product: AlcanciaData; viewMode: "grid" | "list" }) => (
    <div className={`group relative bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border-2 border-transparent hover:border-pink-300 dark:hover:border-indigo-500 transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(236,72,153,0.3)] ${viewMode === 'list' ? 'flex gap-6 p-4' : 'flex flex-col'}`}>

        {/* Etiqueta Flotante (Best Seller / Nuevo) */}
        {product.isNew && (
            <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Nuevo
            </div>
        )}

        {/* Imagen con fondo degradado suave */}
        <div className={`relative overflow-hidden bg-gradient-to-b from-rose-50 to-white dark:from-slate-700 dark:to-slate-800 ${viewMode === 'list' ? 'w-48 h-48 rounded-2xl' : 'aspect-square'}`}>
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 ease-out"
                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800" }}
            />
            {/* Efecto de brillo al hover */}
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Info del Producto */}
        <div className={`flex flex-col flex-1 ${viewMode === 'list' ? 'justify-center py-2' : 'p-6'}`}>
            <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Palette className="w-3 h-3" /> {product.type}
                </span>
                <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-3 h-3 fill-yellow-400" />
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{product.rating}</span>
                </div>
            </div>

            <h3 className="font-bold text-xl text-slate-800 dark:text-white mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                {product.name}
            </h3>

            {viewMode === 'list' && (
                <p className="text-slate-500 text-sm mb-4">
                    Alcancía estilo {product.light.toLowerCase()} de tamaño {product.difficulty === 'Fácil' ? 'pequeño' : product.difficulty === 'Medio' ? 'mediano' : 'jumbo'}. Perfecta para {product.difficulty === 'Fácil' ? 'iniciar el hábito' : 'grandes metas'}.
                </p>
            )}

            <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                <div>
                    <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                        ${product.price.toLocaleString()}
                    </span>
                </div>
                <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-3 rounded-full hover:bg-pink-600 dark:hover:bg-pink-400 hover:scale-110 transition-all shadow-lg shadow-slate-900/20">
                    <PiggyBank className="w-5 h-5" />
                </button>
            </div>
        </div>
    </div>
)

export default function AlcanciaCatalog() {
    // Estados
    const [searchTerm, setSearchTerm] = useState("")
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [sortBy, setSortBy] = useState("popular")
    const [filterDifficulty, setFilterDifficulty] = useState<string>("todo") // Interpretado como Tamaño
    const [filterLight, setFilterLight] = useState<string>("todo") // Interpretado como Estilo
    const [priceRange, setPriceRange] = useState([0, 120000]) // Rango ajustado
    const [showFilters, setShowFilters] = useState(true)

    // 1. USO DE REACT QUERY
    const { data: alcancias = [], isLoading, isError } = useQuery({
        queryKey: ['productos-alcancias'],
        queryFn: getProductosAlcancia,
        staleTime: 1000 * 60 * 10,
    });

    // 2. Lógica de Filtrado (Con data real)
    const filteredProducts = useMemo(() => {
        if (isLoading) return [];

        let result = alcancias.filter((item) => {
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
            // case "newest": result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break
            default: break
        }
        return result
    }, [alcancias, searchTerm, filterDifficulty, filterLight, priceRange, sortBy, isLoading])

    // 3. Estados de Carga y Error
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-rose-50/30">
                <div className="flex flex-col items-center animate-bounce">
                    <span className="text-6xl mb-4">🐷</span>
                    <span className="text-pink-600 font-bold tracking-wide">Contando moneditas...</span>
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-rose-50/30 text-slate-600">
                <PiggyBank className="w-16 h-16 mb-4 text-pink-400" />
                <h2 className="text-2xl font-bold">¡Oops! Se rompió la alcancía</h2>
                <p>No pudimos cargar los productos en este momento.</p>
            </div>
        )
    }

    return (
        // --- FONDO SUEÑOS & TESOROS ---
        <section className="min-h-screen bg-rose-50/50 dark:bg-slate-900 transition-colors duration-500 font-sans selection:bg-pink-200">

            {/* Header */}
            <div className="relative overflow-hidden pt-12 pb-16 px-4 md:px-8">
                <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-pink-300/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-[-10%] w-[400px] h-[400px] bg-purple-300/20 rounded-full blur-3xl" />
                <div className="absolute top-20 left-20 text-yellow-400 opacity-20 animate-pulse"><Star size={48} /></div>
                <div className="absolute bottom-20 right-40 text-pink-400 opacity-20"><Heart size={32} /></div>

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-sm mb-6 animate-bounce">
                        <span className="text-xl">🐷</span>
                        <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                            ¡Empieza a ahorrar hoy!
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Tus Sueños, <br className="md:hidden" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Tu Tesoro</span>
                    </h1>

                    <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Alcancías con diseños únicos para decorar tu espacio y cumplir tus metas. Desde cerditos clásicos hasta diseños modernos y personalizados.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20">

                {/* --- BARRA DE CONTROL --- */}
                <div className="sticky top-6 z-40 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 shadow-xl shadow-pink-900/5 rounded-2xl p-4 mb-10">
                    <div className="flex flex-col lg:flex-row gap-4">

                        {/* Buscador */}
                        <div className="flex-1 relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-pink-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="¿Qué diseño buscas? (ej: Unicornio, Retro)..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-slate-100 dark:bg-slate-700/50 border-transparent focus:bg-white dark:focus:bg-slate-700 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none transition-all"
                            />
                        </div>

                        {/* Botones de acción */}
                        <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all ${showFilters
                                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/30'
                                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-slate-600'
                                    }`}
                            >
                                <Filter className="w-4 h-4" />
                                <span className="whitespace-nowrap">Filtros</span>
                            </button>

                            <div className="relative min-w-[180px]">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full h-full appearance-none px-4 bg-slate-100 dark:bg-slate-700/50 rounded-xl text-slate-700 dark:text-slate-300 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-400"
                                >
                                    <option value="popular">❤️ Más Queridas</option>
                                    <option value="newest">✨ Novedades</option>
                                    <option value="price-low">📉 Precio Bajo</option>
                                    <option value="price-high">📈 Precio Alto</option>
                                </select>
                            </div>

                            <div className="flex bg-slate-100 dark:bg-slate-700/50 rounded-xl p-1">
                                <button onClick={() => setViewMode("grid")} className={`p-3 rounded-lg transition-all ${viewMode === "grid" ? "bg-white dark:bg-slate-600 text-pink-500 shadow-sm" : "text-slate-400"}`}>
                                    <Grid3x3 className="w-5 h-5" />
                                </button>
                                <button onClick={() => setViewMode("list")} className={`p-3 rounded-lg transition-all ${viewMode === "list" ? "bg-white dark:bg-slate-600 text-pink-500 shadow-sm" : "text-slate-400"}`}>
                                    <List className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

                    {/* SIDEBAR FILTERS */}
                    <aside className={`lg:col-span-1 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 sticky top-32">

                            {/* Filtro: Tamaño (Difficulty) */}
                            <div className="mb-8">
                                <h4 className="font-black text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                                    <Coins className="w-5 h-5 text-yellow-500" /> Capacidad de Ahorro
                                </h4>
                                <div className="space-y-3">
                                    {[
                                        { val: "todo", label: "Todos los tamaños" },
                                        { val: "Fácil", label: "Pequeña (Inicio)" },
                                        { val: "Medio", label: "Mediana (Meta)" },
                                        { val: "Difícil", label: "Jumbo (Gran Sueño)" }
                                    ].map((opt) => (
                                        <label key={opt.val} className="flex items-center gap-3 cursor-pointer group">
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${filterDifficulty === opt.val
                                                    ? 'border-pink-500 bg-pink-500 text-white'
                                                    : 'border-slate-300 bg-white dark:bg-slate-700 group-hover:border-pink-300'
                                                }`}>
                                                {filterDifficulty === opt.val && <div className="w-2 h-2 bg-white rounded-full" />}
                                            </div>
                                            <input type="radio" name="difficulty" value={opt.val} checked={filterDifficulty === opt.val} onChange={(e) => setFilterDifficulty(e.target.value)} className="hidden" />
                                            <span className={`text-sm font-medium ${filterDifficulty === opt.val ? 'text-pink-600 dark:text-pink-400' : 'text-slate-600 dark:text-slate-400'}`}>
                                                {opt.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Filtro: Estilo (Light) */}
                            <div className="mb-8">
                                <h4 className="font-black text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                                    <Crown className="w-5 h-5 text-purple-500" /> Estilo & Tema
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        { val: "todo", label: "Todos" },
                                        { val: "Minimalista", label: "Minimalista" },
                                        { val: "Personajes", label: "Personajes" },
                                        { val: "Pintada a Mano", label: "Pintada a Mano" },
                                        { val: "Retro", label: "Retro/Vintage" }
                                    ].map((opt) => (
                                        <button
                                            key={opt.val}
                                            onClick={() => setFilterLight(opt.val)}
                                            className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${filterLight === opt.val
                                                    ? "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/50 dark:text-purple-300 dark:border-purple-700"
                                                    : "bg-white text-slate-500 border-slate-200 hover:border-purple-300 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-400"
                                                }`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price */}
                            <div>
                                <h4 className="font-black text-slate-800 dark:text-white mb-4">Presupuesto</h4>
                                <div className="px-2">
                                    <input
                                        type="range" min="0" max="120000" step="5000"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
                                    />
                                    <div className="flex justify-between mt-2 text-sm font-bold text-slate-600 dark:text-slate-400">
                                        <span>$0</span>
                                        <span className="text-pink-600 dark:text-pink-400">${priceRange[1].toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => { setFilterDifficulty("todo"); setFilterLight("todo"); setPriceRange([0, 120000]); setSearchTerm(""); }}
                                className="w-full mt-8 py-3 rounded-xl bg-slate-50 dark:bg-slate-700 text-slate-500 hover:text-pink-500 font-bold text-sm transition-colors border border-transparent hover:border-pink-200"
                            >
                                ↺ Limpiar todo
                            </button>
                        </div>
                    </aside>

                    {/* PRODUCT GRID */}
                    <div className="lg:col-span-3">
                        {filteredProducts.length > 0 ? (
                            <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
                                {filteredProducts.map((item) => (
                                    <AlcanciaCard key={item.id} product={item} viewMode={viewMode} />
                                ))}
                            </div>
                        ) : (
                            // Empty State
                            <div className="flex flex-col items-center justify-center py-20 bg-white/50 dark:bg-slate-800/50 rounded-3xl border-4 border-dotted border-slate-200 dark:border-slate-700">
                                <div className="text-6xl mb-4 grayscale opacity-50">🐷</div>
                                <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2">¡Oops!</h3>
                                <p className="text-slate-500 mb-6 text-center max-w-md">
                                    No encontramos alcancías con esas características. ¿Intentamos con otro estilo?
                                </p>
                                <button
                                    onClick={() => { setFilterDifficulty("todo"); setFilterLight("todo"); setPriceRange([0, 120000]); setSearchTerm(""); }}
                                    className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-pink-500/30 transition-all transform hover:-translate-y-1"
                                >
                                    Ver todas las alcancías
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}