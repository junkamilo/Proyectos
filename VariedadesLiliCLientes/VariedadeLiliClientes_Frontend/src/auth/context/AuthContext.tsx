import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

//definimos como guardamos los datos del usuario
interface User {
    id?: string | number;
    nombre_completo: string;
    email: string;
    token?: string;
    url_foto_perfil?: string | null;
}

//definimos que datos y funciones tendra nuestro contexto 
interface AuthContextType {
    user: User | null;           // El objeto usuario o null si no hay nadie
    isAuthenticated: boolean;    // true si está logueado, false si no
    login: (userData: User) => void; // Función para iniciar sesión
    logout: () => void;
}

// Creamos el contexto (inicialmente indefinido)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Para evitar "parpadeos" al cargar

    // --- EFECTO: CARGAR SESIÓN AL INICIAR (F5) ---
    useEffect(() => {
        // Buscamos si hay algo guardado en el navegador
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Error al leer sesión local:", error);
                // Si el JSON está corrupto, limpiamos todo por seguridad
                localStorage.removeItem('user');
                setUser(null);
                setIsAuthenticated(false);
            }
        }
        setIsLoading(false); // Terminamos de revisar
    }, []);

    // --- FUNCIÓN LOGIN ---
    const login = (userData: User) => {
        // 1. Actualizamos el estado de React (rápido)
        setUser(userData);
        setIsAuthenticated(true);

        // 2. Guardamos en el navegador (persistencia)
        // Convertimos el objeto a texto (JSON string)
        localStorage.setItem('user', JSON.stringify(userData));
    };

    // --- FUNCIÓN LOGOUT ---
    const logout = () => {
        // 1. Limpiamos estado
        setUser(null);
        setIsAuthenticated(false);

        // 2. Borramos del navegador
        localStorage.removeItem('user');
    };

    // Si está cargando la sesión (leyendo disco), puedes retornar null o un spinner
    // para que no salga "Iniciar Sesión" por medio segundo antes de detectar que ya estaba logueado.
    if (isLoading) {
        return null; // O pon <LoadingSpinner />
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// 4. Hook personalizado para usar el contexto fácilmente
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
};