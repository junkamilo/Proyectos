import { ArrowRight } from "lucide-react"
import { Link } from "react-router"


export const BotonVerMas = () => {
    return (
        <>
            <div className="mt-16 text-center">
                <Link
                    to="/catalogo"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-white font-bold text-base border-2 border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:border-emerald-200 dark:hover:border-emerald-800 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all duration-300 group hover:-translate-y-1"
                >
                    Ver Catálogo Completo
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-emerald-500" />
                </Link>
            </div>
        </>
    )
}
