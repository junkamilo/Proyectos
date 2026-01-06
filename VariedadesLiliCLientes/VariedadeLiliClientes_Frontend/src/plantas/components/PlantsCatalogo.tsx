import { Leaf, Trees } from 'lucide-react';

// COMPONENTS
import { HeaderProducts } from '../../components/common/HeaderProducts/HeaderProduct';
import { BarraControl } from '../../components/common/BarraControl';
import { SidebarFilters } from '../../components/common/SidebarFilters';
import { ProductosLista } from '../../components/common/ProductosLista';
import { useState } from 'react';
import { useCatalog } from '@/hooks/useCatalog';

// HOOK (Lógica importada)


export default function PlantasCatalog() {
    // LLAMAMOS AL HOOK
    const { products, isLoading, filters, actions, isError } = useCatalog("plantas");
    // 2. Estado local para la vista (Grid/List) ya que es puramente visual
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    // 1. MANEJO DE CARGA Y ERROR
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-emerald-500"></div>
                <span className="ml-4 text-emerald-800 font-medium">Cargando vivero...</span>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-red-500">
                <Trees className="w-16 h-16 mb-4" />
                <h2 className="text-2xl font-bold">Error cargando las plantas</h2>
                <p>Por favor intenta recargar la página.</p>
            </div>
        );
    }

    // 2. RENDERIZADO (Ahora pasamos los props correctamente)
    return (
        <section className="min-h-screen bg-slate-50 dark:bg-green-950/20 transition-colors duration-500">

            <HeaderProducts
                variant="plantas"
                subtitle='Vivero Natural'
                title='Plantas de Interior'
                description='Purifica tu aire y relaja tu mente...'
                cantProducto='3'
                PorcentageprocessProduction='100%'
                processProduction='Orgánico'
                icon={<Leaf className="w-6 h-6" />}
            />

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">

                {/* Pasamos estados y acciones a la barra de control */}
                <BarraControl
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
    );
}