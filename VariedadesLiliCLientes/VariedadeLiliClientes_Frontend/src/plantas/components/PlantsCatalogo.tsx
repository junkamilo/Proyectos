import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Trees } from 'lucide-react';

// ACTIONS & COMPONENTS
import { getProductosPlantas } from '../actions/get-plantas';
import { HeaderPlantas } from './HeaderPlantas';
import { BarraControl } from './BarraControl';
import { SidebarFilters } from './SidebarFilters';
import { ProductosLista } from './ProductosLista';

// --- 1. DEFINICIÓN DE TIPO (Contrato de Datos) ---
// Idealmente esto va en un archivo types.ts
export interface Product {
    id: number;
    name: string;
    price: number;
    image: string; // Garantizamos que siempre hay imagen
    rating: number; // Garantizamos que es número
    description: string;
    category: string;
    difficulty: string;
    light: string;
    type: string;
    isNew: boolean;
    inStock: number;
}

export default function PlantasCatalog() {
    // ESTADOS DE FILTROS
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("popular");
    const [filterDifficulty, setFilterDifficulty] = useState<string>("todo");
    const [filterLight, setFilterLight] = useState<string>("todo");
    const [priceRange, setPriceRange] = useState([0, 200000]);

    // --- 2. FETCH & NORMALIZACIÓN (La Solución Pro) ---
    const { data: plants = [], isLoading, isError } = useQuery({
        queryKey: ['productos-plantas'],
        queryFn: getProductosPlantas,
        staleTime: 1000 * 60 * 10, // 10 minutos

        // AQUÍ OCURRE LA MAGIA: Transformamos los datos antes de usarlos
        select: (data: any[]): Product[] => {
            return data.map(plant => ({
                ...plant,
                // Arreglamos el problema del Rating (String -> Number)
                rating: Number(plant.rating) || 0,
                // Arreglamos el problema del Precio (asegurar Number)
                price: Number(plant.price) || 0,
                // Arreglamos el problema de imagen faltante
                image: plant.image || "/img/placeholder-plant.png"
            }));
        }
    });

    // --- 3. LÓGICA DE FILTRADO (Ahora más limpia) ---
    const filteredAndSortedPlants = useMemo(() => {
        if (isLoading) return [];

        let result = plants.filter((plant) => {
            // Normalizamos a minúsculas para búsqueda insensible a mayúsculas
            const term = searchTerm.toLowerCase();
            const matchesSearch = plant.name.toLowerCase().includes(term) ||
                plant.type.toLowerCase().includes(term);

            const matchesDifficulty = filterDifficulty === "todo" || plant.difficulty === filterDifficulty;
            const matchesLight = filterLight === "todo" || plant.light === filterLight;
            const matchesPrice = plant.price >= priceRange[0] && plant.price <= priceRange[1];

            return matchesSearch && matchesDifficulty && matchesLight && matchesPrice;
        });

        // Lógica de ordenamiento (Ya no necesitamos parseFloat porque 'rating' es number)
        switch (sortBy) {
            case "price-low":
                result.sort((a, b) => a.price - b.price);
                break;
            case "price-high":
                result.sort((a, b) => b.price - a.price);
                break;
            case "rating":
                result.sort((a, b) => b.rating - a.rating);
                break;
            case "newest":
                result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
                break;
            default: break;
        }
        return result;
    }, [plants, searchTerm, filterDifficulty, filterLight, priceRange, sortBy, isLoading]);

    // --- 4. RENDERIZADO DE ESTADOS DE CARGA ---
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

    // --- 5. RENDERIZADO PRINCIPAL ---
    return (
        <section className="min-h-screen bg-slate-50 dark:bg-green-950/20 transition-colors duration-500">

            <HeaderPlantas />

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">

                {/* IMPORTANTE: Debes pasar los props de control a tus componentes */}
                <BarraControl />

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start mt-8">

                    {/* IMPORTANTE: Sidebar necesita las funciones para actualizar el estado */}
                    <SidebarFilters />

                    {/* Lista de Productos Corregida */}
                    <ProductosLista filteredAndSortedPlants={filteredAndSortedPlants} />
                </div>
            </div>
        </section>
    );
}