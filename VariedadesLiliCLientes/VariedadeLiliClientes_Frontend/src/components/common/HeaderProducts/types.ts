// src/components/common/HeaderProducts/types.ts
import type { ReactNode } from "react";

export type ProductVariant = 'plantas' | 'materos' | 'abono' | 'alcancia';

export interface HeaderProductsProps {
    subtitle: string;
    title: string;
    description: string;
    cantProducto: string; // O number, según prefieras
    PorcentageprocessProduction: string;
    processProduction: string;
    icon: ReactNode;
    variant?: ProductVariant;
}

// Definimos la estructura exacta de nuestro tema para tener autocompletado
export interface ThemeStyles {
    iconBg: string;
    iconShadow: string;
    subtitleText: string;
    titleHighlight: string;
    separator: string;
    hoverText: string;
}