import { Leaf } from "lucide-react";

// 1. Tipos separados para mejor lectura
interface FeatureBadgeProps {
    emoji: string;
    title: string;
    subtitle: string;
}

interface AuthBannerProps {
    title?: React.ReactNode; 
    subtitle?: string;
    backgroundImage?: string;
}

    // 2. CONSTANTES: Datos estáticos fuera del render (o importados de un archivo de config/i18n)
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=1000";

const FEATURES: FeatureBadgeProps[] = [
    {
        emoji: "🌿",
        title: "Expertos",
        subtitle: "Guías de cuidado"
    },
    {
        emoji: "🏺",
        title: "Artesanal",
        subtitle: "Piezas únicas"
    }
];

// 3. SUB-COMPONENTE: Pequeño, reutilizable y aislado.
// En un proyecto real, esto podría estar en su propio archivo si se usa en otras páginas.
const FeatureBadge = ({ emoji, title, subtitle }: FeatureBadgeProps) => (
    <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/5 hover:bg-white/20 transition-colors cursor-default">
        <div className="text-2xl mb-1" role="img" aria-label={title}>{emoji}</div>
        <div className="font-bold text-sm">{title}</div>
        <div className="text-xs text-white/60">{subtitle}</div>
    </div>
);

// 4. COMPONENTE PRINCIPAL
export const AuthBanner = ({
    title,
    subtitle = "Únete a nuestra comunidad de amantes de las plantas, artesanos y soñadores.",
    backgroundImage = DEFAULT_IMAGE
}: AuthBannerProps) => {

    return (
        <div className="hidden lg:block relative overflow-hidden bg-emerald-900 h-full min-h-[600px]">
            {/* Capa 1: Imagen de Fondo */}
            <div className="absolute inset-0 opacity-60">
                <img
                    src={backgroundImage}
                    alt="Atmosphere background"
                    className="w-full h-full object-cover"
                    loading="lazy" // Optimización de rendimiento
                />
            </div>

            {/* Capa 2: Overlay Gradiente */}
            <div
                className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-900/40 to-transparent pointer-events-none"
                aria-hidden="true"
            />

            {/* Capa 3: Contenido Principal */}
            <div className="relative h-full flex flex-col justify-between p-12 text-white z-10">

                {/* Header Section */}
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-xs font-bold uppercase tracking-widest mb-6">
                        <Leaf className="w-3 h-3" />
                        <span>Lifestyle & Garden</span>
                    </div>

                    <h2 className="text-5xl font-black leading-tight mb-4">
                        {title || (
                            <>
                                Cultiva tu <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200">
                                    Propio Mundo
                                </span>
                            </>
                        )}
                    </h2>

                    <p className="text-emerald-100/80 text-lg max-w-sm">
                        {subtitle}
                    </p>
                </div>

                {/* Footer Section: Features Grid */}
                {/* Aquí usamos .map para no repetir código */}
                <div className="grid grid-cols-2 gap-4">
                    {FEATURES.map((feature, index) => (
                        <FeatureBadge
                            key={index}
                            {...feature}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};