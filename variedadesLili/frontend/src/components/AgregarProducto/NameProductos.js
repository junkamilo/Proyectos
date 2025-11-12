export const NameProductos = () => {
  // --- Grupo: Nombre (Ocupa 2 columnas) ---
  const groupNombre = document.createElement("div");
  groupNombre.className = "flex flex-col gap-2 md:col-span-2"; // Añadido md:col-span-2
  const labelNombre = document.createElement("label");
  labelNombre.textContent = "Nombre del producto:";
  labelNombre.className = "text-slate-600 font-medium";
  const inputNombre = document.createElement("input");
  inputNombre.type = "text";
  inputNombre.name = "nombre_producto";
  inputNombre.placeholder = "Ej: Alcancía de cerámica";
  inputNombre.required = true;
  inputNombre.className =
    "w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 focus:border-transparent"; // Añadida transición y focus:border-transparent
  groupNombre.append(labelNombre, inputNombre);

  return groupNombre;
};
