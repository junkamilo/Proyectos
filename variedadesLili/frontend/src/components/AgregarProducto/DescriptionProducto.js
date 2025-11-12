export const DescriptionProducto = () => {
  // --- Grupo: Descripción (Ocupa 2 columnas) ---
  const groupDescripcion = document.createElement("div");
  groupDescripcion.className = "flex flex-col gap-2 md:col-span-2"; // Añadido md:col-span-2
  const labelDescripcion = document.createElement("label");
  labelDescripcion.textContent = "Descripción del producto:";
  labelDescripcion.className = "text-slate-600 font-medium";
  const textareaDescripcion = document.createElement("textarea");
  textareaDescripcion.name = "descripcion";
  textareaDescripcion.rows = "3";
  textareaDescripcion.placeholder =
    "Ej: Alcancía pintada a mano con diseño floral.";
  textareaDescripcion.className =
    "w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-y transition-all duration-300 focus:border-transparent"; // Cambiado a resize-y y añadida transición
  groupDescripcion.append(labelDescripcion, textareaDescripcion);

  return groupDescripcion;
};
