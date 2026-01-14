import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getUserProfile, updateUserProfile } from "../action/getUserProfile";

import { getStoredUserId } from "../utils/auth-storage";

export const useGeneralProfile = () => {
    const userId = getStoredUserId();
    const queryClient = useQueryClient();

    // Estado del formulario
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        telefono: ""
    });

    const [email, setEmail] = useState(""); // El email es read-only, lo guardamos aparte

    // 1. Fetch Data
    const { data: cliente, isLoading, isError } = useQuery({
        queryKey: ['user-profile', userId],
        queryFn: () => getUserProfile(userId!),
        enabled: !!userId,
    });

    // 2. Sincronizar datos cuando llegan del backend
    useEffect(() => {
        if (cliente) {
            const nombreCompleto = cliente.nombre_completo || "";
            const partes = nombreCompleto.split(" ");
            const primerNombre = partes[0] || "";
            const restoApellido = partes.slice(1).join(" ") || "";

            setFormData({
                nombre: primerNombre,
                apellido: restoApellido,
                telefono: cliente.telefono || ""
            });
            setEmail(cliente.email || "");
        }
    }, [cliente]);

    // 3. Mutation para actualizar
    const updateMutation = useMutation({
        mutationFn: (data: typeof formData) => updateUserProfile(userId!, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user-profile', userId] });
            toast.success("Perfil actualizado correctamente");
        },
        onError: (err: any) => {
            toast.error(err.message || "Error al actualizar");
        }
    });

    // Handlers
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSave = () => {
        updateMutation.mutate(formData);
    };

    return {
        // Datos
        formData,
        email,
        isLoading,
        isError,
        isSaving: updateMutation.isPending,
        
        // Acciones
        handleChange,
        handleSave
    };
};