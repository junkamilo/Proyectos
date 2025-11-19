export const CantidadProductos = () => {
    // --- Grupo: Cantidad (Ocupa 1 columna por defecto) ---
  const groupCantidad = document.createElement("div");
  groupCantidad.className = "flex flex-col gap-2 group"; // 'group' permite animar el label al hacer focus en el input

  // Label
  const labelCantidad = document.createElement("label");
  labelCantidad.textContent = "Cantidad disponible:";
  labelCantidad.setAttribute("for", "cantidad_producto"); // Accesibilidad
  // Estilo consistente de etiqueta animada
  labelCantidad.className =
    "text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1 transition-colors group-focus-within:text-purple-600 dark:group-focus-within:text-purple-400";

  // Input Number
  const inputCantidad = document.createElement("input");
  inputCantidad.type = "number";
  inputCantidad.id = "cantidad_producto";
  inputCantidad.name = "cantidad";
  inputCantidad.min = "0";
  inputCantidad.required = true;
  inputCantidad.placeholder = "Ej: 10";

  inputCantidad.className =
    "w-full rounded-lg border border-slate-300 dark:border-slate-600 " + // Estructura
    "bg-slate-50 dark:bg-slate-900/50 " + // Fondo sutil
    "text-slate-900 dark:text-white " + // Texto
    "px-4 py-2.5 shadow-sm " + // Padding y profundidad
    "placeholder:text-slate-400 dark:placeholder:text-slate-500 " + // Placeholder
    "transition-all duration-300 ease-in-out " + // Animación
    "focus:bg-white dark:focus:bg-slate-950 " + // Focus: Fondo
    "focus:border-purple-500 " + // Focus: Borde (Acento SPA)
    "focus:outline-none focus:ring-4 focus:ring-purple-500/20"; // Focus: Glow suave

  groupCantidad.append(labelCantidad, inputCantidad);

  return groupCantidad;
};
