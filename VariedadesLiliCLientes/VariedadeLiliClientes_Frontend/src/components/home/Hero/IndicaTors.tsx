import { Star } from 'lucide-react';

// --- 1. Interfaces & Tipos ---

interface StatData {
    value: string;
    label: string;
}

interface RatingProps {
    score: string;
    maxStars?: number;
}

// --- 2. Sub-componentes Atómicos ---

// Componente para una estadística individual (Ej: 500+ Especies)
const StatItem = ({ value, label }: StatData) => (
    <div className="flex flex-col">
        <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {value}
        </span>
        <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            {label}
        </span>
    </div>
);

// Componente visual para el separador vertical
const Divider = () => (
    <div className="hidden sm:block w-px h-10 bg-slate-200 dark:bg-slate-800 mx-4" />
);

// Componente para las estrellas y puntuación
const RatingBadge = ({ score, maxStars = 5 }: RatingProps) => (
    <div className="flex items-center gap-2">
        <div className="flex">
            {[...Array(maxStars)].map((_, i) => (
                <Star
                    key={i}
                    className="w-5 h-5 text-amber-400 fill-amber-400"
                />
            ))}
        </div>
        <span className="text-sm font-bold text-slate-900 dark:text-white">
            {score}
        </span>
    </div>
);

// --- 3. Componente Principal (Limpio) ---

export const Indicators = () => {
    // Datos configurables (fáciles de editar aquí)
    const stats: StatData[] = [
        { value: "500+", label: "Especies" },
        { value: "10k+", label: "Jardines Felices" },
    ];

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-0 mt-8 sm:mt-0">

            {/* Separador (Opcional: solo se muestra si lo necesitas al lado de los botones) */}
            <Divider />

            {/* Renderizado dinámico de estadísticas */}
            <div className="flex gap-8 sm:gap-12">
                {stats.map((stat, index) => (
                    <StatItem
                        key={index}
                        value={stat.value}
                        label={stat.label}
                    />
                ))}
            </div>

            {/* Separador interno entre stats y rating (opcional, por diseño) */}
            <div className="hidden sm:block w-px h-10 bg-slate-200 dark:bg-slate-800 mx-8" />

            {/* Rating */}
            <RatingBadge score="4.9/5" />

        </div>
    );
};