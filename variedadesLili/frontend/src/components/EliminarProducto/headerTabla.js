export const headerTabla = () => {

  const headerContainer = document.createElement("div");
  headerContainer.className =
    "flex flex-row justify-between items-center gap-4 " + // Layout
    "mb-6 pb-4 " + // Espaciado
    "border-b border-slate-100 dark:border-slate-700/50"; // Separador

  // --- Título (Tema Rojo) ---
  const titulo = document.createElement("h2");
  titulo.textContent = "Eliminar Productos";
  titulo.className =
    "text-2xl md:text-3xl font-extrabold tracking-tight " +
    "bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent"; // Gradiente de Alerta

  // --- Contador / Badge (Tema Rojo) ---
  const contador = document.createElement("div");
  // HTML interno para el punto pulsante (Ping Animation)
  contador.innerHTML = `
    <span class="flex h-2 w-2 relative mr-2">
      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
      <span class="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
    </span>
    ${5} items
  `;

  contador.className =
    "inline-flex items-center px-3 py-1 rounded-full " + // Forma Píldora
    "text-xs font-bold uppercase tracking-wide " + // Tipografía
    "bg-red-50 text-red-700 border border-red-200 " + // Colores Light (Alerta)
    "dark:bg-red-900/20 dark:text-red-300 dark:border-red-800 " + // Colores Dark
    "shadow-sm cursor-default transition-transform hover:scale-105";

  headerContainer.append(titulo, contador);

  return headerContainer;
};
