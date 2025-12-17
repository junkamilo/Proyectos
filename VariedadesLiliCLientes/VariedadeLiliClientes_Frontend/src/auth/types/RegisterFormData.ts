// Datos que enviamos desde el (Formulario)
export interface RegisterFormData {
    nombre_completo: string;
    email: string;
    contrasena: string;
    telefono: string;
    url_foto_perfil: FileList | null; 
    fecha_nacimiento?: string;
    genero?: string;
}