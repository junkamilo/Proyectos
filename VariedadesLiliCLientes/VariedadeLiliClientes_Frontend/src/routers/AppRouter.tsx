import { createBrowserRouter } from "react-router";
import { MainLayout } from "../layout/MainLayout";
import { HomePage } from "../clientes/pages/home/HomePage";
import PlantsPage from "@/plantas/pages/Page";
import MaterosPages from "@/materos/pages/MaterosPage";
import AlcanciaPages from "@/alcancia/pages/AlcanciaPage";
import AbonoPages from "@/abono/pages/AbonoPage";
import { RegisterPage } from "@/auth/pages/RegisterPage";
import { LoginPage } from "@/auth/pages/LoginPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />, // <--- Pones el Layout como elemento principal
        children: [
            {
                index: true, // Esto significa: "Cuando la ruta sea '/', muestra esto"
                element: <HomePage />
            },
            {
                path: 'plantas', // <--- 2. La URL será domain.com/plantas
                element: <PlantsPage />,
            },
            {
                path: 'materos', // <--- 2. La URL será domain.com/plantas
                element: <MaterosPages />,
            },
            {
                path: 'abono', // <--- 2. La URL será domain.com/plantas
                element: <AbonoPages />,
            },
            {
                path: 'alcancias', // <--- 2. La URL será domain.com/plantas
                element: <AlcanciaPages />,
            },
        ]
    },
    {
        path: '/register',
        element: <RegisterPage />
    },
    {
        path: '/login',
        element: <LoginPage /> // Placeholder
    }
]);
