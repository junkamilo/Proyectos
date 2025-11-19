export const CategoriaProducto = () => {

  // --- Grupo: Categoría ---
  const groupCategoria = document.createElement("div");
  groupCategoria.className = "flex flex-col gap-2 group";

  // Label
  const labelCategoria = document.createElement("label");
  labelCategoria.textContent = "Categoría:";
  labelCategoria.setAttribute("for", "categoria_producto");
  labelCategoria.className =
    "text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1 transition-colors group-focus-within:text-purple-600 dark:group-focus-within:text-purple-400";

  // Wrapper relativo para el icono
  const inputWrapper = document.createElement("div");
  inputWrapper.className = "relative w-full";

  // Icono de Etiqueta (Tag)
  const tagIcon = document.createElement("div");
  tagIcon.className =
    "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-purple-500 pointer-events-none";
  tagIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>`;

  // Input Text
  const inputCategoria = document.createElement("input");
  inputCategoria.type = "text";
  inputCategoria.id = "categoria_producto";
  inputCategoria.name = "categoria";
  inputCategoria.placeholder = "Ej: Alcancías, Decoración...";
  
  inputCategoria.className =
    "w-full rounded-lg border border-slate-300 dark:border-slate-600 " + // Estructura
    "bg-slate-50 dark:bg-slate-900/50 " + // Fondo sutil
    "text-slate-900 dark:text-white " + // Texto
    "pl-10 pr-4 py-2.5 shadow-sm " + // Padding (pl-10 deja espacio al icono)
    "placeholder:text-slate-400 dark:placeholder:text-slate-500 " + // Placeholder
    "transition-all duration-300 ease-in-out " + // Animación
    "focus:bg-white dark:focus:bg-slate-950 " + // Focus: Fondo
    "focus:border-purple-500 " + // Focus: Borde
    "focus:outline-none focus:ring-4 focus:ring-purple-500/20"; // Focus: Glow

  // Ensamblado
  inputWrapper.append(tagIcon, inputCategoria);
  groupCategoria.append(labelCategoria, inputWrapper);

  return groupCategoria;
};
