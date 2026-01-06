import { plantas } from "../api/plantas.api";
import type { Producto } from "../types/planta-interface";

interface ProductosResponse {
    status: string;
    message: string;
    data: Producto[];
}

export const getProductosPlantas = async (categoria?:string): Promise<Producto[]> => {
    // Configuración de parámetros para Axios
    const params = categoria ? { categoria } : {};

    // 1. Hacemos la petición
    // Axios guarda la respuesta del servidor dentro de una propiedad llamada 'data'
    const response = await plantas.get<ProductosResponse>('/productos',{params});

    // 2. Extraemos el cuerpo de la respuesta (el JSON que me mostraste)
    const backendResponse = response.data;

    // 4. Retornamos SOLAMENTE el array. 
    // Usamos el operador ?. por seguridad, y si no hay nada, devolvemos array vacío.
    return backendResponse.data || [];
}