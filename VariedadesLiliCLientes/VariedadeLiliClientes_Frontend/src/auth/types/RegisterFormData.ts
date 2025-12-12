export interface RegisterFormData {
    nombre_completo: string;
    email: string;
    contrasena: string;
    telefono: string;
    fecha_nacimiento: string;
    genero: string;
    url_foto_perfil: FileList | null;
}