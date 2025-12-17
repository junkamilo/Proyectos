import { Sprout, Sun } from "lucide-react"
import { useState } from "react"

export const SidebarFilters = () => {

    const [showFilters, setShowFilters] = useState(true)
    const [filterDifficulty, setFilterDifficulty] = useState<string>("todo")
    const [filterLight, setFilterLight] = useState<string>("todo")
    const [priceRange, setPriceRange] = useState([0, 200000])

    return (
        <aside className={`lg:col-span-1 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-emerald-100 dark:border-slate-800 shadow-sm sticky top-36">

                {/* Filtro: Dificultad */}
                <div className="mb-8">
                    <h4 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                        <Sprout className="w-4 h-4 text-emerald-500" /> Nivel de Cuidado
                    </h4>
                    <div className="space-y-2.5">
                        {["todo", "Fácil", "Medio", "Difícil"].map((level) => (
                            <label key={level} className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${filterDifficulty === level
                                    ? 'bg-emerald-500 border-emerald-500'
                                    : 'border-slate-300 dark:border-slate-700 bg-transparent group-hover:border-emerald-400'}`}>
                                    {filterDifficulty === level && <div className="w-2 h-2 bg-white rounded-full" />}
                                </div>
                                <input type="radio" name="difficulty" value={level} checked={filterDifficulty === level} onChange={(e) => setFilterDifficulty(e.target.value)} className="hidden" />
                                <span className={`text-sm ${filterDifficulty === level ? 'font-semibold text-emerald-700 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-400'}`}>
                                    {level === "todo" ? "Todos los niveles" : level}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Filtro: Luz */}
                <div className="mb-8">
                    <h4 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                        <Sun className="w-4 h-4 text-amber-500" /> Iluminación
                    </h4>
                    <div className="flex flex-col gap-2">
                        {["todo", "Sombra", "Sombra parcial", "Luz indirecta", "Luz directa"].map((light) => (
                            <button
                                key={light}
                                onClick={() => setFilterLight(light)}
                                className={`px-3 py-2 text-xs font-medium rounded-lg border text-left transition-all flex items-center justify-between ${filterLight === light
                                    ? "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800"
                                    : "bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"}`}
                            >
                                {light === "todo" ? "Cualquier luz" : light}
                                {filterLight === light && <div className="w-2 h-2 rounded-full bg-amber-500" />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Filtro: Precio */}
                <div>
                    <div className="flex justify-between mb-2">
                        <h4 className="font-bold text-slate-800 dark:text-white text-sm">Rango de Precio</h4>
                        <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                            ${priceRange[1].toLocaleString()}
                        </span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="200000"
                        step="5000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-full h-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                </div>
            </div>
        </aside>
    )
}
