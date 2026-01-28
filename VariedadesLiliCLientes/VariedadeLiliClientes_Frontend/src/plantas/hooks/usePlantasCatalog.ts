import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Producto, ProductPlanta } from '../types/planta-interface';
import { getProductosPlantas } from '../api/plantas.api';
// import api from '@/api/axios';  <-- NO LO NECESITAMOS AQUÍ PARA LA URL DE FOTO


// 1. DEFINIMOS LA URL BASE COMO TEXTO (String)
// Esto asegura que la imagen sea: "https://backend.com/uploads/foto.jpg"
const BASE_URL = import.meta.env.VITE_API_URL || 'https://variedadeslilibackend.onrender.com';

export const usePlantasCatalog = () => {
    // 1. ESTADOS
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("popular");
    const [filterTamano, setFilterTamano] = useState<string>("todo");
    const [filterMaterial, setFilterMaterial] = useState<string>("todo");
    const [priceRange, setPriceRange] = useState([0, 200000]);
    const [showFilters, setShowFilters] = useState(true);

    const categoriaActual = "plantas";

    // 2. FETCH Y TRANSFORMACIÓN
    const { data: rawPlants = [], isLoading, isError } = useQuery<Producto[], Error, ProductPlanta[]>({
        queryKey: ['productos-plantas', categoriaActual],
        
        // Usamos la función flecha
        queryFn: () => getProductosPlantas(categoriaActual),

        staleTime: 1000 * 60 * 10,

        select: (data: Producto[]) => {
            return data.map((item) => ({
                id: item.id_producto,
                name: item.nombre_producto,
                price: parseFloat(item.precio) || 0,

                // ⚠️ CORRECCIÓN DE LA IMAGEN ⚠️
                // Usamos BASE_URL (texto) en lugar de api (objeto)
                image: item.url_foto_producto
                    ? (item.url_foto_producto.startsWith('http') 
                        ? item.url_foto_producto 
                        : `${BASE_URL}${item.url_foto_producto}`)
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

    // 3. LÓGICA DE FILTRADO (Igual que antes)
    const plants = useMemo(() => {
        if (isLoading) return [];

        return rawPlants.filter((plant) => {
            const term = searchTerm.toLowerCase();
            const pName = (plant.name || "").toLowerCase();
            const pTamano = (plant.tamano || "").toLowerCase().trim();
            const pMaterial = (plant.material || "").toLowerCase().trim();

            const fTamano = filterTamano.toLowerCase().trim();
            const fMaterial = filterMaterial.toLowerCase().trim();

            const matchesSearch = pName.includes(term);
            const matchesTamano = fTamano === "todo" || pTamano === fTamano;
            const matchesMaterial = fMaterial === "todo" || pMaterial === fMaterial;
            const matchesPrice = plant.price >= priceRange[0] && plant.price <= priceRange[1];

            return matchesSearch && matchesTamano && matchesMaterial && matchesPrice;
        }).sort((a, b) => {
            if (sortBy === 'price-low') return a.price - b.price;
            if (sortBy === 'price-high') return b.price - a.price;
            return 0;
        });
    }, [rawPlants, searchTerm, filterTamano, filterMaterial, priceRange, sortBy, isLoading]);

    return {
        plants,
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