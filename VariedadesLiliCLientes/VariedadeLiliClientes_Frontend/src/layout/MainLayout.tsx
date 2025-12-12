import { Outlet } from "react-router"
import Header from "../components/layout/Header/Header"
import Footer from "../components/layout/Footer"


export const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* 1. Header Fijo */}
            <Header />

            {/* 2. El Outlet es el "hueco" dinámico. 
               Aquí React Router inyectará HomePage, ContactPage, etc. */}
            <main className="flex-1 bg-background">
                <Outlet />
            </main>

            {/* 3. Footer Fijo */}
            <Footer />
        </div>
    )
}
