import { btnHamburguesa } from "./btnHamburguesa";
import { itemsIcons } from "./itemsIcons";

export const menuHamburguesa = () => {
  //instanciamos componentes del menu hamburguesa
  const button = btnHamburguesa();
  const ul = itemsIcons();

  // --- Contenedor (Relativo, solo en móvil) ---
  const container = document.createElement("div");
  container.className = "relative md:hidden";


  // --- Contenedor del menú (Estilado por .hamburgerMenu en CSS global) ---
  const menu = document.createElement("div");
  menu.className = "hamburgerMenu";


  menu.append(ul);

  // --- Lógica de clic (Añadida por solicitud) ---
  button.addEventListener("click", (e) => {
    e.stopPropagation();

    const isActive = menu.classList.toggle("menuActivo");
    button.classList.toggle("menuActivo");

    button.setAttribute("aria-expanded", isActive ? "true" : "false");
  });

  // --- Ensamblado final ---
  container.append(button, menu);
  return container;
};
