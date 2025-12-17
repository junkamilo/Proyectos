import { useState, useMemo } from 'react'

export interface CartItem {
    id: number
    name: string
    price: number
    image: string
    category: string
    quantity: number
}

export const useShoppingCart = () => {
    const [isOpen, setIsOpen] = useState(false) // Controla si el modal es visible

    // --- MOCK DATA (Productos agregados) ---
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: 1,
            name: "Planta Monstera Deliciosa",
            price: 45900,
            image: "https://images.unsplash.com/photo-1614594975525-e45852b82481?auto=format&fit=crop&q=80&w=200",
            category: "Plantas",
            quantity: 1
        },
        {
            id: 2,
            name: "Maceta Cerámica Nórdica",
            price: 24900,
            image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=200",
            category: "Materos",
            quantity: 2
        },
        {
            id: 3,
            name: "Abono Orgánico Premium",
            price: 18900,
            image: "https://images.unsplash.com/photo-1628676343105-d3cb0bb89a07?auto=format&fit=crop&q=80&w=200",
            category: "Abono",
            quantity: 1
        }
    ])

    // --- ACCIONES ---
    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    const removeItem = (id: number) => {
        setCartItems(prev => prev.filter(item => item.id !== id))
    }

    const updateQuantity = (id: number, delta: number) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                const newQuantity = Math.max(1, item.quantity + delta)
                return { ...item, quantity: newQuantity }
            }
            return item
        }))
    }

    // --- CÁLCULOS ---
    const subtotal = useMemo(() => {
        return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    }, [cartItems])

    const shippingCost = subtotal > 50000 ? 0 : 8000 // Envío gratis > 50k
    const total = subtotal + shippingCost

    // Formateador de moneda
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            maximumFractionDigits: 0
        }).format(value)
    }

    return {
        isOpen,
        openCart,
        closeCart,
        cartItems,
        removeItem,
        updateQuantity,
        subtotal,
        shippingCost,
        total,
        formatCurrency
    }
}