
import { Outlet } from 'react-router';
import Header from '../ui/components/Header';

// O la ruta donde tengas tu Header

export const MainLayout = () => {
    return (
        <div>
            {/* 1. Aquí va tu Header fijo */}
            <Header />

            {/* 2. El main envuelve el contenido cambiante */}
            <main className="min-h-screen bg-background">
                {/* 3. Outlet es el "hueco" donde se pintará el HomePage, etc. */}
                <Outlet />
            </main>

            {/* Aquí podrías poner un Footer también */}
        </div>
    )
}