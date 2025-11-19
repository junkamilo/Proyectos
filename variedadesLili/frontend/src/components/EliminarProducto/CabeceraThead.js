export const CabeceraThead = () => {

  const thead = document.createElement("thead");
  thead.className =
    "bg-slate-50/95 dark:bg-slate-800/95 backdrop-blur-sm " + // Fondo Glass
    "text-slate-500 dark:text-slate-400 " + // Color sutil
    "uppercase text-xs font-semibold tracking-wider " + // Tipografía técnica
    "sticky top-0 z-10 " + // Fijación
    "shadow-sm border-b border-slate-200 dark:border-slate-700"; // Separador

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
    th.scope = "col"; // Accesibilidad

    // Definimos la alineación basada en el tipo de dato (Mejora de UI)
    let alignmentClass = "text-left"; // Por defecto
    if (text === "Acciones") {
      alignmentClass = "text-center";
    } else if (["Precio", "Cant.", "ID"].includes(text)) {
      alignmentClass = "text-right";
    }

    th.className = `px-6 py-4 whitespace-nowrap transition-colors ${alignmentClass}`;
    headerRow.append(th);
  });

  thead.append(headerRow);

  return thead;
};
