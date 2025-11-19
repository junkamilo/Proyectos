export const NameProductos = () => {

  // --- Grupo: Nombre (Ocupa 2 columnas) ---
  const groupNombre = document.createElement("div");
  groupNombre.className = "flex flex-col gap-2 md:col-span-2 group";

  // Label
  const labelNombre = document.createElement("label");
  labelNombre.textContent = "Nombre del producto:";
  labelNombre.setAttribute("for", "nombre_producto"); // Accesibilidad
  labelNombre.className =
    "text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1 transition-colors group-focus-within:text-purple-600 dark:group-focus-within:text-purple-400";

  // Input
  const inputNombre = document.createElement("input");
  inputNombre.type = "text";
  inputNombre.id = "nombre_producto";
  inputNombre.name = "nombre_producto";
  inputNombre.placeholder = "Ej: Alcancía de cerámica edición especial";
  inputNombre.required = true;
  
  inputNombre.className =
    "w-full rounded-lg border border-slate-300 dark:border-slate-600 " + // Estructura Base
    "bg-slate-50 dark:bg-slate-900/50 " + // Fondo sutil (no blanco puro)
    "text-slate-900 dark:text-white " + // Texto legible
    "px-4 py-2.5 shadow-sm " + // Espaciado y profundidad
    "placeholder:text-slate-400 dark:placeholder:text-slate-500 " + // Placeholder discreto
    "transition-all duration-300 ease-in-out " + // Transiciones suaves
    "focus:bg-white dark:focus:bg-slate-950 " + // Focus: Fondo se ilumina
    "focus:border-purple-500 " + // Focus: Borde Acento
    "focus:outline-none focus:ring-4 focus:ring-purple-500/20"; // Focus: Glow suave (Acento SPA)

  groupNombre.append(labelNombre, inputNombre);

  return groupNombre;
};
