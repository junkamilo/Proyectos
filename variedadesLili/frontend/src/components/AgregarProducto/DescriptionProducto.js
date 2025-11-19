export const DescriptionProducto = () => {
  // --- Grupo: Descripción (Ocupa 2 columnas) ---
  const groupDescripcion = document.createElement("div");
  groupDescripcion.className = "flex flex-col gap-2 md:col-span-2 group";

  // Label
  const labelDescripcion = document.createElement("label");
  labelDescripcion.textContent = "Descripción del producto:";
  labelDescripcion.setAttribute("for", "descripcion_producto"); // Accesibilidad
  // Mismo estilo de label que los anteriores para consistencia
  labelDescripcion.className =
    "text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1 transition-colors group-focus-within:text-purple-600 dark:group-focus-within:text-purple-400";

  // Textarea
  const textareaDescripcion = document.createElement("textarea");
  textareaDescripcion.id = "descripcion_producto";
  textareaDescripcion.name = "descripcion";
  textareaDescripcion.rows = "4"; // Ligeramente más alto por defecto
  textareaDescripcion.placeholder =
    "Ej: Alcancía pintada a mano con diseño floral, ideal para regalo...";

  textareaDescripcion.className =
    "w-full rounded-lg border border-slate-300 dark:border-slate-600 " + // Estructura
    "bg-slate-50 dark:bg-slate-900/50 " + // Fondo sutil
    "text-slate-900 dark:text-white " + // Texto
    "px-4 py-3 shadow-sm " + // Padding cómodo
    "placeholder:text-slate-400 dark:placeholder:text-slate-500 " + // Placeholder
    "resize-y " + // Solo redimensión vertical
    "transition-all duration-300 ease-in-out " + // Animación
    "focus:bg-white dark:focus:bg-slate-950 " + // Focus: Fondo
    "focus:border-purple-500 " + // Focus: Borde
    "focus:outline-none focus:ring-4 focus:ring-purple-500/20"; // Focus: Glow

  groupDescripcion.append(labelDescripcion, textareaDescripcion);

  return groupDescripcion;
};
