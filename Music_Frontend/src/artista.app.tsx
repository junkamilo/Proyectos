import { RouterProvider } from "react-router"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { router } from "./router/AppRouter"


const queryClient = new QueryClient()

export const ArtistasApp = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
             <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )

}

