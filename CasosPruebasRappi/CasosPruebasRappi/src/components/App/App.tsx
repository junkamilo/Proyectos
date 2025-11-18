import { Footer } from "../footer/footer";
import { Header } from "../header/Header";
import { Main } from "../main/main";

export const App = () => {
    return (
        // Contenedor principal para manejar el layout (flex-col para sticky footer)
        <div className="flex flex-col min-h-screen bg-rappi-dark antialiased">
            <Header />
            <Main />    
            <Footer />
        </div>
    );
};