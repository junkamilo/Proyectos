export const EstadoProducto = () => {
  // --- Grupo: Estado (Select) (Ocupa 1 columna) ---
  const groupEstado = document.createElement("div");
  groupEstado.className = "flex flex-col gap-2";
  const labelEstado = document.createElement("label");
  labelEstado.textContent = "Estado:";
  labelEstado.className = "text-slate-600 font-medium";
  const selectEstado = document.createElement("select");
  selectEstado.name = "estado";
  selectEstado.className =
    "w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 focus:border-transparent"; // Añadida transición y focus:border-transparent
  ["activo", "inactivo", "agotado"].forEach((estado) => {
    const option = document.createElement("option");
    option.value = estado;
    option.textContent = estado.charAt(0).toUpperCase() + estado.slice(1);
    selectEstado.append(option);
  });
  groupEstado.append(labelEstado, selectEstado);

  return groupEstado;
};
