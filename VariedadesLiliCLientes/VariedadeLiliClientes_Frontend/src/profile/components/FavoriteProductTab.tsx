import { useEffect, useState } from "react";
import { Heart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { FavoriteCard } from "./FavoriteCard";
import type { FavoriteProduct } from "../types/get-response-favorite";
import { getFavoriteProduct } from "../action/favorite-producto.service";

export const FavoritesProduct = ({ userId }: { userId: string | number }) => {
    const [items, setItems] = useState<FavoriteProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWishlist = async () => {
            if (!userId) return;
            setLoading(true);
            const data = await getFavoriteProduct(userId);
            setItems(data);
            setLoading(false);
        };
        fetchWishlist();
    }, [userId]);

    if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-emerald-600" /></div>;

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
                <Heart className="w-16 h-16 mb-4 text-slate-300 fill-slate-100" />
                <h3 className="text-xl font-semibold text-slate-900">Tu lista está vacía</h3>
                <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white">Explorar Productos</Button>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Lista de Deseos</h2>
                <span className="text-sm text-muted-foreground">{items.length} productos guardados</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {items.map((product) => (
                    // 👇 Aquí usamos el componente independiente
                    <FavoriteCard 
                        key={product.id_favorito} 
                        product={product} 
                        userId={userId} 
                    />
                ))}
            </div>
        </div>
    );
};