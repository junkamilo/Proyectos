import { Leaf, Sparkles } from "lucide-react"

export const ImageContent = () => {
    return (
        <div className="relative lg:h-[600px] w-full flex items-center justify-center lg:justify-end group">

            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-[2.5rem] rotate-3 scale-95 opacity-60 blur-sm transition-transform duration-500 group-hover:rotate-6" />

            {/* --- CONTENEDOR DE LA IMAGEN PRINCIPAL --- */}
            <div className="relative w-full h-[400px] lg:h-[550px] rounded-[2rem] overflow-hidden shadow-2xl shadow-emerald-900/10 border-4 border-white dark:border-slate-800">

                <img
                    src="https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&q=80&w=1000"
                    alt="Jardín interior moderno con plantas Variedades Lili"
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                    loading="lazy"
                />

                {/* Overlay Sutil (Gradiente verde abajo para integrar la imagen con el diseño) */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 via-transparent to-transparent opacity-60" />
            </div>

            {/* --- ELEMENTO FLOTANTE 1: BADGE DE CULTIVO --- */}
            <div className="absolute -left-4 top-10 md:top-20 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl shadow-xl shadow-emerald-900/10 border border-white/20 animate-bounce-subtle">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-green-100 dark:bg-green-900/30 rounded-xl text-green-700 dark:text-green-400">
                        <Leaf className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Cultivo</p>
                        <p className="text-sm font-bold text-slate-800 dark:text-white">100% Orgánico</p>
                    </div>
                </div>
            </div>

            {/* --- ELEMENTO FLOTANTE 2: OFERTA --- */}
            <div className="absolute -right-4 bottom-10 md:bottom-20 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl shadow-xl shadow-emerald-900/10 border border-white/20 hidden sm:block animate-float">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-amber-100 dark:bg-amber-900/30 rounded-xl text-amber-600 dark:text-amber-400">
                        <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Oferta</p>
                        <p className="text-sm font-bold text-slate-800 dark:text-white">Envío Gratis</p>
                    </div>
                </div>
            </div>

        </div>
    )
}
