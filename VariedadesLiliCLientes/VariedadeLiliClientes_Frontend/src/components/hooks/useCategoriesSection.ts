import { useQuery } from '@tanstack/react-query'
import { Leaf, Box, Sprout, PiggyBank } from "lucide-react"

// Importamos tus actions (Asegúrate que las rutas sean correctas)
import { getProductosPlantas } from "@/plantas/actions/get-plantas"
import { getProductosMateros } from "@/materos/actions/get-materos"
import { getProductosAbono } from "@/abono/actions/get-abono"
import { getProductosAlcancia } from "@/alcancia/action/get-alcancia"

export const useCategoriesSection = () => {

    // 1. DATA FETCHING (Paralelo)
    const { data: plantas = [], isLoading: loadingPlantas } = useQuery({
        queryKey: ['home-plantas'],
        queryFn: () => getProductosPlantas(),
        staleTime: 1000 * 60 * 10,
    })

    const { data: materos = [], isLoading: loadingMateros } = useQuery({
        queryKey: ['home-materos'],
        queryFn: getProductosMateros,
        staleTime: 1000 * 60 * 10,
    })

    const { data: abonos = [], isLoading: loadingAbonos } = useQuery({
        queryKey: ['home-abonos'],
        queryFn: getProductosAbono,
        staleTime: 1000 * 60 * 10,
    })

    const { data: alcancias = [], isLoading: loadingAlcancias } = useQuery({
        queryKey: ['home-alcancias'],
        queryFn: getProductosAlcancia,
        staleTime: 1000 * 60 * 10,
    })

    // 2. CONFIGURACIÓN UNIFICADA (ViewModel)
    // Combinamos la configuración visual con los datos obtenidos
    const categories = [
        {
            id: "plantas",
            name: "Plantas de Interior",
            description: "Purifica tu aire y relaja tu mente con follaje natural.",
            icon: Leaf,
            // Tema: Esmeralda
            color: "text-emerald-600 dark:text-emerald-400",
            bgIcon: "bg-emerald-100 dark:bg-emerald-900/30",
            borderBtn: "border-emerald-200 hover:border-emerald-500 hover:bg-emerald-50",
            textBtn: "text-emerald-700 dark:text-emerald-300",
            products: plantas.slice(0, 4),
            isLoading: loadingPlantas
        },
        {
            id: "materos",
            name: "Materos",
            description: "El hogar perfecto para tus plantas. Cerámica y barro.",
            icon: Box,
            // Tema: Terracota
            color: "text-orange-600 dark:text-orange-400",
            bgIcon: "bg-orange-100 dark:bg-orange-900/30",
            borderBtn: "border-orange-200 hover:border-orange-500 hover:bg-orange-50",
            textBtn: "text-orange-700 dark:text-orange-300",
            products: materos.slice(0, 4),
            isLoading: loadingMateros
        },
        {
            id: "abono",
            name: "Abono",
            description: "Sustratos ricos en minerales para un crecimiento fuerte.",
            icon: Sprout,
            // Tema: Lima
            color: "text-lime-600 dark:text-lime-400",
            bgIcon: "bg-lime-100 dark:bg-lime-900/30",
            borderBtn: "border-lime-200 hover:border-lime-500 hover:bg-lime-50",
            textBtn: "text-lime-700 dark:text-lime-300",
            products: abonos.slice(0, 4),
            isLoading: loadingAbonos
        },
        {
            id: "alcancias",
            name: "Alcancías",
            description: "Piezas pintadas a mano inspiradas en la fauna y flora.",
            icon: PiggyBank,
            // Tema: Rosa
            color: "text-rose-500 dark:text-rose-400",
            bgIcon: "bg-rose-100 dark:bg-rose-900/30",
            borderBtn: "border-rose-200 hover:border-rose-500 hover:bg-rose-50",
            textBtn: "text-rose-700 dark:text-rose-300",
            products: alcancias.slice(0, 4),
            isLoading: loadingAlcancias
        }
    ]

    return {
        categories
    }
}