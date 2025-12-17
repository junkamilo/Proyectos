
import { ProductCard } from "@/components/common/ProductCard";
import type { Product } from "@/components/hooks/useProductCard";
import { Trees } from "lucide-react";
import { useState } from "react";


interface Props {
    // 2. CAMBIO CLAVE: Ahora es un Array de Plantas, no una función
    filteredAndSortedPlants: Product[];
}

export const ProductosLista = ({ filteredAndSortedPlants }: Props) => {
    // ... resto de tu lógica de estados (ver nota abajo sobre esto)
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    // NOTA: Estos estados locales no afectarán a la lista si la lista viene filtrada desde el padre.
    // Ver "Sugerencia de Arquitectura" más abajo.
    const [filterDifficulty, setFilterDifficulty] = useState<string>("todo");
    const [filterLight, setFilterLight] = useState<string>("todo");
    const [priceRange, setPriceRange] = useState([0, 200000]);
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="lg:col-span-3">
            {/* Ahora TypeScript sabe que esto es un array y permite .length */}
            {filteredAndSortedPlants.length > 0 ? (
                <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                    {/* Y sabe que .map es válido */}
                    {filteredAndSortedPlants.map((plant) => (
                        <div key={plant.id}>
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
                        // OJO: Esto solo limpia el estado LOCAL, no recargará la lista del padre
                        onClick={() => { setFilterDifficulty("todo"); setFilterLight("todo"); setPriceRange([0, 200000]); setSearchTerm(""); }}
                        className="px-6 py-2 bg-emerald-700 text-white rounded-lg font-bold hover:bg-emerald-800 transition-colors shadow-lg shadow-emerald-500/20"
                    >
                        Ver todas las plantas
                    </button>
                </div>
            )}
        </div>
    );
};