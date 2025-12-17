export interface RegisteredUserData {
    id_cliente: number;
    nombre_completo: string;
    email: string;
    telefono: string;
    url_foto_perfil: string | null;
    token?: string;
}

export interface RegisterResponse {
    status: string;
    message: string;
    data: RegisteredUserData;
}