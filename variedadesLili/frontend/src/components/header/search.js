const search = () => {
  const container = document.createElement("div");
  // 'relative' para posicionar el botón de icono
  container.className = "searchContainer relative";

  // Input
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Buscar alcancías...";

  // --- Clases de Tailwind Aplicadas (Input) ---
  // Estilo: w-full (móvil) sm:w-64 (escritorio), rounded-full, border
  // Espaciado: pl-4 (izquierda) pr-10 (derecha, para el icono)
  // Interacción: focus usa el color primario (rosa)
  input.className =
    "w-full sm:w-64 border border-slate-300 rounded-full py-2 pl-4 pr-10 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300";

  // Botón (Icono)
  const button = document.createElement("button");
  // --- Clases de Tailwind Aplicadas (Button) ---
  // Posición: 'absolute' dentro del 'relative'
  // Estilo: 'rounded-full' para un hover circular
  // Color: 'slate-400' que cambia a 'pink-600' en hover
  button.className =
    "absolute top-1/2 -translate-y-1/2 right-2 p-2 text-slate-400 hover:text-pink-600 rounded-full transition-colors duration-200";

  // Icono SVG de Lupa (reemplaza 'textContent')
  button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  `;

  container.append(input, button);
  return container;
};

export default search;
