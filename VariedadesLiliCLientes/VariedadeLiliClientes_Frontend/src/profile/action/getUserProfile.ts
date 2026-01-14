import { profileApi } from "../api/profile.api"; // Tu configuración de Axios
import type { APIResponse, Cliente } from "../types/get-response-cliente";


export const getUserProfile = async (id: string | number): Promise<Cliente> => {

    // Validamos que haya ID
    if (!id) throw new Error("ID de usuario requerido");

    try {
        // Hacemos la petición a /api/10
        // Axios devuelve: { data: { status: "success", data: { ...cliente } }, status: 200, ... }
        const response = await profileApi.get<APIResponse>(`/${id}`);

        // Extraemos el cuerpo del JSON (lo que tú viste en el navegador)
        const jsonBody = response.data;
        
        

        // Verificamos si el status es 'success' (basado en tu JSON)
        if (jsonBody.status === 'success' && jsonBody.data) {
            
            return jsonBody.data;
        }

        throw new Error(jsonBody.message || "Error al obtener el cliente");

    } catch (error: any) {
        console.error("❌ Error en getUserProfile:", error);
        throw new Error(error.message);
    }
};

export const updateUserProfile = async (userId: string | number, data: { nombre: string, apellido: string, telefono: string }) => {
    try {
        const response = await profileApi.patch(`/perfil/${userId}`, data);
        return response.data;
    } catch (error: any) {
        console.error("Error updating profile:", error);
        throw new Error(error.response?.data?.message || "Error al actualizar");
    }
};