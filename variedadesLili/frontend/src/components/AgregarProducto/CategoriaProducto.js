export const CategoriaProducto = () => {
  // --- Grupo: Categoría (Ocupa 1 columna) ---
  const groupCategoria = document.createElement("div");
  groupCategoria.className = "flex flex-col gap-2";
  const labelCategoria = document.createElement("label");
  labelCategoria.textContent = "Categoría:";
  labelCategoria.className = "text-slate-600 font-medium";
  const inputCategoria = document.createElement("input");
  inputCategoria.type = "text";
  inputCategoria.name = "categoria";
  inputCategoria.placeholder = "Ej: Alcancía, Decoración, etc.";
  inputCategoria.className =
    "w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 focus:border-transparent"; // Añadida transición y focus:border-transparent
  groupCategoria.append(labelCategoria, inputCategoria);

  return groupCategoria;
};
