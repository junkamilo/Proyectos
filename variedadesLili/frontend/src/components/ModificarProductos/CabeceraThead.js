export const CabeceraThead = () => {

  const thead = document.createElement("thead");
  thead.className =
    "bg-slate-50/95 dark:bg-slate-800/95 backdrop-blur-sm " + // Fondo Glass casi opaco
    "text-slate-500 dark:text-slate-400 " + // Color de texto sutil
    "uppercase text-xs font-semibold tracking-wider " + // Tipografía técnica
    "sticky top-0 z-10 " + // Fijo arriba
    "shadow-sm"; // Pequeña sombra para separar del body

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
    th.scope = "col"; // Mejora de Accesibilidad

    // Clases Base
    let classes =
      "px-6 py-4 whitespace-nowrap " +
      "border-b border-slate-200 dark:border-slate-700 " +
      "transition-colors duration-200";

    // Alineación visual basada en el contenido (Mejora de UI)
    if (text === "Acciones") {
      classes += " text-center"; // Acciones centradas
    } else if (["Precio", "Cant.", "ID"].includes(text)) {
      classes += " text-right"; // Números a la derecha
    } else {
      classes += " text-left"; // Texto a la izquierda
    }

    th.className = classes;
    headerRow.append(th);
  });

  thead.append(headerRow);

  return thead;
};
