import { profileApi } from "../api/profile.api";

export const uploadProfileImage = async (userId: string | number, file: File) => {
    const formData = new FormData();
    formData.append("foto", file);

    try {
        const response = await profileApi.post(`/perfil/foto/${userId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Error al subir imagen");
    }
};