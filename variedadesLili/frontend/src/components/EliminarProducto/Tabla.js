import { CabeceraThead } from "./CabeceraThead";
import { CuerpoTbodyTabla } from "./CuerpoTbodyTabla";
import { headerTabla } from "./headerTabla";

export const TablaEliminarProducto = async (productos = []) => {
  // Contenedor principal (tabla + panel de detalles)
  const mainContainer = document.createElement("div");
  mainContainer.className =
    "flex flex-col md:flex-row gap-6 w-full max-w-7xl mx-auto mt-10 px-4";

  // Sección que contiene solo la tabla
  const section = document.createElement("section");
  section.className =
    "w-full md:w-2/3 p-6 bg-white shadow-xl rounded-xl border border-slate-200 transition-all duration-300";

  // Encabezado con el título y acciones superiores
  const headerContainer = headerTabla();
  section.append(headerContainer);

  // Wrapper para permitir scroll horizontal en móviles
  const tableWrapper = document.createElement("div");
  tableWrapper.className = "overflow-x-auto rounded-lg border border-slate-200";

  // Tabla principal
  const table = document.createElement("table");
  table.className = "w-full text-left border-collapse whitespace-nowrap";

  // Cabecera de columnas
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
