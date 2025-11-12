export const PrecioProducto = () => {
  // --- Grupo: Precio (Ocupa 1 columna) ---
  const groupPrecio = document.createElement("div");
  groupPrecio.className = "flex flex-col gap-2";
  const labelPrecio = document.createElement("label");
  labelPrecio.textContent = "Precio:";
  labelPrecio.className = "text-slate-600 font-medium";
  const inputPrecio = document.createElement("input");
  inputPrecio.type = "number";
  inputPrecio.name = "precio";
  inputPrecio.min = "0";
  inputPrecio.step = "0.01";
  inputPrecio.placeholder = "Ej: 15000";
  inputPrecio.required = true;
  inputPrecio.className =
    "w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 focus:border-transparent"; // Añadida transición y focus:border-transparent
  groupPrecio.append(labelPrecio, inputPrecio);

  return groupPrecio;
};
