export const headerTabla = () => {
  const headerContainer = document.createElement("div");
  headerContainer.className = "flex justify-between items-center mb-6";

  const titulo = document.createElement("h2");
  titulo.textContent = "Eliminar Productos";
  titulo.className = "text-2xl font-bold text-slate-800";

  const contador = document.createElement("span");
  contador.textContent = `${5} items`; // Usamos dataToRender
  contador.className =
    "text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200";

  headerContainer.append(titulo, contador);
  

  return headerContainer
};
