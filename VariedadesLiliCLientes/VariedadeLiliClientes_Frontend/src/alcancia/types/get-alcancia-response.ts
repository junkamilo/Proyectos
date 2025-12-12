import type { ProductoAlcancia } from "./alcancia-response";

export interface ProductosResponse {
    status: string;
    message: string;
    data: ProductoAlcancia[]; // Aquí va el array de productos
    meta: number;
}