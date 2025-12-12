import { plantas } from "../api/plantas.api";
import type { ProductosResponse } from "../types/get-planta-response";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getProductosPlantas = async () => {

    // 1. Llamamos al endpoint que trae TODOS los productos
    const { data: apiResponse } = await plantas.get<ProductosResponse>('/productos');

    // 2. Filtramos y transformamos
    const soloPlantas = apiResponse.data
        // FILTRO: Solo dejamos pasar lo que sea categoria "plantas"
        .filter(producto => producto.categoria.toLowerCase() === 'plantas')
        // MAPEO: Transformamos los datos para que sean fáciles de usar en el frontend
        .map(producto => {
            return {
                id: producto.id_producto, // Mapeamos id_producto a id
                name: producto.nombre_producto,
                // Convertimos el precio de String ("20000.00") a Number (20000) para poder filtrar
                price: parseFloat(producto.precio),
                // Construimos la URL completa de la imagen
                image: `${BASE_URL}${producto.url_foto_producto}`,
                description: producto.descripcion,
                category: producto.categoria,

                // --- DATOS FALTANTES EN TU BD ---
                // Como tu base de datos aun no tiene "dificultad" ni "luz",
                // los simulamos aleatoriamente para que tu UI no se rompa.
                // TODO: Agregar estos campos en el Backend en el futuro.
                rating: (Math.random() * (5 - 4) + 4).toFixed(1), // Rating entre 4.0 y 5.0
                difficulty: Math.random() > 0.5 ? "Fácil" : "Medio",
                light: Math.random() > 0.5 ? "Luz indirecta" : "Sombra parcial",
                type: "Follaje", // Default
                isNew: Math.random() > 0.7,
                inStock: producto.cantidad
            };
        });

    return soloPlantas;
}