import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getStoredUserId, clearSession } from "../utils/auth-storage";
import { getUserProfile } from "../action/getUserProfile";
// Verifica la ruta de importación

// 1. DEFINIMOS LA URL DEL BACKEND FIJA (Para asegurar que funcione)
const BACKEND_URL = 'http://localhost:3000';

export const useUserProfile = () => {
    const userId = getStoredUserId();

    const query = useQuery({
        queryKey: ['user-profile', userId],
        queryFn: () => getUserProfile(userId!),
        enabled: !!userId,
        staleTime: 1000 * 60 * 10,
        retry: 1
    });

    const userProfile = useMemo(() => {
        if (!query.data) return null;
        const cliente = query.data;

        // 2. LÓGICA DE URL ABSOLUTA
        let finalAvatarUrl = undefined;

        if (cliente.url_foto_perfil) {
            // Si la URL ya empieza con http (ej: Google Auth, url externa), la dejamos igual
            if (cliente.url_foto_perfil.startsWith('http')) {
                finalAvatarUrl = cliente.url_foto_perfil;
            }
            // Si es relativa (/uploads...), LE PEGAMOS EL DOMINIO DEL BACKEND
            else {
                finalAvatarUrl = `${BACKEND_URL}${cliente.url_foto_perfil}`;
            }
        }

        return {
            name: cliente.nombre_completo,
            email: cliente.email,
            avatar: finalAvatarUrl, // <--- Pasamos la URL absoluta
            initials: cliente.nombre_completo
                ? cliente.nombre_completo.substring(0, 2).toUpperCase()
                : "US",
            tier: "Miembro Premium",
            isActive: cliente.estado === 'activo',
            stats: {
                orders: 12,
                memberSince: cliente.fecha_registro
                    ? new Date(cliente.fecha_registro).getFullYear().toString()
                    : new Date().getFullYear().toString()
            }
        };
    }, [query.data]);

    return {
        user: userProfile,
        isLoading: query.isLoading,
        isError: query.isError,
        hasNoSession: !userId,
        logout: clearSession
    };
};