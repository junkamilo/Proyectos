import { Leaf } from "lucide-react"

export const HeaderPlantas = () => {
    return (
        <div className="relative bg-emerald-50 dark:bg-emerald-900/20 border-b border-emerald-100 dark:border-emerald-900/30 pt-12 pb-16 px-4 md:px-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl translate-x-1/3 -translate-y-1/2" />
            <div className="absolute bottom-0 left-10 w-72 h-72 bg-lime-200/40 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="p-2 bg-emerald-600 text-white rounded-lg shadow-lg shadow-emerald-600/30">
                                <Leaf className="w-6 h-6" />
                            </span>
                            <span className="text-sm font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-300">
                                Vivero Natural
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            Plantas de <span className="text-emerald-600 dark:text-emerald-400">Interior</span>
                        </h1>
                        <p className="mt-4 text-slate-600 dark:text-slate-300 max-w-xl text-lg">
                            Purifica tu aire y relaja tu mente. Seleccionamos las especies más resistentes y hermosas para tu hogar.
                        </p>
                    </div>

                    {/* Estadísticas rápidas dinámicas */}
                    <div className="flex gap-8 text-slate-500 dark:text-slate-400">
                        <div className="text-center group">
                            <p className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                                3       
                            </p>
                            <p className="text-xs uppercase font-semibold">Disponibles</p>
                        </div>
                        <div className="w-px h-10 bg-emerald-200 dark:bg-emerald-800" />
                        <div className="text-center group">
                            <p className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">100%</p>
                            <p className="text-xs uppercase font-semibold">Orgánico</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
