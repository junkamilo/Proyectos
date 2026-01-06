import { useEffect } from "react";
import { useShoppingCart } from "@/components/hooks/useShoppingCart";
import { ShoppingCart, X, Trash2, Minus, Plus, ArrowRight, Loader2 } from "lucide-react";

export default function ShoppingCartFeature() {
    const {
        isOpen,
        openCart,
        closeCart,
        cartItems,
        removeItem,
        updateQuantity,
        total,
        formatCurrency,
        isLoading,
        isUpdating,
        // 1. IMPORTANTE: Extraemos checkout e isCheckingOut del hook
        checkout,
        isCheckingOut
    } = useShoppingCart();

    // Bloqueo de scroll (tu código original)
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <>
            {/* BOTÓN DISPARADOR (Sin cambios) */}
            <button onClick={openCart} className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition-colors group">
                <ShoppingCart className="w-6 h-6" />
                {cartItems.length > 0 && (
                    <span className="absolute top-1 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white group-hover:scale-110 transition-transform">
                        {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                )}
            </button>

            {/* OVERLAY (Sin cambios) */}
            <div
                className={`fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={closeCart}
                aria-hidden="true"
            />

            {/* PANEL LATERAL */}
            <div
                className={`
                    fixed top-0 right-0 z-[70] h-full w-full sm:w-[450px] 
                    bg-white dark:bg-slate-900 shadow-2xl 
                    border-l border-slate-100 dark:border-slate-800 flex flex-col 
                    transform transition-all duration-500 ease-in-out
                    ${isOpen ? 'translate-x-0 visible opacity-100' : 'translate-x-full invisible opacity-0'}
                `}
            >

                {/* Header (Sin cambios) */}
                <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
                    <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                        Tu Carrito
                        {isUpdating && <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />}
                    </h2>
                    <button onClick={closeCart} className="p-2 hover:bg-slate-100 rounded-full"><X className="w-6 h-6" /></button>
                </div>

                {/* CONTENIDO (Sin cambios) */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-40">
                            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
                        </div>
                    ) : cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60">
                            <ShoppingCart className="w-16 h-16 text-slate-300" />
                            <p className="font-medium">Tu carrito está vacío</p>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4 group animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="w-24 h-24 flex-shrink-0 bg-stone-100 rounded-2xl overflow-hidden border border-slate-200">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-sm line-clamp-2 dark:text-white">{item.name}</h3>
                                            <button onClick={() => removeItem(item.id)} disabled={isUpdating} className="text-slate-400 hover:text-rose-500 disabled:opacity-50">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
                                            <button onClick={() => updateQuantity(item.id, -1)} disabled={item.quantity <= 1 || isUpdating} className="w-6 h-6 flex items-center justify-center bg-white dark:bg-slate-700 rounded shadow-sm hover:text-emerald-600 disabled:opacity-50">
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="text-sm font-bold w-4 text-center dark:text-white">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)} disabled={isUpdating} className="w-6 h-6 flex items-center justify-center bg-white dark:bg-slate-700 rounded shadow-sm hover:text-emerald-600 disabled:opacity-50">
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <p className="font-extrabold text-emerald-700 dark:text-emerald-400 text-sm">
                                            {formatCurrency(item.price * item.quantity)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* FOOTER (Totales) */}
                {cartItems.length > 0 && (
                    <div className="p-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                        <div className="flex justify-between text-lg font-black text-slate-900 dark:text-white pt-4">
                            <span>Total</span>
                            <span>{formatCurrency(total)}</span>
                        </div>

                        {/* 2. AQUÍ ESTABA EL ERROR: Agregamos onClick y disabled */}
                        <button
                            onClick={checkout} // Conectamos la función checkout
                            disabled={isCheckingOut || isUpdating} // Deshabilitar si está cargando
                            className="w-full mt-4 py-4 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
                        >
                            {isCheckingOut ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" /> Procesando...
                                </>
                            ) : (
                                <>
                                    Finalizar Compra <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}