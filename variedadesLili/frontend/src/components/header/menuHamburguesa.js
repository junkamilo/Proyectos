const menuHamburguesa = () => {
  // --- Contenedor (Relativo, solo en móvil) ---
  const container = document.createElement("div");
  container.className = "relative md:hidden";

  // --- Botón hamburguesa ---
  const button = document.createElement("button");
  button.className =
    "hamburgerBtn group flex flex-col justify-center items-center gap-1.5 p-2 rounded-lg transition-colors duration-300 ease-in-out " +
    "hover:bg-slate-500/10 dark:hover:bg-slate-500/20 " + // Coherente con logoPerfil
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 " +
    "focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100 " +
    "dark:focus-visible:ring-offset-slate-900";
  button.setAttribute("aria-label", "Abrir menú principal");
  button.setAttribute("aria-expanded", "false"); // JS gestionará esto

  // --- Líneas de la hamburguesa ---
  const createLine = (lineClass) => {
    const line = document.createElement("span");
    line.className =
      `line ${lineClass} block w-6 h-0.5 rounded-full transition-all duration-300 ease-in-out ` +
      "bg-slate-900 dark:bg-slate-200"; // Añadido dark mode
    return line;
  };

  const line1 = createLine("line-1");
  const line2 = createLine("line-2");
  const line3 = createLine("line-3");

  button.append(line1, line2, line3);

  // --- Contenedor del menú (Estilado por .hamburgerMenu en CSS global) ---
  const menu = document.createElement("div");
  menu.className = "hamburgerMenu"; // Clase global para animación

  const ul = document.createElement("ul");
  ul.className = "flex flex-col p-2"; // Padding interno del menú

  // --- Helper para crear <li> con <a> (Enlaces) ---
  const createMenuLink = (text, href, iconSvg) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = href;
    a.className =
      "group flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium rounded-md transition-colors duration-200 ease-in-out " +
      "text-slate-700 dark:text-slate-200 " +
      "hover:bg-purple-100 hover:text-purple-600 " + // Acento SPA
      "dark:hover:bg-purple-900/50 dark:hover:text-purple-400 " +
      "focus:outline-none focus:bg-purple-100 focus:text-purple-600 " +
      "dark:focus:bg-purple-900/50 dark:focus:text-purple-400";

    // Icono
    const iconSpan = document.createElement("span");
    iconSpan.className =
      "w-5 h-5 opacity-80 transition-opacity group-hover:opacity-100";
    iconSpan.innerHTML = iconSvg;

    // Texto
    const textSpan = document.createElement("span");
    textSpan.textContent = text;

    a.append(iconSpan, textSpan);
    li.append(a);
    return li;
  };

  // --- Helper para crear <li> con <button> (Acciones) ---
  const createMenuButton = (text, iconSvg) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className =
      "group flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-left rounded-md transition-colors duration-200 ease-in-out " +
      "text-red-600 dark:text-red-500 " + // Color destructivo
      "hover:bg-red-100 dark:hover:bg-red-900/50 " +
      "focus:outline-none focus:bg-red-100 dark:focus:bg-red-900/50";

    // Icono
    const iconSpan = document.createElement("span");
    iconSpan.className =
      "w-5 h-5 opacity-80 transition-opacity group-hover:opacity-100";
    iconSpan.innerHTML = iconSvg;

    // Texto
    const textSpan = document.createElement("span");
    textSpan.textContent = text;

    btn.append(iconSpan, textSpan);
    li.append(btn);
    return li;
  };

  // SVGs para los iconos
  const iconHome = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955a.75.75 0 011.06 0l8.955 8.955a.75.75 0 01.15 1.03l-.06.07a.75.75 0 01-1.03-.15L12 4.56l-8.955 8.955a.75.75 0 01-1.06-1.06z" /><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v4.875h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21V9.75" /></svg>`;
  const iconUser = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A1.5 1.5 0 0118 21.75H6.75a1.5 1.5 0 01-1.499-1.632z" /></svg>`;
  const iconLogout = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>`;

  // Creación de items
  const li1 = createMenuLink("Inicio", "#/inicio", iconHome);
  const li2 = createMenuLink("Perfil", "#/perfil", iconUser);
  const li3 = createMenuButton("Cerrar Sesión", iconLogout);

  ul.append(li1, li2, li3);
  menu.append(ul);

  // --- Lógica de clic (Añadida por solicitud) ---
  button.addEventListener("click", (e) => {
    e.stopPropagation(); // Evita que otros clics se disparen

    // Alternar la clase 'menuActivo' en el botón y el menú.
    // Esta clase activa las animaciones CSS (transformación 'X' y aparición del menú)
    // definidas en el archivo CSS global.
    const isActive = menu.classList.toggle("menuActivo");
    button.classList.toggle("menuActivo");

    // Actualizar 'aria-expanded' para accesibilidad
    button.setAttribute("aria-expanded", isActive ? "true" : "false");
  });

  // --- Ensamblado final ---
  container.append(button, menu);
  return container;
};

export default menuHamburguesa;
