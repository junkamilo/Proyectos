// src/components/Header/ShoppingCartFeature.tsx
import { useShoppingCart } from "@/components/hooks/useShoppingCart";
import { ShoppingCart, X, Trash2, Minus, Plus, ArrowRight, Leaf } from "lucide-react";



export default function ShoppingCartFeature() {
    // Obtenemos toda la lógica del hook
    const {
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
    } = useShoppingCart();

    return (
        <>
            {/* --- 1. BOTÓN DISPARADOR (El que se ve en el Header) --- */}
            <button
                onClick={openCart}
                className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition-colors group"
            >
                <ShoppingCart className="w-6 h-6" />

                {/* Badge de cantidad */}
                <span className="absolute top-1 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white group-hover:scale-110 transition-transform">
                    {cartItems.length}
                </span>
            </button>

            {/* --- 2. MODAL OVERLAY --- */}
            <div
                className={`fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={closeCart}
            />

            {/* --- 3. SLIDE-OVER PANEL --- */}
            <div
                className={`fixed top-0 right-0 z-[70] h-full w-full sm:w-[450px] bg-white dark:bg-slate-900 shadow-2xl transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) border-l border-slate-100 dark:border-slate-800 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Header del Carrito */}
                <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Tu Carrito</h2>
                        <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">
                            {cartItems.length} items
                        </span>
                    </div>
                    <button onClick={closeCart} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Contenido (Lista de productos) */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                                <ShoppingCart className="w-10 h-10 text-slate-400" />
                            </div>
                            <p className="text-lg font-bold">Tu carrito está vacío</p>
                            <button onClick={closeCart} className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700">
                                Seguir comprando
                            </button>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4 group">
                                <div className="w-24 h-24 flex-shrink-0 bg-stone-100 rounded-2xl overflow-hidden border border-slate-200">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-sm line-clamp-2">{item.name}</h3>
                                            <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-rose-500">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-1">{item.category}</p>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-1 border border-slate-200">
                                            <button onClick={() => updateQuantity(item.id, -1)} disabled={item.quantity <= 1} className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm disabled:opacity-50">
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm">
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <p className="font-extrabold text-emerald-700 text-sm">{formatCurrency(item.price * item.quantity)}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer del Carrito */}
                {cartItems.length > 0 && (
                    <div className="p-6 bg-slate-50 border-t border-slate-200">
                        <div className="mb-6">
                            {shippingCost === 0 ? (
                                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-100 p-2 rounded-lg justify-center">
                                    <Leaf className="w-3 h-3" /> ¡Envío GRATIS!
                                </div>
                            ) : (
                                <p className="text-[10px] text-slate-500 text-center">
                                    Faltan {formatCurrency(50000 - subtotal)} para envío gratis
                                </p>
                            )}
                        </div>
                        <div className="space-y-3 mb-6 text-sm">
                            <div className="flex justify-between text-slate-600">
                                <span>Subtotal</span>
                                <span className="font-medium text-slate-900">{formatCurrency(subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-slate-600">
                                <span>Envío</span>
                                <span className={shippingCost === 0 ? "text-emerald-600 font-bold" : ""}>
                                    {shippingCost === 0 ? "Gratis" : formatCurrency(shippingCost)}
                                </span>
                            </div>
                            <div className="flex justify-between text-lg font-black text-slate-900 pt-4 border-t border-slate-200">
                                <span>Total</span>
                                <span>{formatCurrency(total)}</span>
                            </div>
                        </div>
                        <button className="w-full py-4 rounded-xl bg-emerald-600 text-white font-bold text-lg hover:bg-emerald-700 flex items-center justify-center gap-2">
                            Finalizar Compra <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}