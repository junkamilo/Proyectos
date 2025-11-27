export const NavUsuarios = () => {
  const nav = document.createElement("nav");
  nav.className =
    "w-full flex justify-center mt-6 mb-8 px-4 animate-fade-in-down";

  // --- Contenedor Cápsula (Fondo Glass) ---
  const listContainer = document.createElement("ul");
  listContainer.className =
    "relative flex p-1 " +
    "w-full max-w-md " + // Ancho controlado en desktop, full en móvil
    "bg-slate-800/60 backdrop-blur-xl " + // Fondo translúcido
    "border border-slate-700/50 " + // Borde sutil
    "rounded-full shadow-lg shadow-black/20"; // Forma de cápsula

  // --- Helper para crear items (DRY) ---
  const createNavItem = (text, svgIcon, isActive = false) => {
    const li = document.createElement("li");
    li.className = "flex-1"; // Ocupan el mismo ancho (50/50)

    const button = document.createElement("button");
    // Clases base
    button.className =
      "relative w-full flex items-center justify-center gap-2 " +
      "py-2.5 px-4 rounded-full text-sm font-semibold tracking-wide " +
      "transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ";

    // Clases condicionales (Activo vs Inactivo)
    if (isActive) {
      button.className +=
        "bg-indigo-600 text-white shadow-md shadow-indigo-500/25";
    } else {
      button.className +=
        "text-slate-400 hover:text-slate-100 hover:bg-slate-700/50";
    }

    // Icono SVG
    button.innerHTML = `
      ${svgIcon}
      <span>${text}</span>
    `;

    li.append(button);
    return { li, button };
  };

  // --- Iconos SVG ---
  const iconAdd = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>`;

  const iconList = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>`;

  // --- Construcción ---
  // Por defecto, ninguno o el primero puede estar activo, depende de tu lógica.
  // Aquí visualizo el primero activo como ejemplo.
  const itemAgregar = createNavItem("Agregar Usuario", iconAdd, true);
  const itemMostrar = createNavItem("Ver Usuarios", iconList, false);

  // Asignamos IDs o Data-attributes para tu lógica JS
  itemAgregar.button.dataset.target = "agregar";
  itemMostrar.button.dataset.target = "mostrar";

  listContainer.append(itemAgregar.li, itemMostrar.li);
  nav.append(listContainer);

  itemAgregar.button.addEventListener("click", () => {
    window.location.hash = "#AgregarUser";
  });

  itemMostrar.button.addEventListener("click", () => {
    window.location.hash = "#MostrarUsers";
  });

  return {
    nav,
    btns: {
      btnAgregar: itemAgregar.button,
      btnMostrar: itemMostrar.button,
    },
  };
};
