import { CabeceraThead } from "./CabeceraThead";
import { CuerpoTbodyTabla } from "./CuerpoTbodyTabla";
import { headerTabla } from "./headerTabla";

export const TablaEliminarProducto = async (productos = []) => {

  // Contenedor principal (tabla + panel de detalles)
  const mainContainer = document.createElement("div");
  mainContainer.className =
    "flex flex-col lg:flex-row items-start gap-8 " + // Layout optimizado para desktop
    "w-full max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8 " + // Márgenes y ancho máximo
    "animate-fade-in-up"; // Animación de entrada

  // Sección que contiene solo la tabla
  const section = document.createElement("section");
  section.className =
    "w-full lg:w-2/3 flex flex-col gap-6 " + // Ancho
    "p-6 sm:p-8 " + // Padding interno
    "bg-white/80 dark:bg-slate-800/90 backdrop-blur-xl " + // Fondo Glass
    "shadow-2xl shadow-purple-900/10 dark:shadow-black/50 " + // Sombra Sutil
    "rounded-2xl border border-white/50 dark:border-slate-700 " + // Bordes
    "transition-all duration-500"; // Suavidad

  // Encabezado con el título y acciones superiores
  const headerContainer = headerTabla();
  section.append(headerContainer);

  // Wrapper para permitir scroll horizontal en móviles
  const tableWrapper = document.createElement("div");
  tableWrapper.className =
    "w-full overflow-x-auto rounded-xl " +
    "border border-slate-200/60 dark:border-slate-700 " +
    "custom-scrollbar"; // Scrollbar estilizado (ver CSS global)

  // Tabla principal
  const table = document.createElement("table");
  table.className =
    "w-full text-left border-collapse whitespace-nowrap " +
    "text-slate-600 dark:text-slate-300";

  // Cabecera de columnas (Ya tiene estilo Sticky/Glass por el componente importado)
  const thead = CabeceraThead();

  // Cuerpo de la tabla + sección de detalles del producto
  const { tbody, productDetailSection } = await CuerpoTbodyTabla(productos);

  // Ensamblado final de la tabla
  table.append(thead, tbody);
  tableWrapper.append(table);
  section.append(tableWrapper);

  // Agregar tabla y panel de detalles al contenedor principal
  mainContainer.append(section, productDetailSection);

  return mainContainer;
};
