import { useState } from 'react'
import type { MouseEvent } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { addToCartAction } from '../actions/cartActions'
import { getStoredUserId } from '@/profile/utils/auth-storage';
import { toast } from 'sonner';

// Interfaz del producto
export interface Product {
    id: string | number;
    name: string;
    price: number;
    image: string;
    category?: string;
    rating?: number;
    isNew?: boolean;
    tamano?: string;
    material?: string;
    description?: string;
}

export const useProductCard = (product: Product) => {
    // 1. ESTADOS LOCALES
    const [isFavorite, setIsFavorite] = useState(false)
    // El isAdding ahora lo podemos manejar combinado con la mutación, 
    // pero mantendremos el local para controlar animaciones específicas si quieres.

    const queryClient = useQueryClient();
    const userId = getStoredUserId();

    // 2. CONFIGURACIÓN DE LA MUTACIÓN (React Query)
    const mutation = useMutation({
        mutationFn: addToCartAction,
        onSuccess: () => {
            // A. Refrescar el carrito global (si tienes un contador en el navbar)
            queryClient.invalidateQueries({ queryKey: ['cart-count'] });

            // B. Feedback visual (Opcional: aquí podrías lanzar un Toast/Notificación)
            console.log("✅ Producto añadido al carrito real!");

            toast.success(`${product.name} añadido`, {
                description: "Producto agregado al carrito",
                duration: 3000,
            });
        },
        onError: (error) => {
            console.error("❌ Error al añadir:", error);
            // Aquí deberías mostrar un mensaje de error al usuario
            alert("Error al agregar producto. Intenta nuevamente.");
        }
    });

    // 3. HANDLERS
    const toggleFavorite = (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsFavorite((prev) => !prev)

        // Opcional: Alerta para favoritos también
        if (!isFavorite) {
            toast("Añadido a favoritos", {
                icon: '❤️',
                className: 'border-rose-200'
            });
        }
    }

    const handleAddToCart = (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (!userId) {
            // Alerta de error si no hay usuario
            toast.warning("Inicia sesión", {
                description: "Debes ingresar a tu cuenta para comprar.",
                action: {
                    label: 'Ir al Login',
                    onClick: () => window.location.href = '/login'
                }
            });
            return;
        }

        mutation.mutate({
            id_cliente: userId,
            id_producto: product.id,
            cantidad: 1
        });
    }

    // 4. UTILIDADES
    const formattedPrice = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0
    }).format(product.price)

    return {
        isFavorite,
        // Usamos el estado de carga real de React Query
        isAdding: mutation.isPending,
        toggleFavorite,
        handleAddToCart,
        formattedPrice
    }
}