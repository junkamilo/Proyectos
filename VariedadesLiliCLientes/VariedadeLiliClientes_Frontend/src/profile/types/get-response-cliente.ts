export interface Cliente {
    id_cliente: number;
    nombre_completo: string;
    email: string;
    telefono: string;
    fecha_nacimiento: string;
    genero: string;
    url_foto_perfil: string;
    estado: string;
    fecha_registro: string;
}

// 2. La forma de la Respuesta del Servidor (El JSON que mostraste)
export interface APIResponse {
    status: string;   // "success"
    message: string;  // "Cliente encontrado"
    data: Cliente;    // El objeto cliente
    meta: number;     // 200
}