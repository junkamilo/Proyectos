import api from "@/api/axios";
import { alcancia } from "../api/alcancia.api";
import type { ProductosResponse } from "../types/get-alcancia-response";

export const getProductosAlcancia = async () => {

    // 1. Llamamos al endpoint que trae TODOS los productos
    const { data: apiResponse } = await alcancia.get<ProductosResponse>('/productos');

    // 2. Filtramos y transformamos
    const soloAlcancias = apiResponse.data
        // FILTRO: Solo dejamos pasar lo que sea categoria "alcancia"
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
                image: `${api}${producto.url_foto_producto}`,
                category: producto.categoria,

                // Mapeamos material a "Type"
                type: producto.material || "Cerámica",

                // --- DATOS SIMULADOS ---
                rating: (Math.random() * (5 - 4) + 4).toFixed(1),

                // Mapeado a Tamaño en el frontend
                difficulty: tamanoRandom,

                // Mapeado a Estilo en el frontend
                light: estiloRandom,

                inStock: producto.cantidad,
                isNew: Math.random() > 0.75
            };
        });

    return soloAlcancias;
}