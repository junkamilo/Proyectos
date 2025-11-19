export const TamanoProducto = () => {
  // --- Grupo: Tamaño ---
  const groupTamano = document.createElement("div");
  groupTamano.className = "flex flex-col gap-2 group";

  // Label
  const labelTamano = document.createElement("label");
  labelTamano.textContent = "Tamaño:";
  labelTamano.setAttribute("for", "tamano_producto");
  labelTamano.className =
    "text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1 transition-colors group-focus-within:text-purple-600 dark:group-focus-within:text-purple-400";

  // Wrapper relativo para posicionar la flecha custom
  const selectWrapper = document.createElement("div");
  selectWrapper.className = "relative w-full";

  // Select Element
  const selectTamano = document.createElement("select");
  selectTamano.id = "tamano_producto";
  selectTamano.name = "tamano";

  selectTamano.className =
    "w-full rounded-lg border border-slate-300 dark:border-slate-600 " + // Estructura
    "bg-slate-50 dark:bg-slate-900/50 " + // Fondo sutil
    "text-slate-900 dark:text-white " + // Texto
    "pl-4 pr-10 py-2.5 shadow-sm " + // Padding (pr-10 deja espacio a la flecha)
    "appearance-none cursor-pointer " + // Elimina flecha nativa + cursor mano
    "transition-all duration-300 ease-in-out " + // Animación
    "focus:bg-white dark:focus:bg-slate-950 " + // Focus: Fondo
    "focus:border-purple-500 " + // Focus: Borde
    "focus:outline-none focus:ring-4 focus:ring-purple-500/20"; // Focus: Glow

  // Opciones
  ["pequeño", "mediano", "grande"].forEach((t) => {
    const option = document.createElement("option");
    option.value = t;
    option.textContent = t.charAt(0).toUpperCase() + t.slice(1);
    // Estilo básico para las opciones (soporte limitado por navegadores)
    option.className =
      "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200";
    selectTamano.append(option);
  });

  // Flecha Personalizada (SVG)
  const arrowIcon = document.createElement("div");
  arrowIcon.className =
    "absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 transition-colors group-hover:text-purple-600";
  arrowIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
    </svg>`;

  // Ensamblado
  selectWrapper.append(selectTamano, arrowIcon);
  groupTamano.append(labelTamano, selectWrapper);

  return groupTamano;
};
