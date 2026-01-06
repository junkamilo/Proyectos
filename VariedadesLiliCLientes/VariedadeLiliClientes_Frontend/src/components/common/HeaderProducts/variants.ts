// src/components/common/HeaderProducts/variants.ts
import type { ProductVariant, ThemeStyles } from "./types";

export const HEADER_VARIANTS: Record<ProductVariant, ThemeStyles> = {
    plantas: {
        iconBg: "bg-emerald-600",
        iconShadow: "shadow-emerald-600/30",
        subtitleText: "text-emerald-800 dark:text-emerald-300",
        titleHighlight: "text-emerald-600 dark:text-emerald-400",
        separator: "bg-emerald-200 dark:bg-emerald-800",
        hoverText: "group-hover:text-emerald-600"
    },
    materos: {
        iconBg: "bg-orange-600",
        iconShadow: "shadow-orange-600/30",
        subtitleText: "text-orange-800 dark:text-orange-300",
        titleHighlight: "text-orange-600 dark:text-orange-400",
        separator: "bg-orange-200 dark:bg-orange-800",
        hoverText: "group-hover:text-orange-600"
    },
    abono: {
        iconBg: "bg-amber-600",
        iconShadow: "shadow-amber-600/30",
        subtitleText: "text-amber-800 dark:text-amber-300",
        titleHighlight: "text-amber-600 dark:text-amber-400",
        separator: "bg-amber-200 dark:bg-amber-800",
        hoverText: "group-hover:text-amber-600"
    },
    alcancia: {
        iconBg: "bg-rose-500",
        iconShadow: "shadow-rose-500/30",
        subtitleText: "text-rose-800 dark:text-rose-300",
        titleHighlight: "text-rose-500 dark:text-rose-400",
        separator: "bg-rose-200 dark:bg-rose-800",
        hoverText: "group-hover:text-rose-500"
    }
};