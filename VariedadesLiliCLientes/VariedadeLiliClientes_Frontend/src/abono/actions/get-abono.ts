import { abono } from "../api/abono.api";
import type { ProductosResponse } from "../types/get-abono-response";



const BASE_URL = import.meta.env.VITE_API_URL;

export const getProductosAbono = async () => {

    // 1. Llamamos al endpoint que trae TODOS los productos
    const { data: apiResponse } = await abono.get<ProductosResponse>('/productos');

    // 2. Filtramos y transformamos
    const soloMateros = apiResponse.data
        // FILTRO: Solo dejamos pasar lo que sea categoria "materos" o "alcancia" si deseas incluirlas aquí
        // Nota: Asegúrate que en tu BD la categoría esté escrita exacta (ej: "alcancia" o "materos")
        .filter(producto =>
            producto.categoria.toLowerCase() === 'abono'
        )
        // MAPEO
        .map(producto => {
            return {
                id: producto.id_producto,
                name: producto.nombre_producto,
                price: parseFloat(producto.precio), // Convertimos string a number
                image: `${BASE_URL}${producto.url_foto_producto}`,
                category: producto.categoria,
                // Aquí mapeamos el material de la BD al "type" del frontend
                type: producto.material || "Cerámica",

                // --- DATOS SIMULADOS (Para que funcionen los filtros visuales) ---
                rating: (Math.random() * (5 - 4) + 4).toFixed(1),
                // Simulamos resistencia basada en material si fuera real, por ahora random
                difficulty: Math.random() > 0.5 ? "Fácil" : "Medio",
                // Simulamos ubicación
                light: Math.random() > 0.5 ? "Luz indirecta" : "Sombra",
                inStock: producto.cantidad,
                isNew: Math.random() > 0.7
            };
        });

    return soloMateros;
}