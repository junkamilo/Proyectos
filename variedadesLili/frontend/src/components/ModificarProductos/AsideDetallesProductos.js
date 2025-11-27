export const AsideDetallesProductos = () => {

  const productDetailSection = document.createElement("aside");
  productDetailSection.className =
    // --- Layout y Posicionamiento ---
    "w-full lg:w-1/3 flex-col hidden " + // Oculto por defecto
    "h-fit max-h-[85vh] lg:max-h-[calc(100vh-8rem)] " + // Altura máxima responsiva
    "lg:sticky lg:top-24 " + // Sticky en desktop
    // --- Estilo Visual (Glassmorphism) ---
    "bg-white/90 dark:bg-slate-800/95 backdrop-blur-xl " + // Fondo translúcido
    "rounded-2xl " + // Bordes redondeados
    "shadow-2xl shadow-purple-900/20 dark:shadow-black/50 " + // Sombra tintada
    "border border-white/50 dark:border-slate-700 " + // Borde sutil
    // --- Scroll y Animación ---
    "overflow-y-auto custom-scrollbar " + // Scroll personalizado
    "animate-fade-in-right transition-all duration-300 z-20"; // Animación entrada

  // --- Header del Panel (Sticky interno) ---
  const detailHeader = document.createElement("div");
  detailHeader.className =
    "flex justify-between items-center " +
    "px-6 py-4 mb-2 " + // Espaciado interno
    "border-b border-slate-100 dark:border-slate-700/50 " + // Separador
    "sticky top-0 z-10 " + // Sticky para que no desaparezca al scrollear contenido
    "bg-white/80 dark:bg-slate-800/80 backdrop-blur-md"; // Fondo propio para tapar contenido al scrollear

  const detailTitle = document.createElement("h3");
  detailTitle.textContent = "Detalles del Producto";
  // Tipografía de Marca
  detailTitle.className =
    "text-lg font-extrabold tracking-tight " +
    "bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent";

  // --- Botón Cerrar (Mejorado UX) ---
  const closeIconBtn = document.createElement("button");
  // Icono SVG "X" limpio
  closeIconBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  `;
  closeIconBtn.className =
    "p-2 rounded-full transition-colors duration-200 " +
    "text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-200 " +
    "hover:bg-slate-100 dark:hover:bg-slate-700 " + // Fondo en hover
    "focus:outline-none focus:ring-2 focus:ring-purple-500"; // Accesibilidad

  closeIconBtn.addEventListener("click", () =>
    productDetailSection.classList.add("hidden")
  );

  detailHeader.append(detailTitle, closeIconBtn);

  // --- Contenedor de Contenido ---
  const detailContent = document.createElement("div");
  detailContent.className = "flex flex-col p-6 pt-2"; // Padding cómodo

  productDetailSection.append(detailHeader, detailContent);

  return {
    productDetailSection,
    detailContent,
  };
};
