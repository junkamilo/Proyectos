import logoPerfil from "./logoPerfil";
import logoTitulo from "./logoTitulo";
import menuHamburguesa from "./menuHamburguesa";
import search from "./search";

const header = () => {
  // Instanciamos los componentes
  const perfilUSer = logoPerfil();
  const menHamburguesa = menuHamburguesa();
  const titulo = logoTitulo();
  const searchBus = search();

  // Crear contenedor principal
  const headerContent = document.createElement("header");
  
  // --- Clases de Tailwind Aplicadas (Header) ---
  // Posición: 'sticky top-0 z-50' (fijo arriba)
  // Estilo: 'bg-white', 'shadow-md' (sombra sutil), 'border-b'
  // Layout: 'w-full'
  headerContent.className ="appHeader sticky top-0 z-50 w-full bg-white shadow-md border-b border-slate-200";

  // --- Wrapper Interno ---
  // Controla el ancho máximo y el padding
  const navWrapper = document.createElement("nav");
  navWrapper.className =
    "max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 gap-4";

  // --- Grupo Izquierdo (Logo + Menú Móvil) ---
  const leftGroup = document.createElement("div");
  leftGroup.className = "flex items-center gap-3";
  // 'menHamburguesa' (md:hidden) y 'titulo' (siempre visible)
  leftGroup.append(menHamburguesa, titulo);

  // --- Grupo Derecho (Búsqueda + Perfil Desktop) ---
  const rightGroup = document.createElement("div");
  rightGroup.className = "flex items-center gap-3 sm:gap-4";
  // 'searchBus' y 'perfilUSer' (hidden md:flex)
  rightGroup.append(searchBus, perfilUSer);
  
  // Ensamblaje final
  navWrapper.append(leftGroup, rightGroup);
  headerContent.append(navWrapper);

  return headerContent;
};

export default header;