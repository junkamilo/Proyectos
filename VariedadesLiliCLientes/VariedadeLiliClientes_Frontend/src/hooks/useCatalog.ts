import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
// Asegúrate de que esta acción acepte un string como parámetro

// Importa tus interfaces. Si todos los productos tienen la misma estructura, usa la misma interfaz.
import type { Producto, ProductPlanta } from '@/plantas/types/planta-interface';
import { getProductosPlantas } from '@/plantas/api/plantas.api';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://variedadeslilibackend.onrender.com';

// 1. RECIBIMOS LA CATEGORÍA COMO ARGUMENTO
export const useCatalog = (categoria: string) => {
    
    // 2. ESTADOS (Igual que antes)
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("popular");
    const [filterTamano, setFilterTamano] = useState<string>("todo");
    const [filterMaterial, setFilterMaterial] = useState<string>("todo");
    const [priceRange, setPriceRange] = useState([0, 200000]);
    const [showFilters, setShowFilters] = useState(true);

    // 3. FETCH DINÁMICO
    const { data: rawData = [], isLoading, isError } = useQuery<Producto[], Error, ProductPlanta[]>({
        // A. CLAVE ÚNICA DINÁMICA: Esto es vital para que no mezcle materos con plantas
        queryKey: ['productos', categoria],

        // B. FUNCIÓN DINÁMICA: Pasamos la categoría que recibimos por argumento
        queryFn: () => getProductosPlantas(categoria),

        staleTime: 1000 * 60 * 10, // 10 minutos

        // C. TRANSFORMACIÓN (Mantenemos tu lógica, sirve para todos)
        select: (data: Producto[]) => {
            return data.map((item) => ({
                id: item.id_producto,
                name: item.nombre_producto,
                price: parseFloat(item.precio) || 0,
                image: item.url_foto_producto
                    ? (item.url_foto_producto.startsWith('http') ? item.url_foto_producto : `${BASE_URL}${item.url_foto_producto}`)
                    : "/placeholder.png",
                description: item.descripcion || "",
                category: item.categoria,
                tamano: item.tamano || "",
                material: item.material || "",
                rating: 5,
                isNew: item.estado === 'activo',
                inStock: item.cantidad
            }));
        }
    });

    // 4. LÓGICA DE FILTRADO (Ahora filtra sobre 'rawData' que puede ser cualquier cosa)
    const products = useMemo(() => {
        if (isLoading) return [];

        return rawData.filter((item) => {
            const term = searchTerm.toLowerCase();
            const pName = (item.name || "").toLowerCase();
            const pTamano = (item.tamano || "").toLowerCase().trim();
            const pMaterial = (item.material || "").toLowerCase().trim();

            const fTamano = filterTamano.toLowerCase().trim();
            const fMaterial = filterMaterial.toLowerCase().trim();

            const matchesSearch = pName.includes(term);
            const matchesTamano = fTamano === "todo" || pTamano === fTamano;
            const matchesMaterial = fMaterial === "todo" || pMaterial === fMaterial;
            const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];

            return matchesSearch && matchesTamano && matchesMaterial && matchesPrice;
        }).sort((a, b) => {
            if (sortBy === 'price-low') return a.price - b.price;
            if (sortBy === 'price-high') return b.price - a.price;
            return 0;
        });
    }, [rawData, searchTerm, filterTamano, filterMaterial, priceRange, sortBy, isLoading]);

    // 5. API DEL HOOK (Retornamos 'products' en vez de 'plants')
    return {
        products, 
        isLoading,
        isError,
        filters: { searchTerm, sortBy, filterTamano, filterMaterial, priceRange, showFilters },
        actions: {
            setSearchTerm,
            setSortBy,
            setFilterTamano,
            setFilterMaterial,
            setPriceRange,
            setShowFilters,
            resetFilters: () => {
                setSearchTerm("");
                setFilterTamano("todo");
                setFilterMaterial("todo");
                setPriceRange([0, 200000]);
            }
        }
    };
};