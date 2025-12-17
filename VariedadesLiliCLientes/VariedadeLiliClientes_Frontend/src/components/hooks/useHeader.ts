import { useAuth } from "@/auth/context/AuthContext"
import { useState, useEffect } from "react"
 // Asegúrate que esta ruta sea la correcta en tu proyecto

export const useHeader = () => {
    // 1. ESTADOS LOCALES
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    
    // 2. CONTEXTO DE AUTH
    const { isAuthenticated, logout, user } = useAuth()

    // 3. DATOS CONSTANTES
    const categories = ["Plantas", "Materos", "Abono", "Alcancías"]

    // 4. EFECTOS (Scroll)
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // 5. UTILIDADES
    const normalizePath = (text: string) => {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
    }

    // 6. HANDLERS AUXILIARES
    const toggleMenu = () => setMobileMenuOpen(prev => !prev)
    const closeMenu = () => setMobileMenuOpen(false)

    // 7. RETORNO
    return {
        mobileMenuOpen,
        setMobileMenuOpen, // Opcional, si quieres control directo
        toggleMenu,
        closeMenu,
        scrolled,
        isAuthenticated,
        logout,
        user,
        categories,
        normalizePath
    }
}