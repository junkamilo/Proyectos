import { useState, useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner' // Asegúrate de tener instalada esta librería (o la que uses para notificaciones)

// Tu utilidad de ID
import { getStoredUserId } from '@/profile/utils/auth-storage'
import { getCartItemsAction, removeCartItemAction, updateCartQuantityAction } from '../actions/cartActions'

export const useShoppingCart = () => {
    // Estados Locales
    const [isOpen, setIsOpen] = useState(false)
    const [isCheckingOut, setIsCheckingOut] = useState(false) // Nuevo estado para carga del checkout

    // Hooks de librerías
    const queryClient = useQueryClient()
    const userId = getStoredUserId()

    // --- 1. FETCH DATA (React Query) ---
    const { data: cartItems = [], isLoading } = useQuery({
        queryKey: ['cart', userId], // Clave única por usuario
        queryFn: () => getCartItemsAction(userId!),
        enabled: !!userId, // Solo ejecuta si hay usuario logueado
        staleTime: 0, // Siempre datos frescos al abrir
    })

    // --- 2. ACCIONES (Mutaciones) ---

    // Eliminar Item
    const removeMutation = useMutation({
        mutationFn: removeCartItemAction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart', userId] })
            toast.success("Producto eliminado del carrito")
        },
        onError: () => {
            toast.error("Error al eliminar el producto")
        }
    })

    // Actualizar Cantidad
    const updateMutation = useMutation({
        mutationFn: updateCartQuantityAction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart', userId] })
        }
    })

    // --- 3. HANDLERS (Puente entre UI y Lógica) ---

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    const removeItem = (productId: number) => {
        if (!userId) return;
        removeMutation.mutate({ userId, productId })
    }

    const updateQuantity = (productId: number, delta: number) => {
        if (!userId) return;

        // Encontramos el item actual para saber su cantidad
        const item = cartItems.find(i => i.id === productId);
        if (!item) return;

        const newQuantity = item.quantity + delta;

        // Si baja de 1, no hacemos nada (o podrías eliminarlo si prefieres)
        if (newQuantity < 1) return;

        updateMutation.mutate({ userId, productId, quantity: newQuantity })
    }

    // --- 4. CHECKOUT (Nueva Funcionalidad) ---
    const checkout = async () => {
        if (!userId) {
            toast.error("Debes iniciar sesión para finalizar la compra.");
            return;
        }

        setIsCheckingOut(true); // Activa el loading del botón

        try {
            // Llamada al Endpoint que creamos en el backend
            const response = await fetch('http://localhost:3000/api/pedido/comprar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id_cliente: userId }),
            });

            const data = await response.json();

            if (!response.ok || data.error) {
                throw new Error(data.message || "Error al procesar la compra");
            }

            // ÉXITO
            toast.success("¡Compra realizada con éxito!", {
                description: `Pedido #${data.data.id_pedido} creado correctamente.`
            });

            // CRÍTICO: Invalidar la query del carrito. 
            // Como el backend ya borró la tabla Carrito_Compras, al invalidar, 
            // React Query volverá a pedir los datos y recibirá un array vacío [].
            await queryClient.invalidateQueries({ queryKey: ['cart', userId] });

            // Cerrar el carrito
            closeCart();

        } catch (error: any) {
            console.error("Checkout error:", error);
            toast.error(error.message || "Error de conexión al servidor");
        } finally {
            setIsCheckingOut(false); // Desactiva el loading
        }
    };

    // --- 5. CÁLCULOS ---
    const subtotal = useMemo(() => {
        return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    }, [cartItems])

    // Ajusta tus reglas de negocio (ej: envío gratis si > 100.000)
    const shippingCost = subtotal > 100000 ? 0 : 12000
    // Si el carrito está vacío, el envío debe ser 0
    const finalShippingCost = cartItems.length === 0 ? 0 : shippingCost;
    const total = subtotal + finalShippingCost

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            maximumFractionDigits: 0
        }).format(value)
    }

    // --- 6. RETORNO ---
    return {
        isOpen,
        isLoading, // Carga inicial de datos
        isCheckingOut, // Carga del proceso de compra (Spinner botón)
        isUpdating: updateMutation.isPending || removeMutation.isPending, // Carga de acciones pequeñas
        openCart,
        closeCart,
        cartItems,
        removeItem,
        updateQuantity,
        checkout, // <--- Nueva función expuesta
        subtotal,
        shippingCost: finalShippingCost,
        total,
        formatCurrency,
    }
}