import type { ProductoAbono } from "./abono-response";

export interface ProductosResponse {
    status: string;
    message: string;
    data: ProductoAbono[]; // Aquí va el array de productos
    meta: number;
}