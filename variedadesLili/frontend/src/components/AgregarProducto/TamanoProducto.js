export const TamanoProducto = () => {
  // --- Grupo: Tamaño (Select) (Ocupa 1 columna) ---
  const groupTamano = document.createElement("div");
  groupTamano.className = "flex flex-col gap-2";
  const labelTamano = document.createElement("label");
  labelTamano.textContent = "Tamaño:";
  labelTamano.className = "text-slate-600 font-medium";
  const selectTamano = document.createElement("select");
  selectTamano.name = "tamano";
  selectTamano.className =
    "w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 focus:border-transparent"; // Añadida transición y focus:border-transparent
  ["pequeño", "mediano", "grande"].forEach((t) => {
    const option = document.createElement("option");
    option.value = t;
    option.textContent = t.charAt(0).toUpperCase() + t.slice(1);
    selectTamano.append(option);
  });
  groupTamano.append(labelTamano, selectTamano);

  return groupTamano;
};
