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
