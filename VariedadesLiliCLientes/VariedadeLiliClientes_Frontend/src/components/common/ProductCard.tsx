import { Heart, Eye, Star, ShoppingCart, Check } from 'lucide-react'
import { useProductCard, type Product } from '../hooks/useProductCard'

// Importamos la lógica y la interfaz


// Exportamos la función nombrada para mejor tree-shaking
export function ProductCard({ product }: { product: Product }) {

    // Extraemos todo del hook
    const {
        isFavorite,
        isAdding,
        toggleFavorite,
        handleAddToCart,
        formattedPrice
    } = useProductCard(product)

    return (
        <div className="group relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500 hover:-translate-y-1 h-full flex flex-col">

            {/* --- 1. IMAGE CONTAINER (Aspecto Natural) --- */}
            <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 dark:bg-slate-800">
                <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Overlay sutil verde al hacer hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* --- BADGES (Etiquetas Orgánicas) --- */}
                <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                    {product.isNew && (
                        <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white bg-gradient-to-r from-lime-500 to-green-600 rounded-full shadow-lg shadow-lime-500/20 backdrop-blur-md">
                            Nuevo
                        </span>
                    )}
                </div>

                {/* --- FLOATING ACTIONS (Botones Glass) --- */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10">
                    <button
                        onClick={toggleFavorite}
                        className={`p-2.5 rounded-full backdrop-blur-xl border border-white/30 shadow-lg transition-all duration-300 ${isFavorite
                                ? "bg-white text-rose-500 fill-rose-500"
                                : "bg-white/80 text-emerald-800 hover:bg-white hover:text-emerald-600"
                            }`}
                        title="Añadir a favoritos"
                    >
                        <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
                    </button>

                    <button
                        className="p-2.5 rounded-full bg-white/80 backdrop-blur-xl border border-white/30 text-emerald-800 shadow-lg hover:bg-white hover:text-emerald-600 transition-all duration-300"
                        title="Vista rápida"
                    >
                        <Eye className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* --- 2. CONTENT (Información Botánica) --- */}
            <div className="p-5 flex flex-col gap-2 flex-1">
                {/* Categoría (Verde Bosque) */}
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                    {product.category || "Jardinería"}
                </span>

                {/* Título */}
                <h3 className="font-bold text-slate-800 dark:text-white text-lg leading-tight line-clamp-1 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    {product.name}
                </h3>

                {/* Rating & Precio Row */}
                <div className="flex items-center justify-between mt-1">
                    {/* Estrellas (Amarillo Girasol) */}
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                            {product.rating || 4.5}
                        </span>
                    </div>

                    {/* Precio Formateado desde el Hook */}
                    <div className="text-xl font-extrabold text-slate-900 dark:text-white">
                        {formattedPrice}
                    </div>
                </div>

                {/* Espaciador para empujar el botón al fondo si el título es corto */}
                <div className="flex-1" />

                {/* --- 3. ADD TO CART BUTTON (Acción Natural) --- */}
                <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className={`mt-4 w-full py-3 rounded-xl font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 border ${isAdding
                            ? "bg-emerald-100 text-emerald-700 border-emerald-200 shadow-none cursor-default"
                            : "bg-white text-slate-700 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:hover:bg-emerald-900/30 dark:hover:border-emerald-500"
                        }`}
                >
                    {isAdding ? (
                        <>
                            <Check className="w-5 h-5 animate-bounce-subtle" />
                            <span>¡En la maceta!</span>
                        </>
                    ) : (
                        <>
                            <ShoppingCart className="w-5 h-5" />
                            <span>Añadir al Carrito</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}