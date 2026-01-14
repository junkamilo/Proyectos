import { profileApi } from "../api/profile.api";
import type { FavoriteProduct } from "../types/get-response-favorite";

export const getFavoriteProduct = async (userId: string | number): Promise<FavoriteProduct[]> => {
    try {
        // Ajusta la ruta según cómo registraste el router en el backend
        const response = await profileApi.get(`/favoritos/${userId}`);
        return response.data.data; // Asumiendo estructura { status: 'success', data: [...] }
    } catch (error) {
        console.error("Error wishlist:", error);
        return [];
    }
};


export const addToWishlist = async (userId: number | string, productId: number | string) => {
    try {
        const response = await profileApi.post(`/favoritos/${userId}`, {
            id_producto: productId
        });
        return response.data;
    } catch (error: any) {
        // Si ya existe (409), el backend devuelve un mensaje, lo lanzamos para mostrarlo en un Toast
        throw new Error(error.response?.data?.message || "Error al agregar");
    }
};