export const CantidadProductos = () => {
  // --- Grupo: Cantidad (Ocupa 1 columna) ---
  const groupCantidad = document.createElement("div");
  groupCantidad.className = "flex flex-col gap-2";
  const labelCantidad = document.createElement("label");
  labelCantidad.textContent = "Cantidad disponible:";
  labelCantidad.className = "text-slate-600 font-medium";
  const inputCantidad = document.createElement("input");
  inputCantidad.type = "number";
  inputCantidad.name = "cantidad";
  inputCantidad.min = "0";
  inputCantidad.required = true;
  inputCantidad.placeholder = "Ej: 10";
  inputCantidad.className =
    "w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 focus:border-transparent"; // Añadida transición y focus:border-transparent
  groupCantidad.append(labelCantidad, inputCantidad);

  return groupCantidad;
};
