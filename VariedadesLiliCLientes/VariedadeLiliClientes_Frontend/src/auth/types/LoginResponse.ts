export interface AuthResponse {
    status: string;
    message: string;
    data: {
        id_cliente: number;
        nombre_completo: string;
        email: string;
        url_foto_perfil: string | null;
        telefono: string;
        token: string; 
    };
}