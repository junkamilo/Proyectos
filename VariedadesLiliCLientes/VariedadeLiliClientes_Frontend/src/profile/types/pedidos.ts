export interface PedidoResponse {
    status: string;
    message: string;
    data: Pedido[];
    meta: number;
}


export interface Pedido {
    id_pedido: number;
    id_cliente: number;
    fecha_pedido: Date | string;
    total: string;
    direccion_envio: string | null;
    estado: string;
    productos?: PedidoResponse[];
}