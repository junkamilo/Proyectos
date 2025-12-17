
import { clienteApi } from "../api/api-register";
import { isAxiosError } from "axios";
import type { RegisterFormData } from "../types/RegisterFormData";
import type { RegisterResponse } from "../types/RegisterResponse";

export const registerUser = async (formData: RegisterFormData): Promise<RegisterResponse> => {
    try {
        // 1. Crear instancia de FormData (Obligatorio para subir archivos)
        const data = new FormData();

        // 2. Agregar campos de texto
        data.append("nombre_completo", formData.nombre_completo);
        data.append("email", formData.email);
        data.append("contrasena", formData.contrasena);
        data.append("telefono", formData.telefono);



        if (formData.fecha_nacimiento) {
            data.append("fecha_nacimiento", formData.fecha_nacimiento);
        }

        if (formData.genero) {
            data.append("genero", formData.genero);
        }

        // 3. Agregar la imagen SOLO si el usuario seleccionó una
        if (formData.url_foto_perfil && formData.url_foto_perfil.length > 0) {
            // formData.url_foto_perfil[0] es el archivo real
            data.append("url_foto_perfil", formData.url_foto_perfil[0]);
        }

        // 4. Hacer la petición POST
        // Axios detecta el FormData y pone el header 'multipart/form-data' automáticamente
        const { data: response } = await clienteApi.post<RegisterResponse>('/register', data);

        return response;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            // Devolvemos el error que viene del backend (ej: "Email ya registrado")
            throw new Error(error.response.data.message || "Error al registrar");
        }
        throw new Error("Error de conexión con el servidor");
    }
}