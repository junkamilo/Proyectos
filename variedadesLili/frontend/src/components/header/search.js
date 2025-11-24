const search = () => {

  // --- Contenedor (Relativo) ---
  const container = document.createElement("div");
  // Sizing (Mobile-first)
  container.className = "searchContainer relative w-full md:w-64 lg:w-72";

  // --- Input ---
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Buscar alcancías...";
  input.className =
    "w-full h-10 border border-transparent rounded-full " + // Estructura
    "pl-4 pr-10 text-sm " + // Padding
    "bg-slate-500/10 dark:bg-slate-500/20 " + // Fondo (Coherencia 'glass')
    "text-slate-900 dark:text-slate-100 " + // Color de texto
    "placeholder:text-slate-500 dark:placeholder:text-slate-400 " + // Placeholder
    "transition-all duration-300 ease-in-out " + // Animación
    "hover:bg-slate-500/20 dark:hover:bg-slate-500/30 " + // Hover
    "focus:outline-none focus:bg-slate-500/20 dark:focus:bg-slate-500/30 " + // Focus
    "focus:ring-2 focus:ring-purple-500 " + // Focus Ring (Acento SPA)
    "focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-900"; // Offset

  // --- Botón (Icono) ---
  const button = document.createElement("button");
  button.type = "button"; // Buena práctica para accesibilidad
  button.className =
    "absolute top-1/2 -translate-y-1/2 right-2 h-7 w-7 flex items-center justify-center " + // Posición y tamaño
    "rounded-full " +
    "text-slate-500 dark:text-slate-400 " + // Color
    "hover:text-purple-600 dark:hover:text-purple-400 " + // Hover (Acento SPA)
    "focus:outline-none focus:text-purple-600 dark:focus:text-purple-400 " + // Focus (no ring, ya está dentro del input)
    "transition-colors duration-200 ease-in-out";

  button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  `;
  button.setAttribute("aria-label", "Buscar"); // Accesibilidad

  container.append(input, button);
  return container;
};

export default search;
