import { createBrowserRouter } from "react-router";
import { HomePage } from "../Home/pages/homePage";
import { MainLayout } from "../layout/MainLayout";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />, // <--- Pones el Layout como elemento principal
        children: [
            {
                index: true, // Esto significa: "Cuando la ruta sea '/', muestra esto"
                element: <HomePage /> 
            },
        ]
    }
]);
