import { useState, useMemo } from 'react'
import { Search, Filter, Grid3x3, List, ChevronDown, Beaker, Sprout, FlaskConical, ShoppingBag } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getProductosAbono } from '../actions/get-abono'

// --- MOCK DATA ACTUALIZADA PARA ABONOS ---
interface Product {
    id: number
    name: string
    price: number
    image: string
    rating: number | string // Ajustado
    category: string
    type: string
    difficulty: string
    light: string
    inStock: number
    npk?: string
}

// Componente de Tarjeta (Estilo Empaque/Etiqueta)
const AbonoCard = ({ product, viewMode }: { product: Product; viewMode: "grid" | "list" }) => (
    <div className={`group relative bg-white dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-xl overflow-hidden hover:border-amber-400 transition-all duration-300 hover:shadow-xl hover:shadow-amber-900/10 ${viewMode === 'list' ? 'flex gap-6 p-4' : 'flex flex-col'}`}>

        {/* Badge NPK (Decorativo Químico) */}
        {product.npk && (
            <div className="absolute top-3 right-3 z-10 bg-amber-100 dark:bg-amber-900/80 border border-amber-200 dark:border-amber-700 text-amber-800 dark:text-amber-200 text-[10px] font-mono font-bold px-2 py-1 rounded md:opacity-0 group-hover:opacity-100 transition-opacity">
                NPK: {product.npk}
            </div>
        )}

        {/* Imagen con fondo "Nutritivo" */}
        <div className={`relative overflow-hidden bg-amber-50 dark:bg-amber-900/20 ${viewMode === 'list' ? 'w-40 h-40 rounded-lg' : 'aspect-[4/3]'}`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-200/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1622383563227-0440113583e6?auto=format&fit=crop&q=80&w=800" }}
            />
        </div>

        {/* Info */}
        <div className={`flex flex-col flex-1 ${viewMode === 'list' ? 'justify-center py-1' : 'p-5'}`}>
            <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${product.type === 'Líquido' ? 'bg-blue-100 text-blue-700' :
                    product.type === 'Sustrato' ? 'bg-stone-100 text-stone-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                    {product.type}
                </span>
                <div className="flex items-center text-amber-500 text-xs">
                    ★ {product.rating}
                </div>
            </div>

            <h3 className="font-bold text-lg text-amber-950 dark:text-amber-50 mb-1 leading-tight group-hover:text-amber-600 transition-colors">
                {product.name}
            </h3>

            {viewMode === 'list' && (
                <p className="text-amber-800/60 dark:text-amber-200/60 text-sm mb-3 line-clamp-2">
                    Fórmula especializada para {product.light.toLowerCase()}. Ideal para aplicar {product.difficulty.toLowerCase()}.
                </p>
            )}

            <div className="mt-auto pt-4 flex items-end justify-between border-t border-amber-100 dark:border-amber-900/50">
                <div>
                    <p className="text-xs text-amber-800/50 dark:text-amber-400">Precio unidad</p>
                    <p className="text-xl font-bold text-amber-900 dark:text-amber-100 font-mono">
                        ${product.price.toLocaleString()}
                    </p>
                </div>
                <button className="p-2.5 rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-100 hover:bg-amber-600 hover:text-white transition-colors">
                    <ShoppingBag className="w-5 h-5" />
                </button>
            </div>
        </div>
    </div>
)

export default function AbonoCatalog() {
    // Estados
    const [searchTerm, setSearchTerm] = useState("")
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [sortBy, setSortBy] = useState("popular")
    const [filterDifficulty, setFilterDifficulty] = useState<string>("todo")
    const [filterLight, setFilterLight] = useState<string>("todo")
    const [priceRange, setPriceRange] = useState([0, 200000]) // Rango ampliado
    const [showFilters, setShowFilters] = useState(true)

    // 1. USO DE REACT QUERY
    const { data: abonos = [], isLoading, isError } = useQuery({
        queryKey: ['productos-abonos'],
        queryFn: getProductosAbono,
        staleTime: 1000 * 60 * 10,
    });

    // 2. Lógica de Filtrado (Con data real)
    const filteredProducts = useMemo(() => {
        if (isLoading) return [];

        let result = abonos.filter((item) => {
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
            // case "newest": result.sort((a, b) => b.id - a.id); break // Si el ID es autoincremental funciona como newest
            default: break
        }
        return result
    }, [abonos, searchTerm, filterDifficulty, filterLight, priceRange, sortBy, isLoading])

    // 3. Estados de Carga y Error
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
                <div className="animate-pulse flex flex-col items-center">
                    <FlaskConical className="w-16 h-16 text-amber-300 mb-4" />
                    <span className="text-amber-800 font-mono font-bold">Analizando suelos...</span>
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFBF7] text-amber-900">
                <FlaskConical className="w-16 h-16 mb-4 text-red-400" />
                <h2 className="text-2xl font-bold">Error en el laboratorio</h2>
                <p>No pudimos cargar las fórmulas de abono.</p>
            </div>
        )
    }

    return (
        // --- FONDO BOTICA ORGÁNICA ---
        <section className="min-h-screen bg-[#FDFBF7] dark:bg-amber-950/30 transition-colors duration-500 font-sans">

            {/* Header */}
            <div className="relative border-b-2 border-amber-900/10 dark:border-amber-500/10 pt-16 pb-20 px-4 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]"></div>

                <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div>
                            <span className="inline-block py-1 px-3 rounded border border-amber-900/20 text-amber-900/60 dark:text-amber-200 text-xs font-mono mb-4 tracking-widest uppercase">
                                Dept. Nutrición Vegetal
                            </span>
                            <h1 className="text-4xl md:text-6xl font-black text-amber-950 dark:text-amber-50 tracking-tight mb-4">
                                Suelos & <span className="text-amber-600 dark:text-amber-400 italic">Nutrientes</span>
                            </h1>
                            <p className="text-amber-800/70 dark:text-amber-200 max-w-xl text-lg leading-relaxed">
                                Fórmulas orgánicas y minerales para potenciar el crecimiento, la floración y la salud radicular.
                            </p>
                        </div>

                        <div className="hidden md:flex items-center justify-center w-32 h-32 rounded-full border-4 border-amber-100 dark:border-amber-900 bg-white dark:bg-amber-950 shadow-2xl shadow-amber-900/10">
                            <FlaskConical className="w-14 h-14 text-amber-600" strokeWidth={1.5} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">

                {/* --- BARRA DE CONTROL --- */}
                <div className="flex flex-col lg:flex-row gap-4 mb-10 sticky top-20 z-30 bg-[#FDFBF7]/95 dark:bg-[#1a150e]/95 backdrop-blur-md py-4 -mx-4 px-4 lg:static lg:bg-transparent lg:p-0">

                    {/* Search Field */}
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Buscar fórmula (ej: Humus, Triple 15)..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-4 pr-12 py-3 bg-white dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg text-amber-900 dark:text-amber-100 placeholder-amber-900/30 focus:outline-none focus:border-amber-500 transition-colors shadow-sm"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-amber-100 dark:bg-amber-800 rounded-md">
                            <Search className="w-4 h-4 text-amber-700 dark:text-amber-200" />
                        </div>
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center gap-2 px-5 py-3 border rounded-lg font-medium transition-all whitespace-nowrap ${showFilters
                                ? 'bg-amber-900 text-white border-amber-900 dark:bg-amber-700'
                                : 'bg-white text-amber-900 border-amber-200 hover:border-amber-400 dark:bg-transparent dark:text-amber-200 dark:border-amber-800'
                                }`}
                        >
                            <Filter className="w-4 h-4" />
                            <span>{showFilters ? 'Ocultar Filtros' : 'Filtrar'}</span>
                        </button>

                        <div className="relative min-w-[160px]">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full h-full appearance-none px-4 bg-white dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg text-amber-900 dark:text-amber-200 cursor-pointer focus:outline-none focus:border-amber-500"
                            >
                                <option value="popular">★ Más Efectivos</option>
                                <option value="price-low">$ Menor Precio</option>
                                <option value="price-high">$ Mayor Precio</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400 pointer-events-none" />
                        </div>

                        <div className="flex bg-white dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800 p-1">
                            <button onClick={() => setViewMode("grid")} className={`p-2 rounded transition-all ${viewMode === "grid" ? "bg-amber-100 dark:bg-amber-800 text-amber-900 dark:text-white" : "text-amber-400 hover:text-amber-600"}`}>
                                <Grid3x3 className="w-5 h-5" />
                            </button>
                            <button onClick={() => setViewMode("list")} className={`p-2 rounded transition-all ${viewMode === "list" ? "bg-amber-100 dark:bg-amber-800 text-amber-900 dark:text-white" : "text-amber-400 hover:text-amber-600"}`}>
                                <List className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- CONTENIDO PRINCIPAL --- */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

                    {/* SIDEBAR FILTERS */}
                    <aside className={`lg:col-span-1 space-y-8 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                        <div className="bg-white dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 rounded-xl p-6 sticky top-36">

                            {/* Filtro: Objetivo */}
                            <div className="mb-6">
                                <h4 className="font-bold text-amber-950 dark:text-amber-50 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                                    <Sprout className="w-4 h-4 text-green-600" /> Objetivo
                                </h4>
                                <div className="space-y-1">
                                    {[
                                        { val: "todo", label: "Cualquier Objetivo" },
                                        { val: "Sombra", label: "Sustrato / Raíces" },
                                        { val: "Sombra parcial", label: "Crecimiento General" },
                                        { val: "Luz indirecta", label: "Floración" },
                                        { val: "Luz directa", label: "Recuperación" }
                                    ].map((opt) => (
                                        <button
                                            key={opt.val}
                                            onClick={() => setFilterLight(opt.val)}
                                            className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${filterLight === opt.val
                                                ? "bg-amber-100 text-amber-900 font-bold dark:bg-amber-800 dark:text-amber-100"
                                                : "text-amber-700 hover:bg-amber-50 dark:text-amber-300 dark:hover:bg-amber-900/30"
                                                }`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Filtro: Aplicación */}
                            <div className="mb-6">
                                <h4 className="font-bold text-amber-950 dark:text-amber-50 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                                    <Beaker className="w-4 h-4 text-blue-500" /> Aplicación
                                </h4>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { val: "todo", label: "Todo", icon: <Beaker className="w-3 h-3" /> },
                                        { val: "Fácil", label: "Sólido", icon: <span className="w-3 h-3 rounded-full border border-current" /> },
                                        { val: "Medio", label: "Líquido", icon: <span className="w-3 h-3 rounded-tr-lg border border-current" /> }, // Icono improvisado
                                        { val: "Difícil", label: "Mix", icon: <FlaskConical className="w-3 h-3" /> }
                                    ].map((opt) => (
                                        <button
                                            key={opt.val}
                                            onClick={() => setFilterDifficulty(opt.val)}
                                            className={`flex flex-col items-center justify-center p-2 rounded border text-xs gap-1 transition-all ${filterDifficulty === opt.val
                                                ? "border-amber-500 bg-amber-50 text-amber-900 dark:bg-amber-900 dark:text-amber-100"
                                                : "border-amber-100 bg-white text-amber-500 hover:border-amber-300 dark:bg-transparent dark:border-amber-800"
                                                }`}
                                        >
                                            {opt.icon}
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price */}
                            <div>
                                <h4 className="font-bold text-amber-950 dark:text-amber-50 mb-3 text-sm uppercase tracking-wide">Presupuesto</h4>
                                <input
                                    type="range" min="0" max="200000" step="5000"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                    className="w-full h-1 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                                />
                                <div className="flex justify-between mt-2 text-xs font-mono text-amber-800 dark:text-amber-300">
                                    <span>$0</span>
                                    <span className="font-bold">${priceRange[1].toLocaleString()}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => { setFilterDifficulty("todo"); setFilterLight("todo"); setPriceRange([0, 200000]); setSearchTerm(""); }}
                                className="w-full mt-6 py-2 text-xs text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-200 underline"
                            >
                                Restaurar valores
                            </button>
                        </div>
                    </aside>

                    {/* PRODUCT LIST */}
                    <div className="lg:col-span-3">
                        {filteredProducts.length > 0 ? (
                            <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                                {filteredProducts.map((abono) => (
                                    <AbonoCard key={abono.id} product={abono} viewMode={viewMode} />
                                ))}
                            </div>
                        ) : (
                            // Empty State
                            <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-amber-950/10 rounded-xl border border-dashed border-amber-300 dark:border-amber-800 text-center">
                                <div className="p-4 bg-amber-50 dark:bg-amber-900/30 rounded-full mb-4">
                                    <Search className="w-8 h-8 text-amber-400" />
                                </div>
                                <h3 className="text-lg font-bold text-amber-900 dark:text-amber-100">Sin resultados</h3>
                                <p className="text-amber-700/60 dark:text-amber-300/60 text-sm max-w-xs mx-auto mb-4">
                                    No encontramos fórmulas con esos criterios. Intenta ajustar los filtros de aplicación u objetivo.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}