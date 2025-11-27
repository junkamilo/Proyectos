import { createMenuButton } from "./createMenuButton";
import { createMenuLink } from "./createMenuLinks";

export const itemsIcons = () => {
  const ul = document.createElement("ul");
  ul.className = "flex flex-col p-2";
  // SVGs para los iconos
  const iconHome = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955a.75.75 0 011.06 0l8.955 8.955a.75.75 0 01.15 1.03l-.06.07a.75.75 0 01-1.03-.15L12 4.56l-8.955 8.955a.75.75 0 01-1.06-1.06z" /><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v4.875h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21V9.75" /></svg>`;
  const iconUser = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A1.5 1.5 0 0118 21.75H6.75a1.5 1.5 0 01-1.499-1.632z" /></svg>`;
  const iconLogout = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>`;

  // Creación de items
  const li1 = createMenuLink("Inicio", "/", iconHome);
  const li2 = createMenuLink("Perfil", "#ProFileView", iconUser);
  const li3 = createMenuButton("Cerrar Sesión", "#Login",iconLogout);

  ul.append(li1, li2, li3);

  return ul;
};
