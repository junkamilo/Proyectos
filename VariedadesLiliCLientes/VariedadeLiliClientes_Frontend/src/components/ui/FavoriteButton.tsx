import { Heart } from "lucide-react";
import type { MouseEvent } from "react";

interface FavoriteButtonProps {
    isFavorite: boolean;
    onClick: (e: MouseEvent) => void;
    className?: string; // Para poder añadirle clases extra si hace falta
}

export const FavoriteButton = ({ isFavorite, onClick, className = "" }: FavoriteButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`p-2.5 rounded-full backdrop-blur-xl border border-white/30 shadow-lg transition-all duration-300 group/fav ${isFavorite
                    ? "bg-white text-rose-500 fill-rose-500 scale-110"
                    : "bg-white/80 text-emerald-800 hover:bg-white hover:text-emerald-600 hover:scale-110"
                } ${className}`}
            title={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
        >
            <Heart
                className={`w-5 h-5 transition-transform duration-300 ${isFavorite ? "fill-current animate-pulse-once" : ""
                    }`}
            />
        </button>
    );
};