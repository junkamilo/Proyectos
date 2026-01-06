import { useState } from "react"
import { Box } from "lucide-react"

// 1. Importamos los Componentes Reutilizables
import { ProductCard } from "@/components/common/ProductCard" // <--- Tu tarjeta principal
import { BarraControl } from "@/components/common/BarraControl"
import { SidebarFilters } from "@/components/common/SidebarFilters"
import { HeaderProducts } from "@/components/common/HeaderProducts/HeaderProduct"

// 2. Importamos el Hook Genérico
import { useCatalog } from "@/hooks/useCatalog"
import { ProductosLista } from "@/components/common/ProductosLista"

export default function MaterosCatalog() {
    // ESTADO DE UI (Solo lo visual se queda aquí)
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

    // LÓGICA DE DATOS (El hook hace todo el trabajo sucio: fetch, filtros, ordenamiento)
    const {
        products,   // Lista final de productos (ya filtrada)
        isLoading,
        isError,
        filters,
        actions
    } = useCatalog("materos"); // <--- "materos" le dice al hook qué cargar

    // --- RENDERIZADO DE CARGA ---
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-100 dark:bg-stone-950">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-600"></div>
                <span className="ml-4 text-orange-800 font-serif font-bold">Horneando catálogo...</span>
            </div>
        )
    }

    // --- RENDERIZADO DE ERROR ---
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
        <section className="min-h-screen bg-stone-100 dark:bg-stone-950 transition-colors duration-500 font-sans">

            {/* Header Específico de Materos */}
            <HeaderProducts
                variant="materos"
                subtitle='Colección Artesanal'
                title='Materos & Macetas'
                description='Piezas únicas de cerámica, barro y concreto...'
                cantProducto={String(products.length)} // Cantidad real
                PorcentageprocessProduction='100%'
                processProduction='Hecho a mano'
                icon={<Box className="w-6 h-6" />}
            />

            <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-8 relative z-20">

                {/* BARRA DE CONTROL (Conectada al Hook) */}
                <BarraControl
                    searchTerm={filters.searchTerm}
                    setSearchTerm={actions.setSearchTerm}
                    sortBy={filters.sortBy}
                    setSortBy={actions.setSortBy}
                    showFilters={filters.showFilters}
                    setShowFilters={actions.setShowFilters}
                    // UI Local
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    placeholder="Buscar materos (ej: Barro, Cerámica)..."
                />

                <div className="flex flex-col lg:grid lg:grid-cols-4 gap-8 items-start">

                    {/* FILTROS (Columna 1) */}
                    {/* Controlamos su visibilidad aquí */}
                    <div className={`lg:col-span-1 ${filters.showFilters ? 'block' : 'hidden lg:block'}`}>
                        <SidebarFilters
                            showFilters={filters.showFilters}
                            filterTamano={filters.filterTamano}
                            setFilterTamano={actions.setFilterTamano}
                            filterMaterial={filters.filterMaterial}
                            setFilterMaterial={actions.setFilterMaterial}
                            priceRange={filters.priceRange}
                            setPriceRange={actions.setPriceRange}
                            onReset={actions.resetFilters}
                        />
                    </div>

                    {/* LISTA (Columna 2, 3 y 4) */}
                    {/* Si hay filtros, ocupa 3 columnas. Si no, ocupa las 4 completas */}
                    <div className={`w-full ${filters.showFilters ? "lg:col-span-3" : "lg:col-span-4"}`}>
                        <ProductosLista
                            filteredAndSortedPlants={products}
                            viewMode={viewMode}
                            onResetFilters={actions.resetFilters}
                        />
                    </div>

                </div>
            </div>
        </section>
    )
}