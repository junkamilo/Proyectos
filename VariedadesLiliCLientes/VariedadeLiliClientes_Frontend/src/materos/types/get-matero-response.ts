import type { Producto } from "./matero-response";


export interface ProductosResponse {
    status: string;
    message: string;
    data: Producto[]; // Aquí va el array de productos
    meta: number;
}