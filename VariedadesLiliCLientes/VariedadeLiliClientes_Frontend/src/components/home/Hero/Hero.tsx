import { BadgeTitulo } from "./BadgeTitulo";
import { TituloPrincipal } from "./TituloPrincipal";
import { Botones } from "./Botones";
import { Indicators } from "./IndicaTors";
import { ImageContent } from "./Image";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-10 pb-20 lg:pt-20 lg:pb-32">

            {/* Reemplazamos morados por verdes y limas para dar sensación de naturaleza */}
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* --- CONTENIDO DE TEXTO --- */}
                    <div className="space-y-8 max-w-2xl">

                        {/* Badge Superior (Estilo Orgánico) */}
                        <BadgeTitulo titulo="Colección Primavera 2025" />

                        {/* Título Principal (Gradiente Naturaleza) */}
                        <TituloPrincipal
                            tituloPrincipal="Variedades"
                            tituloSecundario="Lili"
                            description="Descubre nuestra selección exclusiva de plantas, materos artesanales, alcancias de ceramica para tus ahorros y abono para el cuidado de tus plantas"
                        />


                        {/* Botones de Acción */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <Botones />
                        </div>

                        {/* Stats / Trust Indicators */}
                        <div className="flex items-center gap-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                            <Indicators />
                        </div>
                    </div>

                    {/* --- IMAGEN HERO (Lado Derecho) --- */}
                    <ImageContent />
                </div>
            </div>
        </section>
    );
}