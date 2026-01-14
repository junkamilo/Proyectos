import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ShoppingCart, Trash2, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Importamos la acción de carrito existente

// Importamos tipos
import { addToCartAction } from "@/plantas/actions/cartActions";
import type { FavoriteProduct } from "../types/get-response-favorite";

// Helpers
const formatPrice = (price: number) => 
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(price);

const fixImgUrl = (path?: string) => {
    if (!path) return "/placeholder.svg";
    if (path.startsWith("http")) return path;
    return `http://localhost:3000${path}`;
};

interface WishlistCardProps {
    product: FavoriteProduct;
    userId: string | number;
}

export const FavoriteCard = ({ product, userId }: WishlistCardProps) => {
    const queryClient = useQueryClient();
    const [isSuccess, setIsSuccess] = useState(false);

    // --- MUTACIÓN: AGREGAR AL CARRITO ---
    const cartMutation = useMutation({
        mutationFn: addToCartAction,
        onSuccess: () => {
            // 1. Actualizar contador del carrito
            queryClient.invalidateQueries({ queryKey: ['cart-count'] });
            
            // 2. Feedback visual temporal (Check verde)
            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), 2000);

            // 3. Notificación
            toast.success("¡Agregado!", {
                description: `${product.nombre_producto} ya está en tu carrito.`
            });
        },
        onError: () => {
            toast.error("Error al agregar al carrito");
        }
    });

    const handleAddToCart = () => {
        if (product.stock <= 0) return;

        cartMutation.mutate({
            id_cliente: userId,
            id_producto: product.id_producto, // Nota: en WishlistService viene como id_producto
            cantidad: 1
        });
    };

    // (Opcional) Aquí podrías agregar también la mutación para eliminar de favoritos

    return (
        <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-800">
            <CardContent className="p-0 flex">
                {/* Imagen */}
                <div className="w-32 h-32 sm:w-40 sm:h-auto relative bg-slate-100 shrink-0">
                    <img 
                        src={fixImgUrl(product.url_foto_producto)} 
                        alt={product.nombre_producto} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {product.stock <= 0 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white text-xs font-bold px-2 py-1 bg-red-600 rounded">Agotado</span>
                        </div>
                    )}
                </div>

                {/* Info y Acciones */}
                <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white line-clamp-2 leading-tight mb-1">
                            {product.nombre_producto}
                        </h3>
                        <p className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
                            {formatPrice(product.precio)}
                        </p>
                    </div>

                    <div className="flex gap-2 mt-3">
                        {/* ✅ BOTÓN DE COMPRAR IMPLEMENTADO */}
                        <Button 
                            size="sm" 
                            onClick={handleAddToCart}
                            disabled={product.stock <= 0 || cartMutation.isPending || isSuccess}
                            className={`
                                flex-1 gap-2 text-xs transition-all duration-300
                                ${isSuccess 
                                    ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border border-emerald-200" 
                                    : "bg-slate-900 text-white hover:bg-emerald-600"
                                }
                            `} 
                        >
                            {cartMutation.isPending ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : isSuccess ? (
                                <Check className="w-3.5 h-3.5" />
                            ) : (
                                <ShoppingCart className="w-3.5 h-3.5" />
                            )}
                            
                            {cartMutation.isPending 
                                ? "Agregando..." 
                                : isSuccess 
                                    ? "¡Listo!" 
                                    : product.stock > 0 ? "Comprar" : "Sin Stock"
                            }
                        </Button>
                        
                        <Button size="icon" variant="outline" className="border-slate-200 text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-100">
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};