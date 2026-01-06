import { useState } from 'react'
import { PiggyBank } from 'lucide-react'
import { HeaderProducts } from '@/components/common/HeaderProducts/HeaderProduct'
import { BarraControl } from '@/components/common/BarraControl'
import { SidebarFilters } from '@/components/common/SidebarFilters'

import { useCatalog } from '@/hooks/useCatalog'
import { ProductosLista } from '@/components/common/ProductosLista'

export default function AlcanciaCatalog() {
    // 1. ESTADO VISUAL LOCAL
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    // 2. USAMOS EL HOOK GENÉRICO
    // Pedimos "alcancia" (asegúrate que en tu BD se llame así la categoría, o "alcancias")
    const {
        products,
        isLoading,
        isError,
        filters,
        actions
    } = useCatalog("alcancia");

    // 3. ESTADOS DE CARGA
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-rose-50/30 dark:bg-slate-900">
                <div className="flex flex-col items-center animate-bounce">
                    <span className="text-6xl mb-4">🐷</span>
                    <span className="text-pink-600 dark:text-pink-400 font-bold tracking-wide">
                        Contando moneditas...
                    </span>
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

    // 4. RENDERIZADO
    return (
        <section className="min-h-screen bg-rose-50/30 dark:bg-slate-900 transition-colors duration-500 font-sans selection:bg-pink-200">

            {/* Header Específico */}
            <HeaderProducts
                variant="alcancia"
                subtitle='¡Empieza a ahorrar hoy!'
                title='Tus Sueños, Tu Tesoro'
                description='Alcancías con diseños únicos para decorar tu espacio y cumplir tus metas. Desde cerditos clásicos hasta diseños modernos.'
                cantProducto={products.length.toString()}
                PorcentageprocessProduction='100%'
                processProduction='Barro'
                icon={<span className="text-xl">🐷</span>}
            />

            <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20">

                {/* Barra de Control */}
                <BarraControl
                    placeholder="Buscar alcancía (ej: Cerdito, Superhéroe)..."
                    searchTerm={filters.searchTerm}
                    setSearchTerm={actions.setSearchTerm}
                    sortBy={filters.sortBy}
                    setSortBy={actions.setSortBy}
                    showFilters={filters.showFilters}
                    setShowFilters={actions.setShowFilters}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
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