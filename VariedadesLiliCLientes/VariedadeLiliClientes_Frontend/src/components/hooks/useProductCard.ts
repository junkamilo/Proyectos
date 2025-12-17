import { useState } from 'react'
import type { MouseEvent } from 'react'

// Definimos la interfaz del producto aquí para reutilizarla
export interface Product {
    id: string | number;
    name: string;
    price: number;
    image: string; // <-- TypeScript ahora sabe que esto SIEMPRE existirá
    category?: string;
    rating?: number;
    isNew?: boolean;
    // Agrega aquí las propiedades específicas de tus plantas si las necesitas
    light?: string;
    difficulty?: string;
    type?: string;
}

export const useProductCard = (product: Product) => {
    // 1. ESTADOS LOCALES
    const [isFavorite, setIsFavorite] = useState(false)
    const [isAdding, setIsAdding] = useState(false)

    // 2. HANDLERS
    const toggleFavorite = (e: MouseEvent) => {
        e.preventDefault() // Evita que el Link del padre se active
        e.stopPropagation()
        setIsFavorite((prev) => !prev)
    }

    const handleAddToCart = (e: MouseEvent) => {
        e.preventDefault() // Evita navegación si está dentro de un Link
        e.stopPropagation()

        setIsAdding(true)

        // Simulación de añadir al carrito (aquí llamarías a tu CartContext)
        setTimeout(() => {
            setIsAdding(false)
        }, 1500)
    }

    // 3. UTILIDADES (Formateo)
    // Centralizamos el formato de moneda para que sea consistente
    const formattedPrice = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0
    }).format(product.price)

    return {
        isFavorite,
        isAdding,
        toggleFavorite,
        handleAddToCart,
        formattedPrice
    }
}