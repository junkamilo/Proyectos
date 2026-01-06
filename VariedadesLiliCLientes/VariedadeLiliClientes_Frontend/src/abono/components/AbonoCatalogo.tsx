import { FlaskConical } from 'lucide-react'

import { BarraControl } from '@/components/common/BarraControl'
import { SidebarFilters } from '@/components/common/SidebarFilters'
// Asegúrate de importar tu lista genérica
import { useCatalog } from '@/hooks/useCatalog'
import { useState } from 'react'
import { HeaderProducts } from '@/components/common/HeaderProducts/HeaderProduct'
import { ProductosLista } from '@/components/common/ProductosLista'

export default function AbonoCatalog() {
    // 1. ESTADO VISUAL LOCAL (Grid/List)
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    // 2. USAMOS EL HOOK GENÉRICO
    // Le pedimos "abono" y él se encarga de todo el fetch, loading y filtrado
    const {
        products,     // Ya vienen filtrados y ordenados
        isLoading,
        isError,
        filters,      // searchTerm, priceRange, etc.
        actions       // setSearchTerm, resetFilters, etc.
    } = useCatalog("abono");

    // 3. MANEJO DE ESTADOS DE CARGA/ERROR
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] dark:bg-amber-950">
                <div className="animate-pulse flex flex-col items-center">
                    <FlaskConical className="w-16 h-16 text-amber-300 mb-4" />
                    <span className="text-amber-800 dark:text-amber-200 font-mono font-bold">
                        Analizando suelos...
                    </span>
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

    // 4. RENDERIZADO LIMPIO
    return (
        <section className="min-h-screen bg-[#FDFBF7] dark:bg-amber-950/30 transition-colors duration-500 font-sans">

            {/* Header Específico para Abono */}
            <HeaderProducts
                variant="abono"
                subtitle='Dept. Nutrición Vegetal'
                title='Suelos & Nutrientes'
                description='Fórmulas orgánicas y minerales para potenciar el crecimiento, la floración y la salud radicular.'
                cantProducto={products.length.toString()} // Cantidad real
                PorcentageprocessProduction='100%'
                processProduction='Tierra'
                icon={<FlaskConical className="w-6 h-6" strokeWidth={1.5} />}
            />

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
                {/* Barra de Control Conectada al Hook Genérico */}
                <BarraControl
                    placeholder="Buscar abono (ej: Triple 15, Humus)..."
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