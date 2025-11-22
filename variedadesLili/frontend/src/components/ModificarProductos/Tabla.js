import { getAllProductosServices } from "../../services/Productos/productosServices";
import { CabeceraThead } from "./CabeceraThead";
import { CuerpoTbodyTabla } from "./CuerpoTbodyTabla";
import { headerTabla } from "./headerTabla";

// TablaInventario.js
export const TablaInventario = async (productos = []) => {
  // Contenedor principal
  const mainContainer = document.createElement("div");
  mainContainer.className =
    "relative flex flex-col lg:flex-row items-start gap-6 " + // Gap reducido para mejor cohesión
    "w-full max-w-[1600px] mx-auto mt-6 px-4 sm:px-6 lg:px-8 " + // Max-width amplio para dashboards
    "animate-fade-in-up transition-all duration-500 ease-out";

  // Sección Tabla ("Card" principal)
  // CAMBIO CLAVE: 'flex-1 w-full min-w-0'. Elimina 'lg:w-2/3' para que llene todo el espacio inicialmente.
  const section = document.createElement("section");
  section.className =
    "flex-1 w-full min-w-0 flex flex-col gap-6 " + // min-w-0 evita desbordes en flex
    "p-5 sm:p-6 lg:p-8 " +
    "bg-slate-900/60 backdrop-blur-xl " + // Fondo oscuro moderno
    "border border-slate-800/60 " + // Borde sutil
    "shadow-2xl shadow-black/20 " +
    "rounded-2xl transition-all duration-500 ease-in-out"; // Transición suave al redimensionar

  // Header dinámico
  // Nota: Asumo que headerTabla devuelve un nodo. Si necesitas estilos ahí, avísame.
  const productosConteo = await getAllProductosServices(); // Tu lógica original
  const total = productosConteo.data.length;
  const headerContainer = headerTabla(total);
  section.append(headerContainer);

  // Wrapper Scroll
  const tableWrapper = document.createElement("div");
  tableWrapper.className =
    "w-full overflow-x-auto rounded-xl " +
    "border border-slate-800/50 bg-slate-900/30 " + // Fondo sutil para la "pista" de la tabla
    "custom-scrollbar";

  // Tabla
  const table = document.createElement("table");
  table.className =
    "w-full text-left border-collapse whitespace-nowrap " +
    "text-slate-400 text-sm"; // Tipografía base refinada

  // Construcción de tabla (Lógica preservada)
  const thead = CabeceraThead();
  const { tbody, productDetailSection } = await CuerpoTbodyTabla(productos);

  table.append(thead, tbody);
  tableWrapper.append(table);
  section.append(tableWrapper);

  // Renderizado
  mainContainer.append(section, productDetailSection);

  return mainContainer;
};

// AsideDetallesProductos.js
export const AsideDetallesProductos = () => {
  const productDetailSection = document.createElement("aside");

  // CLAVE DE DISEÑO:
  // 'hidden' por defecto. Cuando se muestre, 'lg:w-[400px]' forzará a la tabla a encogerse.
  productDetailSection.className =
    // --- Layout Responsivo ---
    "hidden flex-col " + // Oculto inicialmente
    "w-full lg:w-[400px] xl:w-[450px] shrink-0 " + // Ancho fijo rígido en desktop, shrink-0 impide que se aplaste
    "h-[85vh] lg:h-[calc(100vh-6rem)] sticky top-24 " + // Sticky position
    // --- Estética Glass Dark ---
    "bg-slate-900/80 backdrop-blur-2xl " +
    "border-l border-t border-white/10 lg:border border-slate-700/50 " + // Bordes sutiles
    "rounded-t-2xl lg:rounded-2xl " +
    "shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] " + // Sombra profunda
    "z-30 overflow-hidden transition-all duration-300 animate-slide-in-right";

  // Header del Aside
  const detailHeader = document.createElement("div");
  detailHeader.className =
    "flex justify-between items-center " +
    "px-6 py-5 " +
    "bg-gradient-to-b from-slate-800/50 to-transparent " + // Gradiente sutil superior
    "border-b border-slate-700/50 backdrop-blur-md";

  const detailTitle = document.createElement("h3");
  detailTitle.textContent = "Ficha Técnica";
  detailTitle.className =
    "text-base font-bold uppercase tracking-wider text-slate-200";

  // Botón Cerrar
  const closeIconBtn = document.createElement("button");
  closeIconBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  `;
  closeIconBtn.className =
    "p-2 -mr-2 rounded-lg " +
    "text-slate-400 transition-all duration-200 " +
    "hover:text-white hover:bg-white/10 hover:rotate-90 " + // Micro-interacción rotación
    "focus:outline-none focus:ring-2 focus:ring-indigo-500/50";

  closeIconBtn.addEventListener("click", () => {
    // Animación de salida manual podría ir aquí, pero por ahora toggle simple
    productDetailSection.classList.add("hidden");
    productDetailSection.classList.remove("flex");
  });

  detailHeader.append(detailTitle, closeIconBtn);

  // Contenedor Scrollable
  const detailContent = document.createElement("div");
  detailContent.className =
    "flex flex-col p-6 gap-4 overflow-y-auto custom-scrollbar h-full";

  productDetailSection.append(detailHeader, detailContent);

  return {
    productDetailSection,
    detailContent,
  };
};
