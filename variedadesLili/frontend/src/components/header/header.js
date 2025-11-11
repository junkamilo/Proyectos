import { sessionComponents } from "../../helpers/helpersheader/sessionComponents";
import logoTitulo from "./logoTitulo";
import search from "./search";

export const header = () => {
  const titulo = logoTitulo();

  // Contenedor principal
  const headerContent = document.createElement("header");
  headerContent.className = "appHeader sticky top-0 z-50 w-full bg-white shadow-md border-b border-slate-200";

  const navWrapper = document.createElement("nav");
  navWrapper.className = "max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 gap-4";

  // Grupo izquierdo
  const leftGroup = document.createElement("div");
  leftGroup.className = "flex items-center gap-3";

  // Grupo derecho
  const rightGroup = document.createElement("div");
  rightGroup.className = "flex items-center gap-3 sm:gap-4";

  // --- Componentes de sesión según autenticación ---
  const authComponents = sessionComponents();
  
  authComponents.forEach(el => {
    if (el) rightGroup.appendChild(el);
  });

  // Ensamblaje final
  leftGroup.append(titulo);
  navWrapper.append(leftGroup, rightGroup);
  headerContent.append(navWrapper);

  return headerContent;
};
