import api from "@/api/axios";
// Asegúrate de tener definidos los tipos o usa 'any' si estás probando
import type { ProductosResponse } from "../types/get-matero-response"; 

// Necesitamos la URL base como TEXTO para las imágenes, no la instancia de Axios
const BASE_URL = import.meta.env.VITE_API_URL || 'https://variedadeslilibackend.onrender.com';

export const getProductosMateros = async () => {

    // 1. Llamamos a la ruta CORRECTA (la suma de /AddProductos + /productos)
    const { data: apiResponse } = await api.get<ProductosResponse>('/AddProductos/productos');

    // 2. Obtenemos el array crudo desde la respuesta del backend
    // (Recuerda que tu backend devuelve { status, message, data: [] })
    const listaProductos = apiResponse.data || [];

    // 3. Filtramos y transformamos
    const soloMateros = listaProductos
        // FILTRO: Solo dejamos pasar categoría "materos"
        .filter(producto => 
            producto.categoria.toLowerCase() === 'materos'
        )
        // MAPEO
        .map(producto => {
            return {
                id: producto.id_producto,
                name: producto.nombre_producto,
                price: parseFloat(producto.precio), // Convertimos string a number
                
                // ⚠️ CORRECCIÓN DE IMAGEN: Usamos la URL de texto, no el objeto axios
                image: `${BASE_URL}${producto.url_foto_producto}`,
                
                category: producto.categoria,
                type: producto.material || "Cerámica",

                // --- DATOS SIMULADOS ---
                rating: (Math.random() * (5 - 4) + 4).toFixed(1),
                difficulty: Math.random() > 0.5 ? "Fácil" : "Medio",
                light: Math.random() > 0.5 ? "Luz indirecta" : "Sombra",
                inStock: producto.cantidad,
                isNew: Math.random() > 0.7
            };
        });

    return soloMateros;
}