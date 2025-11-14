export const CabeceraThead = () => {
  const thead = document.createElement("thead");
  thead.className =
    "bg-slate-50 text-slate-600 uppercase text-xs font-bold tracking-wider";

  const headerRow = document.createElement("tr");
  const headers = [
    "Producto",
    "ID",
    "Precio",
    "Cant.",
    "Tamaño",
    "Categ.",
    "Material",
    "Estado",
    "Acciones",
  ];

  headers.forEach((text) => {
    const th = document.createElement("th");
    th.textContent = text;
    th.className = "px-6 py-4 border-b border-slate-200";
    headerRow.append(th);
  });

  thead.append(headerRow);

  return thead;
};
