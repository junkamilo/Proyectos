import api from "@/api/axios";
import type { ProductosResponse } from "../types/get-alcancia-response";

// 1. Definimos la URL base como TEXTO para las imágenes
const BASE_URL = import.meta.env.VITE_API_URL || 'https://variedadeslilibackend.onrender.com';

export const getProductosAlcancia = async () => {

    // 2. Llamamos a la ruta CORRECTA del backend
    const { data: apiResponse } = await api.get<ProductosResponse>('/AddProductos/productos');

    // 3. Obtenemos el array de datos
    const listaProductos = apiResponse.data || [];

    // 4. Filtramos y transformamos
    const soloAlcancias = listaProductos
        // FILTRO: Solo dejamos pasar categoría "alcancia"
        .filter(producto => 
            producto.categoria.toLowerCase() === 'alcancia'
        )
        // MAPEO
        .map(producto => {
            // Simulamos datos para que los filtros visuales funcionen
            const estilos = ["Minimalista", "Personajes", "Pintada a Mano", "Retro"];
            const estiloRandom = estilos[Math.floor(Math.random() * estilos.length)];

            // Simulamos tamaño (Difficulty): Fácil=Pequeña, Medio=Mediana, Difícil=Jumbo
            const tamanoRandom = Math.random() > 0.6 ? "Difícil" : Math.random() > 0.3 ? "Medio" : "Fácil";

            return {
                id: producto.id_producto,
                name: producto.nombre_producto,
                price: parseFloat(producto.precio),
                
                // ⚠️ CORRECCIÓN IMPORTANTE: URL de imagen arreglada
                image: `${BASE_URL}${producto.url_foto_producto}`,
                
                category: producto.categoria,
                type: producto.material || "Cerámica",

                // --- DATOS SIMULADOS ---
                rating: (Math.random() * (5 - 4) + 4).toFixed(1),
                difficulty: tamanoRandom, // Mapeado a Tamaño
                light: estiloRandom,      // Mapeado a Estilo
                inStock: producto.cantidad,
                isNew: Math.random() > 0.75
            };
        });

    return soloAlcancias;
}