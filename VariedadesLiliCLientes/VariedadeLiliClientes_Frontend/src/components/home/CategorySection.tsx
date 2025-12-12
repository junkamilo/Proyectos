import { Link } from 'react-router'
import { ArrowRight, Leaf } from "lucide-react"

// Componentes UI
// Asegúrate de la ruta correcta
import { useCategoriesSection } from '../hooks/useCategoriesSection'
import { ProductCard } from '@/components/common/ProductCard'

// Nuestra lógica separada


export default function CategoriesSection() {

    // Obtenemos toda la data lista para pintar
    const { categories } = useCategoriesSection()

    return (
        <section id="categorias" className="relative py-24 bg-white dark:bg-slate-950">

            {/* Elemento Decorativo: Línea de Tallo */}
            <div className="absolute left-8 md:left-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-emerald-200 dark:via-emerald-900 to-transparent hidden xl:block" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-32">
                {categories.map((category, index) => (
                    <div key={category.id} className="relative group/section">

                        {/* Hoja decorativa en la línea del tallo */}
                        <div className="absolute -left-[3.25rem] top-12 hidden xl:flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-500">
                            <Leaf className="w-3 h-3" />
                        </div>

                        {/* --- HEADER DE CATEGORÍA --- */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                            <div className="flex items-start gap-5">
                                {/* Caja de Icono Dinámica */}
                                <div className={`p-4 rounded-2xl ${category.bgIcon} ${category.color} shadow-sm transition-transform duration-500 hover:rotate-3`}>
                                    <category.icon className="w-8 h-8" />
                                </div>

                                <div className="space-y-1">
                                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                        {category.name}
                                    </h2>
                                    <p className="text-slate-500 dark:text-slate-400 font-medium text-lg max-w-lg leading-relaxed">
                                        {category.description}
                                    </p>
                                </div>
                            </div>

                            {/* Botón Ver Todo */}
                            <Link
                                to={`/${category.id}`}
                                className={`group/btn flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm border-2 bg-transparent transition-all duration-300 ${category.borderBtn} ${category.textBtn}`}
                            >
                                Ver colección
                                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                            </Link>
                        </div>

                        {/* --- GRID DE PRODUCTOS --- */}
                        {category.isLoading ? (
                            // SKELETON LOADING
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="h-[400px] bg-slate-100 dark:bg-slate-800 rounded-3xl animate-pulse" />
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {category.products.length > 0 ? (
                                    category.products.map((product: any) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))
                                ) : (
                                    <div className="col-span-4 text-center py-10 text-slate-400">
                                        No hay productos destacados en esta categoría aún.
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Separador Orgánico (Excepto el último) */}
                        {index !== categories.length - 1 && (
                            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-full max-w-sm h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}