import { getAllProductosServices } from "../../services/Productos/productosServices";
import { CabeceraThead } from "./CabeceraThead";
import { CuerpoTbodyTabla } from "./CuerpoTbodyTabla";
import { headerTabla } from "./headerTabla";

export const TablaInventario = async (productos = []) => {
  // Contenedor principal (tabla + panel de detalles)
  const mainContainer = document.createElement("div");
  mainContainer.className =
    "flex flex-col lg:flex-row items-start gap-8 " + // Layout y espaciado
    "w-full max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8 " + // Márgenes
    "animate-fade-in-up"; // Animación de entrada global

  // Sección que contiene solo la tabla (El "Card" de la tabla)
  const section = document.createElement("section");
  section.className =
    "w-full lg:w-2/3 flex flex-col gap-6 " + // Ancho (2/3 en desktop)
    "p-6 sm:p-8 " + // Padding interno
    "bg-white/80 dark:bg-slate-800/90 backdrop-blur-xl " + // Efecto Glass
    "shadow-2xl shadow-purple-900/10 dark:shadow-black/50 " + // Sombra tintada
    "rounded-2xl border border-white/50 dark:border-slate-700 " + // Bordes
    "transition-all duration-500"; // Transiciones suaves

  //Instanciamos Get productos para hacer ek conteo de productos
  const productosConteo = await getAllProductosServices();
  const total = productosConteo.data.length;
  const headerContainer = headerTabla(total);
  section.append(headerContainer);

  // Wrapper para permitir scroll horizontal en móviles
  const tableWrapper = document.createElement("div");
  tableWrapper.className =
    "w-full overflow-x-auto rounded-xl " +
    "border border-slate-200/60 dark:border-slate-700 " + // Borde del wrapper
    "custom-scrollbar"; // Scrollbar personalizada (Ver CSS)

  // Tabla principal
  const table = document.createElement("table");
  table.className =
    "w-full text-left border-collapse whitespace-nowrap " +
    "text-slate-600 dark:text-slate-300"; // Texto base

  // Cabecera de columnas
  const thead = CabeceraThead();

  // Cuerpo de la tabla + sección de detalles del producto (Logic preservation)
  const { tbody, productDetailSection } = await CuerpoTbodyTabla(productos);

  // Ensamblado final de la tabla
  table.append(thead, tbody);
  tableWrapper.append(table);
  section.append(tableWrapper);

  // Agregar tabla y panel de detalles al contenedor principal
  mainContainer.append(section, productDetailSection);

  return mainContainer;
};
