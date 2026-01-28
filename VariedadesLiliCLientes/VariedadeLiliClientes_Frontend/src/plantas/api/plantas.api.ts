import api from '@/api/axios';
import type { Producto } from "../types/planta-interface";

// Interface para tipar la respuesta de TU backend
interface ProductosResponse {
    status: string;
    message: string;
    data: Producto[];
}

// La función que hace la petición
export const getProductosPlantas = async (categoria?: string): Promise<Producto[]> => {
    
    // 1. Configuramos los parámetros (si hay categoría)
    const params = categoria ? { categoria } : {};

    // 2. Hacemos la petición GET usando la instancia 'api' principal
    // ⚠️ Importante: Usamos la ruta '/AddProductos' porque así la tienes en tu backend.
    const { data } = await api.get<ProductosResponse>('/AddProductos/productos', { params });

    // 3. Retornamos el array de productos. 
    // data.data accede al array dentro de tu respuesta JSON { status, message, data: [...] }
    return data.data || [];
};