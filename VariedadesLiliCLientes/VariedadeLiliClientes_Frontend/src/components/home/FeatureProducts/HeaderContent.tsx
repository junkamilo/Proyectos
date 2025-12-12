import React from 'react';
import { Leaf, type LucideIcon } from 'lucide-react';

// --- 1. Definición de Tipos ---

interface SectionHeaderProps {
    badge?: string;
    title?: string;
    highlight?: string;
    description?: string;
    icon?: LucideIcon;
    className?: string;
}

// --- 2. Sub-componente: Badge (Etiqueta) ---
const SectionBadge = ({ text, icon: Icon }: { text: string; icon: LucideIcon }) => (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-emerald-100 dark:border-emerald-800 shadow-sm animate-fade-in-up">
        <Icon className="w-4 h-4 text-emerald-600 fill-emerald-100" />
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
            {text}
        </span>
    </div>
);

// --- 3. Componente Principal ---

export const SectionHeader: React.FC<SectionHeaderProps> = ({
    badge = "Lo más cultivado",
    title = "Favoritos de la",
    highlight = "Comunidad",
    description = "Explora nuestra selección curada de productos más vendidos. Calidad orgánica garantizada y envío rápido para llenar tu vida de verde.",
    icon = Leaf,
    className = ""  
}) => {
    return (
        <div className={`text-center mb-16 space-y-4 ${className}`}>

            {/* 1. Badge / Etiqueta Superior */}
            {badge && (
                <SectionBadge text={badge} icon={icon} />
            )}

            {/* 2. Título Principal con Gradiente */}
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {title}{' '}
                <span className="bg-gradient-to-r from-green-700 via-emerald-600 to-teal-500 bg-clip-text text-transparent">
                    {highlight}
                </span>
            </h2>

            {/* 3. Descripción */}
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                {description}
            </p>

        </div>
    );
};
