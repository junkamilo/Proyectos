// src/components/common/HeaderProducts/index.tsx
import { HEADER_VARIANTS } from "./variants";
import type { HeaderProductsProps } from "./types";

export const HeaderProducts = ({
    subtitle,
    title,
    description,
    cantProducto,
    PorcentageprocessProduction,
    processProduction,
    icon,
    variant = 'plantas'
}: HeaderProductsProps) => {

    // 1. Accedemos a la configuración importada
    const theme = HEADER_VARIANTS[variant];

    // 2. Renderizado limpio
    return (
        <div className="relative pt-12 pb-16 px-4 md:px-8 overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6">

                    {/* Bloque de Texto Principal */}
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className={`p-2 text-white rounded-lg shadow-lg ${theme.iconBg} ${theme.iconShadow}`}>
                                {icon}
                            </span>
                            <span className={`text-sm font-bold uppercase tracking-widest ${theme.subtitleText}`}>
                                {subtitle}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            <span className={theme.titleHighlight}>{title}</span>
                        </h1>

                        <p className="mt-4 text-slate-600 dark:text-slate-300 max-w-xl text-lg">
                            {description}
                        </p>
                    </div>

                    {/* Bloque de Estadísticas */}
                    <div className="flex gap-8 text-slate-500 dark:text-slate-400">
                        <StatItem
                            value={cantProducto}
                            label="Disponibles"
                            hoverColor={theme.hoverText}
                        />

                        <div className={`w-px h-10 ${theme.separator}`} />

                        <StatItem
                            value={PorcentageprocessProduction}
                            label={processProduction}
                            hoverColor={theme.hoverText}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Sub-componente interno para evitar repetir código HTML (DRY)
const StatItem = ({ value, label, hoverColor }: { value: string, label: string, hoverColor: string }) => (
    <div className="text-center group">
        <p className={`text-2xl font-bold text-slate-900 dark:text-white transition-colors ${hoverColor}`}>
            {value}
        </p>
        <p className="text-xs uppercase font-semibold">{label}</p>
    </div>
);
