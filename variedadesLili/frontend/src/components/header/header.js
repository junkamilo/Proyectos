import { sessionComponents } from "../../helpers/helpersheader/sessionComponents";
import logoTitulo from "./logoTitulo"; // El import está, pero 'search' no se usa en la lógica original. Se respeta.

export const header = () => {
  const titulo = logoTitulo();

  // --- Contenedor principal (Header) ---
  const headerContent = document.createElement("header");
  headerContent.className =
    "appHeader sticky top-0 z-50 w-full border-b border-slate-300/50 bg-slate-100/75 backdrop-blur-lg transition-colors duration-300 ease-in-out dark:border-slate-700/50 dark:bg-slate-900/75";

  // --- Wrapper de Navegación (Contenido interno) ---
  const navWrapper = document.createElement("nav");
  navWrapper.className =
    "max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8"; // Aumentamos py-4 para mejor tacto y consistencia con max-w-7xl

  // --- Grupo izquierdo (Logo) ---
  const leftGroup = document.createElement("div");
  leftGroup.className = "flex flex-shrink-0 items-center gap-3";

  // --- Grupo derecho (Iconos/Botones) ---
  const rightGroup = document.createElement("div");
  rightGroup.className = "flex items-center justify-end gap-3 sm:gap-4";

  // --- Componentes de sesión según autenticación ---
  const authComponents = sessionComponents();

  authComponents.forEach((el) => {
    if (el) rightGroup.appendChild(el);
  });

  // Ensamblaje final (Sin cambios lógicos)
  leftGroup.append(titulo);
  navWrapper.append(leftGroup, rightGroup);
  headerContent.append(navWrapper);

  return headerContent;
};