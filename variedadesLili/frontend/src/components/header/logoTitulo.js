const logoTitulo = () => {
  // --- Contenedor (Enlace) ---
  const container = document.createElement("a");
  container.href = "#/"; // Enlace a la página de inicio
  container.setAttribute("aria-label", "Variedades Lili - Ir a Inicio");
  container.className =
    "logoTituloContainer group flex items-center gap-2.5 rounded-lg " +
    "transition-transform duration-300 ease-in-out " +
    "motion-reduce:transform-none hover:scale-105 active:scale-95 " + // Interacción táctil
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 " +
    "focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100 " +
    "dark:focus-visible:ring-offset-slate-900"; // Accesibilidad

  // --- Icono SVG (El "Logo") ---
  const logoIcon = document.createElement("div");
  logoIcon.className = "flex-shrink-0"; // Evita que el icono se encoja
  // SVG en línea de una "chispa" o "estrella"
  logoIcon.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path 
        d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" 
        class="
          fill-purple-500 stroke-pink-500/50 
          transition-colors duration-300 ease-in-out 
          group-hover:fill-pink-500 
          dark:fill-purple-400 dark:group-hover:fill-pink-400
        " 
        stroke-width="1"
      />
    </svg>`;

  // --- Título (H1) ---
  const title = document.createElement("h1");
  title.textContent = "Variedades Lili";
  // Gradiente actualizado para coherencia SPA y 'cursor-pointer' eliminado
  title.className =
    "text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent animate-gradient-shift";

  // Ensamblado
  container.append(logoIcon, title);
  return container;
};

export default logoTitulo;
