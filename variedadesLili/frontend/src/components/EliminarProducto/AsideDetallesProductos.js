export const AsideDetallesProductos = () => {

  const productDetailSection = document.createElement("aside");
  productDetailSection.className =
    // --- Layout y Visibilidad ---
    "w-full lg:w-1/3 flex-col hidden " + // Oculto por defecto, flex para estructura interna
    "h-fit max-h-[85vh] lg:max-h-[calc(100vh-6rem)] " + // Altura máxima responsiva
    "lg:sticky lg:top-24 " + // Sticky solo en desktop
    
    // --- Estilo Visual (Glass) ---
    "bg-white/90 dark:bg-slate-800/95 backdrop-blur-xl " + 
    "rounded-2xl " +
    "border border-white/50 dark:border-slate-700 " +
    "shadow-2xl shadow-purple-900/20 dark:shadow-black/50 " +

    // --- Comportamiento ---
    "overflow-y-auto custom-scrollbar " + // Scroll estilizado
    "animate-fade-in-right z-30 transition-all duration-300"; 

  // --- Header del Panel (Sticky Interno) ---
  const detailHeader = document.createElement("div");
  detailHeader.className =
    "flex justify-between items-center " +
    "px-6 py-4 mb-2 " + // Padding interno
    "sticky top-0 z-10 " + // Se pega al techo del aside al scrollear
    "bg-white/80 dark:bg-slate-800/80 backdrop-blur-md " + // Fondo propio para tapar contenido
    "border-b border-slate-100 dark:border-slate-700/50";

  const detailTitle = document.createElement("h3");
  detailTitle.textContent = "Detalles del Producto";
  // Título con gradiente de marca
  detailTitle.className =
    "text-lg font-extrabold tracking-tight " +
    "bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent";

  // --- Botón Cerrar (SVG Mejorado) ---
  const closeIconBtn = document.createElement("button");
  closeIconBtn.setAttribute("aria-label", "Cerrar detalles");
  closeIconBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  `;
  closeIconBtn.className =
    "p-2 rounded-full transition-colors duration-200 " +
    "text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-200 " +
    "hover:bg-slate-100 dark:hover:bg-slate-700 " + // Feedback de fondo
    "focus:outline-none focus:ring-2 focus:ring-purple-500";

  // Evento cerrar (Lógica original intacta)
  closeIconBtn.addEventListener("click", () =>
    productDetailSection.classList.add("hidden")
  );

  detailHeader.append(detailTitle, closeIconBtn);

  // --- Contenedor de Contenido Dinámico ---
  const detailContent = document.createElement("div");
  detailContent.className = "flex flex-col p-6 pt-2 gap-6"; // Espaciado interno

  productDetailSection.append(detailHeader, detailContent);

  return {
    productDetailSection,
    detailContent,
  };
};
