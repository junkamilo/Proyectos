import { Search } from "lucide-react"

export const Buscador = () => {
    return (
        <div className="hidden md:flex flex-1 max-w-xl relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
            </div>
            <input
                type="text"
                placeholder="Buscar plantas, macetas, abono..."
                className="w-full h-11 pl-11 pr-4 rounded-full bg-slate-100 dark:bg-slate-900 border-2 border-transparent focus:bg-white dark:focus:bg-slate-950 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all duration-300 text-sm font-medium placeholder:text-slate-400 text-slate-700 dark:text-slate-200"
            />
        </div>
    )
}
