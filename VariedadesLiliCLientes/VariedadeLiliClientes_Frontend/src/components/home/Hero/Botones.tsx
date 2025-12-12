import React from 'react';
 // O 'next/link' si usas Next.js
import { ArrowRight, type LucideIcon } from 'lucide-react';
import { Link } from 'react-router';

// 1. Tipos e Interfaces
export type ButtonVariant = 'primary' | 'secondary';

export interface HeroLinkProps {
    to: string;
    label: string;
    variant?: ButtonVariant;
    icon?: LucideIcon;
    className?: string;
}

// 2. Definición de Estilos (para no ensuciar el componente)
const BASE_STYLES = "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all duration-300";

const VARIANTS: Record<ButtonVariant, string> = {
    primary: "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-1",
    secondary: "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-700 dark:hover:text-emerald-400"
};

// 3. Componente Atómico Reutilizable
export const HeroLink: React.FC<HeroLinkProps> = ({to,label,variant = 'primary',icon: Icon,className =''}) => {
    return (
        <Link
            to={to}
            className={`${BASE_STYLES} ${VARIANTS[variant]} ${className}`}
        >
            {label}
            {Icon && <Icon className="w-5 h-5" />}
        </Link>
    );
};

// 4. Componente Contenedor (Limpio y legible)
export const Botones = () => {
    return (
        <div className="flex flex-col sm:flex-row gap-4">
            {/* Primary Button */}
            <HeroLink
                to="#productos-destacados"
                label="Ver Catálogo"
                variant="primary"
                icon={ArrowRight}
            />

            {/* Secondary Button */}
            <HeroLink
                to="#categorias"
                label="Explorar Categorías"
                variant="secondary"
            />
        </div>
    );
};
