import type { Producto } from "./planta-interface";

export interface ProductosResponse {
    status: string;
    message: string;
    data: Producto[]; // Aquí va el array de productos
    meta: number;
}