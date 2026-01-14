import { useState } from 'react'
import type { MouseEvent } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner' // Usamos Sonner para notificaciones bonitas

// Actions
import { addToCartAction } from '../actions/cartActions'


// Utils
import { getStoredUserId } from '@/profile/utils/auth-storage'
import { addToWishlist } from '@/profile/action/favorite-producto.service'

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
    const queryClient = useQueryClient();
    const userId = getStoredUserId(); // Obtenemos ID del usuario

    // Estado local visual (optimista)
    const [isFavorite, setIsFavorite] = useState(false);

    // --- A. MUTACIÓN: AGREGAR AL CARRITO (Existente) ---
    const cartMutation = useMutation({
        mutationFn: addToCartAction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart-count'] });
            toast.success(`${product.name} añadido al carrito`);
        },
        onError: () => {
            toast.error("Error al agregar al carrito");
        }
    });

    // --- B. MUTACIÓN: AGREGAR A FAVORITOS (Nueva) ---
    const wishlistMutation = useMutation({
        mutationFn: () => addToWishlist(userId!, product.id),
        onSuccess: () => {
            setIsFavorite(true); // Pintamos el corazón
            // Invalidamos la query de la pestaña de favoritos para que se actualice sola si el usuario va allá
            queryClient.invalidateQueries({ queryKey: ['user-wishlist', userId] }); 
            
            toast.success("¡Guardado!", {
                description: `${product.name} se añadió a tu lista de deseos.`,
                icon: '❤️'
            });
        },
        onError: (error: any) => {
            // Manejo especial: Si ya existe (409), no es un error grave
            if (error.response?.status === 409) {
                setIsFavorite(true); // Nos aseguramos que esté pintado
                toast.info("Ya está en tu lista", {
                    description: "Este producto ya lo habías guardado antes."
                });
            } else {
                console.error(error);
                toast.error("Error al guardar en favoritos");
                setIsFavorite(false); // Revertimos si falló
            }
        }
    });

    // --- HANDLERS ---

    const toggleFavorite = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!userId) {
            toast.warning("Inicia sesión", {
                description: "Necesitas una cuenta para guardar favoritos.",
                action: {
                    label: 'Login',
                    onClick: () => window.location.href = '/login'
                }
            });
            return;
        }

        // Ejecutamos la mutación
        // NOTA: Como actualmente solo tenemos endpoint de AGREGAR (POST), 
        // siempre intentamos agregar. Para quitar necesitaríamos un DELETE endpoint.
        if (!isFavorite) {
            wishlistMutation.mutate();
        } else {
            // Opcional: Si ya es favorito y le dan click, podrías mostrar un mensaje
            toast("Ya está en tus favoritos");
        }
    };

    const handleAddToCart = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!userId) {
            toast.warning("Inicia sesión para comprar");
            return;
        }

        cartMutation.mutate({
            id_cliente: userId,
            id_producto: product.id,
            cantidad: 1
        });
    };

    // --- FORMATO DE PRECIO ---
    const formattedPrice = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0
    }).format(product.price);

    return {
        isFavorite,
        isAdding: cartMutation.isPending,
        toggleFavorite,
        handleAddToCart,
        formattedPrice
    };
};