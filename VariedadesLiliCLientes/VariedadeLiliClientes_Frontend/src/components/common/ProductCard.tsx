import { useProductCard, type Product } from '@/plantas/hooks/useProductCard'
import { Eye, Star, ShoppingCart, Check, Scaling } from 'lucide-react'
import { FavoriteButton } from '../ui/FavoriteButton'

// Aceptamos la prop viewMode (por defecto "grid")
export function ProductCard({ product, viewMode = "grid" }: { product: Product, viewMode?: string }) {

    const {
        isFavorite,
        isAdding,
        toggleFavorite,
        handleAddToCart,
        formattedPrice
    } = useProductCard(product)

    // Definimos si estamos en modo lista para usarlo en condicionales
    const isList = viewMode === "list";

    return (
        <div className={`
            group relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500 
            ${/* CAMBIO PRINCIPAL: Si es lista, usamos flex horizontal */""}
            ${isList ? 'flex flex-row h-52' : 'flex-col h-full hover:-translate-y-1'}
        `}>

            {/* --- 1. IMAGE CONTAINER --- */}
            <div className={`
                relative overflow-hidden bg-stone-100 dark:bg-slate-800
                ${/* CAMBIO IMAGEN: Ancho fijo en lista vs aspect ratio en grid */""}
                ${isList ? 'w-52 h-full shrink-0' : 'aspect-[4/5] w-full'}
            `}>
                <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Badge Nuevo */}
                <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                    {product.isNew && (
                        <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white bg-gradient-to-r from-lime-500 to-green-600 rounded-full shadow-lg shadow-lime-500/20 backdrop-blur-md">
                            Nuevo
                        </span>
                    )}
                </div>

                {/* Actions (Solo visibles en hover) */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10">
                    <FavoriteButton isFavorite={isFavorite} onClick={toggleFavorite} />
                    {/* Botón ver detalles (Eye) */}
                    <button className="p-2.5 rounded-full bg-white/80 backdrop-blur-xl border border-white/30 text-emerald-800 shadow-lg hover:bg-white hover:text-emerald-600 transition-all duration-300">
                        <Eye className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* --- 2. CONTENT --- */}
            <div className={`
                p-5 flex flex-col gap-2 flex-1 justify-center
                ${/* Ajuste de padding para lista */""}
                ${isList ? 'py-4' : ''}
            `}>

                {/* --- SECCIÓN DE ETIQUETAS --- */}
                <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                        {product.category || "Jardinería"}
                    </span>
                    <span className="text-slate-300">•</span>
                    {product.tamano && (
                        <span className="flex items-center gap-1 text-[10px] font-medium text-slate-500 uppercase tracking-wide bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                            <Scaling className="w-3 h-3" />
                            {product.tamano}
                        </span>
                    )}
                </div>

                {/* Título y Rating */}
                <div className="flex justify-between items-start gap-4">
                    <h3 className={`font-bold text-slate-800 dark:text-white leading-tight group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors ${isList ? 'text-xl' : 'text-lg line-clamp-1'}`}>
                        {product.name}
                    </h3>

                    {/* En modo lista movemos el rating aquí arriba para aprovechar espacio */}
                    {isList && (
                        <div className="flex items-center gap-1 shrink-0">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{product.rating || 4.5}</span>
                        </div>
                    )}
                </div>

                {/* Descripción (Solo visible en modo lista) */}
                {isList && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 mb-2">
                        {/* Si tienes descripción en tu producto, úsala aquí. Si no, un texto genérico o nada */}
                        {product.description || "Una hermosa adición para tu hogar. Ideal para interiores y exteriores, fácil de cuidar y muy resistente."}
                    </p>
                )}

                {/* Rating & Precio (Diseño original para Grid) */}
                {!isList && (
                    <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                {product.rating || 4.5}
                            </span>
                        </div>
                        <div className="text-xl font-extrabold text-slate-900 dark:text-white">
                            {formattedPrice}
                        </div>
                    </div>
                )}

                {/* Precio en modo lista (lo ponemos grande) */}
                {isList && (
                    <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                        {formattedPrice}
                    </div>
                )}


                {/* Espaciador para Grid */}
                {!isList && <div className="flex-1" />}

                {/* --- 3. ADD TO CART BUTTON --- */}
                <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className={`
                        py-3 rounded-xl font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 border
                        ${isList ? 'mt-auto w-fit px-8' : 'mt-4 w-full'} 
                        ${isAdding
                            ? "bg-emerald-100 text-emerald-700 border-emerald-200 shadow-none cursor-default"
                            : "bg-white text-slate-700 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:hover:bg-emerald-900/30 dark:hover:border-emerald-500"
                        }
                    `}
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