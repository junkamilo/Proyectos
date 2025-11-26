import { sessionComponents } from "../../helpers/helpersheader/sessionComponents";
import logoTitulo from "./logoTitulo";
import "./css/header.css";

export const header = () => {
  const titulo = logoTitulo();

  // --- Contenedor principal (Header) ---
  const headerContent = document.createElement("header");
  headerContent.className = "appHeader header-root";

  // --- Wrapper de Navegación ---
  const navWrapper = document.createElement("nav");
  navWrapper.className = "header-nav";

  // --- Grupo izquierdo (Logo) ---
  const leftGroup = document.createElement("div");
  leftGroup.className = "header-group-left";

  // --- Grupo derecho (Iconos/Botones) ---
  const rightGroup = document.createElement("div");
  rightGroup.className = "header-group-right";

  //funcion para renderizar los botones
  const renderAuthButtons = () => {
    // 1. Limpiamos lo que haya actualmente (botones viejos)
    rightGroup.innerHTML = "";

    // 2. Obtenemos los componentes nuevos según el estado actual (localStorage)
    const authComponents = sessionComponents();

    // 3. Los agregamos al DOM
    authComponents.forEach((el) => {
      if (el) rightGroup.appendChild(el);
    });
  };

  // Ejecutamos la primera vez (cuando carga la página)
  renderAuthButtons();

  // Escuchamos el evento
  window.addEventListener("auth-change", () => {
    renderAuthButtons(); // Se vuelve a ejecutar cuando login/logout ocurre
  });

  // Ensamblaje final
  leftGroup.append(titulo);
  navWrapper.append(leftGroup, rightGroup);
  headerContent.append(navWrapper);

  return headerContent;
};
