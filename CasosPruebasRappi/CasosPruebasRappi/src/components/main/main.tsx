import { Outlet } from "react-router-dom";

export const Main = () => {
  return (
    <main
      // flex-1: Ocupa todo el espacio vertical restante (empuja el footer al fondo).
      // w-full: Asegura ancho total para que el Hero (Rojo) se vea de borde a borde.
      // bg-[#f7f9fa]: Fondo gris claro base de la SPA.
      // relative z-0: Contexto de apilamiento correcto (debajo del Header sticky).
      className="flex-1 w-full bg-[#f7f9fa] relative z-0 flex flex-col"
    >
      <div
        // Contenedor de la animación de entrada.
        // w-full: Crucial para que los hijos (como el Hero) hereden el ancho completo.
        className="w-full flex-1 animate-slideIn transition-opacity duration-500 ease-out"
      >
        {/* El contenido de las rutas (Hero, Grid de productos, etc.) se renderiza aquí */}
         <Outlet />
      </div>
    </main>
  );
};






