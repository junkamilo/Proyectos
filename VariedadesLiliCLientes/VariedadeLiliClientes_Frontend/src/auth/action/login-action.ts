import { clienteApi } from "../api/api-register";
import { isAxiosError } from "axios";
import type { LoginFormData } from "../types/LoginFormData";
import type { AuthResponse } from "../types/LoginResponse";

export const loginUser = async (credentials: LoginFormData): Promise<AuthResponse> => {
    try {
        const { data } = await clienteApi.post<AuthResponse>('/login', credentials);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || "Credenciales incorrectas");
        }
        throw new Error("Error de conexión con el servidor");
    }
}