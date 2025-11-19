export const headerTabla = (totalItems = 0) => {

  const headerContainer = document.createElement("div");
  headerContainer.className =
    "flex flex-row justify-between items-center gap-4 " + // Alineación
    "mb-6 pb-4 " + // Margen inferior interno y externo
    "border-b border-slate-100 dark:border-slate-700/50"; // Línea divisoria sutil

  // --- Título ---
  const titulo = document.createElement("h2");
  titulo.textContent = "Modificar Productos";
  titulo.className =
    "text-2xl md:text-3xl font-extrabold tracking-tight " + // Tipografía
    "bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent"; // Gradiente SPA

  // --- Contador (Badge) ---
  const contador = document.createElement("div");
  // Usamos innerHTML para insertar el punto pulsante y el texto
  contador.innerHTML = `
    <span class="flex h-2 w-2 relative mr-2">
      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
      <span class="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
    </span>
    ${totalItems} items
  `;
  
  contador.className =
    "inline-flex items-center px-3 py-1 rounded-full " + // Forma de píldora
    "text-xs font-bold uppercase tracking-wide " + // Texto técnico
    "bg-purple-50 text-purple-700 border border-purple-200 " + // Colores Light
    "dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800 " + // Colores Dark
    "shadow-sm transition-transform hover:scale-105 cursor-default"; // Micro-interacción

  headerContainer.append(titulo, contador);

  return headerContainer;
};
