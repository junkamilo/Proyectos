import { useHeader } from "../../hooks/useHeader"
import { TopBar } from './TopBar';
import { Logo } from "./Logo";
import { Buscador } from "./Buscador";
import { IconActions } from "./IconActions";
import { NavarInferior } from "./NavarInferior";
import { MenuMovil } from "./MenuMovil";

// Importamos la lógica separada


export default function Header() {
    // Extraemos TODAS las funciones y estados necesarios del hook
    const {
        scrolled,
        mobileMenuOpen,
        toggleMenu,
        closeMenu,
        isAuthenticated,
        categories,
        normalizePath,
        logout
    } = useHeader();

    return (
        <>
            {/* --- TOP BAR --- */}
            <TopBar title="Envío gratis en compras mayores a $50.000 COP — ¡Llena tu vida de verde!" />

            <header className={`sticky top-0 z-40 w-full transition-all duration-500 border-b ${scrolled
                ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-emerald-100/50 dark:border-emerald-900/30 shadow-lg shadow-emerald-900/5 py-2"
                : "bg-white dark:bg-slate-950 border-transparent py-4"
                }`}>

                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="flex items-center justify-between gap-6 md:gap-8">

                        {/* --- LOGO --- */}
                        <Logo title="VariedadesLili" />

                        {/* --- BUSCADOR --- */}
                        <Buscador />

                        {/* --- ICONOS DE ACCIÓN --- */}
                        {/* 2. CORRECCIÓN: Pasamos las props requeridas */}
                        <IconActions
                            onToggleMenu={toggleMenu}
                            isMenuOpen={mobileMenuOpen}
                            isAuthenticated={isAuthenticated}
                            logout={logout}
                        />
                    </div>

                    {/* --- NAVBAR INFERIOR --- */}
                    {/* Pasamos las props requeridas */}
                    <NavarInferior
                        scrolled={scrolled}
                        categories={categories}
                        normalizePath={normalizePath}
                    />

                </div>

                {/* --- MENU MÓVIL --- */}
                {/* Pasamos las props requeridas */}
                <MenuMovil
                    isOpen={mobileMenuOpen}
                    onClose={closeMenu}
                    categories={categories}
                    normalizePath={normalizePath}
                    isAuthenticated={isAuthenticated}
                    logout={logout}
                />

            </header>
        </>
    )
}
