import api from "@/api/axios";
import type { ProductosResponse } from "../types/get-abono-response"; 

// 1. Definimos la URL base como TEXTO para que las imágenes no se rompan
const BASE_URL = import.meta.env.VITE_API_URL || 'https://variedadeslilibackend.onrender.com';

export const getProductosAbono = async () => {

    // 2. Usamos la instancia 'api' directa con la ruta COMPLETA del backend
    // (Recuerda: Prefijo '/AddProductos' + Ruta '/productos')
    const { data: apiResponse } = await api.get<ProductosResponse>('/AddProductos/productos');

    // 3. Extraemos el array de datos
    const listaProductos = apiResponse.data || [];

    // 4. Filtramos y transformamos
    const soloAbono = listaProductos
        // FILTRO: Buscamos la categoría 'abono' (o 'tierra', 'sustrato' según tu BD)
        .filter(producto => 
            producto.categoria.toLowerCase() === 'abono'
        )
        // MAPEO
        .map(producto => {
            return {
                id: producto.id_producto,
                name: producto.nombre_producto,
                price: parseFloat(producto.precio),
                
                // ⚠️ CORRECCIÓN CLAVE: Usamos BASE_URL (texto) + la ruta de la foto
                image: `${BASE_URL}${producto.url_foto_producto}`,
                
                category: producto.categoria,
                // Si no hay material definido, ponemos "Orgánico" o "Sustrato" por defecto
                type: producto.material || "Orgánico",

                // --- DATOS SIMULADOS ---
                rating: (Math.random() * (5 - 4) + 4).toFixed(1),
                difficulty: "Fácil", // Los abonos suelen ser de uso fácil
                light: "N/A", // El abono no necesita luz
                inStock: producto.cantidad,
                isNew: Math.random() > 0.7
            };
        });

    return soloAbono;
}