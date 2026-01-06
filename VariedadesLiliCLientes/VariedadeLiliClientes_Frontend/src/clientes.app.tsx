import { RouterProvider } from "react-router"
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { router } from "./routers/AppRouter";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from "./auth/context/AuthContext";
import { Toaster } from 'sonner'; // <--- 1. Importar


const queryClient = new QueryClient()

export const ClienteApp = () => {
    return (
        <QueryClientProvider client={queryClient}>
            {/* El AuthProvider debe envolver al Router para que las páginas accedan al usuario */}
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
            {/**alertas */}
            <Toaster position="bottom-right" richColors />
            {/* Las herramientas de desarrollo se mantienen aquí */}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )

}
