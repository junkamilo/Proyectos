import { ProductCard } from "@/components/common/ProductCard";
import {  SearchX } from "lucide-react";
// Importamos la interfaz correcta desde tu archivo de tipos compartido (ajusta la ruta si es necesario)
import type { Product } from "@/plantas/hooks/useProductCard";

interface Props {
    filteredAndSortedPlants: Product[];
    viewMode: "grid" | "list";
    // Opcional: callback para el botón de reset
    onResetFilters?: () => void;
}

export const ProductosLista = ({ filteredAndSortedPlants, viewMode, onResetFilters }: Props) => {

    return (
        // Quitamos el 'lg:col-span-3' de aquí para que sea el PADRE quien decida el ancho
        <div className="w-full h-full">

            {filteredAndSortedPlants.length > 0 ? (
                // Lógica de visualización (Grid vs List)
                <div className={`
                    w-full
                    ${viewMode === "grid"
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        : "flex flex-col gap-4"
                    }
                `}>
                    {filteredAndSortedPlants.map((product) => (
                        // Pasamos directamente el componente, sin envolverlo en otro div innecesario
                        <ProductCard
                            key={product.id}
                            product={product}
                            viewMode={viewMode}
                        />
                    ))}
                </div>
            ) : (
                // Estado Vacío (Empty State)
                <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-emerald-200 dark:border-emerald-900/50">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-full mb-4">
                        <SearchX className="w-10 h-10 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                        No encontramos resultados
                    </h3>
                    <p className="text-slate-500 text-center max-w-xs mb-6 text-sm">
                        Intenta ajustar los filtros o buscar con otro término.
                    </p>

                    {onResetFilters && (
                        <button
                            onClick={onResetFilters}
                            className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity shadow-lg"
                        >
                            Limpiar filtros
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};