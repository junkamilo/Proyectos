import { useFeaturedProducts } from "../../hooks/useFeaturedProducts"
import { ProductCard } from "@/components/common/ProductCard"
import { SectionHeader } from "./HeaderContent"
import { BotonVerMas } from "./Boton"



export default function FeaturedProducts() {

    // Obtenemos los datos limpiamente
    const { products } = useFeaturedProducts()

    return (
        <section id="productos-destacados" className="relative py-20 lg:py-32 bg-stone-50 dark:bg-slate-950/50 overflow-hidden">

            {/* --- DECORACIÓN DE FONDO (Natural / Bosque) --- */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl mx-auto overflow-hidden pointer-events-none">
                {/* Mancha superior izquierda: Verde Esmeralda */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-200/20 dark:bg-emerald-900/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-normal" />
                {/* Mancha inferior derecha: Verde Lima (Luz solar) */}
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-lime-200/20 dark:bg-lime-900/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-normal" />
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">

                {/* --- HEADER DE SECCIÓN --- */}
                <SectionHeader/>

                {/* --- GRID DE PRODUCTOS --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* --- BOTÓN VER TODO --- */}
                <BotonVerMas/>

            </div>
        </section>
    )
}