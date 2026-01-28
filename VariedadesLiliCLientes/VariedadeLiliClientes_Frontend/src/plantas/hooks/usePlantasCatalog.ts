import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProductosPlantas } from '../actions/get-plantas';
import type { Producto, ProductPlanta } from '../types/planta-interface';
import api from '@/api/axios';


export const usePlantasCatalog = () => {
    // 1. ESTADOS
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("popular");
    const [filterTamano, setFilterTamano] = useState<string>("todo");
    const [filterMaterial, setFilterMaterial] = useState<string>("todo");
    const [priceRange, setPriceRange] = useState([0, 200000]);
    const [showFilters, setShowFilters] = useState(true);

    // Definimos la categoría actual para este catálogo
    const categoriaActual = "plantas";

    // 2. FETCH Y TRANSFORMACIÓN
    const { data: rawPlants = [], isLoading, isError } = useQuery<Producto[], Error, ProductPlanta[]>({
        // A. CLAVE ÚNICA: Agregamos la categoría a la key para que el cache no se mezcle
        queryKey: ['productos-plantas', categoriaActual],

        // B. CORRECCIÓN CRÍTICA: Usamos función flecha para pasar el argumento
        queryFn: () => getProductosPlantas(categoriaActual),

        staleTime: 1000 * 60 * 10, // 10 minutos

        // C. TRANSFORMACIÓN: Backend (Producto) -> Frontend (ProductPlanta)
        select: (data: Producto[]) => {
            return data.map((item) => ({
                id: item.id_producto,
                name: item.nombre_producto,
                price: parseFloat(item.precio) || 0,

                // Url Imagen (con corrección de localhost)
                image: item.url_foto_producto
                    ? (item.url_foto_producto.startsWith('http') ? item.url_foto_producto : `${api}${item.url_foto_producto}`)
                    : "/placeholder.png",

                description: item.descripcion || "",
                category: item.categoria,

                // Mapeo seguro de Tamaño y Material
                tamano: item.tamano || "",
                material: item.material || "",

                // Campos calculados
                rating: 5,
                isNew: item.estado === 'activo',
                inStock: item.cantidad
            }));
        }
    });

    // 3. LÓGICA DE FILTRADO (Client-Side)
    const plants = useMemo(() => {
        if (isLoading) return [];

        return rawPlants.filter((plant) => {
            // A. Normalización (DATOS DEL PRODUCTO)
            const term = searchTerm.toLowerCase();
            const pName = (plant.name || "").toLowerCase();

            // ¡IMPORTANTE! Agregamos .trim() aquí también por si la BD trae espacios
            const pTamano = (plant.tamano || "").toLowerCase().trim();
            const pMaterial = (plant.material || "").toLowerCase().trim();

            // B. Normalización (FILTROS SELECCIONADOS)
            const fTamano = filterTamano.toLowerCase().trim();
            const fMaterial = filterMaterial.toLowerCase().trim();

            // --- BLOQUE DE DEPURACIÓN (Bórralo cuando funcione) ---
            // Solo muestra logs si hay un filtro activo para no llenar la consola
            if (fTamano !== "todo") {
                console.log(`🔍 Comparando TAMAÑO: Producto [${pTamano}] vs Filtro [${fTamano}] -> ¿Coinciden? ${pTamano === fTamano}`);
            }
            if (fMaterial !== "todo") {
                console.log(`🔍 Comparando MATERIAL: Producto [${pMaterial}] vs Filtro [${fMaterial}] -> ¿Coinciden? ${pMaterial === fMaterial}`);
            }
            // -----------------------------------------------------

            // C. Comparaciones
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

    // 4. API DEL HOOK
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