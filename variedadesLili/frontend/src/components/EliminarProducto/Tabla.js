import { CabeceraThead } from "./CabeceraThead";
import { CuerpoTbodyTabla } from "./CuerpoTbodyTabla";
import { headerTabla } from "./headerTabla";

export const TablaEliminarProducto = async (productos = []) => {
  const mainContainer = document.createElement("div");
  mainContainer.className =
    "relative flex flex-col lg:flex-row items-start gap-6 " +
    "w-full max-w-[1600px] mx-auto mt-6 px-4 sm:px-6 lg:px-8 " +
    "animate-fade-in-up transition-all duration-500 ease-out";

  const section = document.createElement("section");
  section.className =
    "flex-1 w-full min-w-0 flex flex-col gap-6 " +
    "p-5 sm:p-6 lg:p-8 " +
    "bg-slate-900/60 backdrop-blur-xl " + // Estilo Dark Glass
    "border border-slate-800/60 " +
    "shadow-2xl shadow-black/20 " +
    "rounded-2xl transition-all duration-500 ease-in-out";

  // Encabezado (Titulo y Buscador)
  const headerContainer = headerTabla();
  section.append(headerContainer);

  // --- Wrapper con Scroll Horizontal ---
  const tableWrapper = document.createElement("div");
  tableWrapper.className =
    "w-full overflow-x-auto rounded-xl " +
    "border border-slate-800/50 bg-slate-900/30 " + // Fondo de pista sutil
    "custom-scrollbar"; // Tu clase CSS de scroll

  // --- Tabla ---
  const table = document.createElement("table");
  table.id = "tabla-productos";
  table.className =
    "w-full text-left border-collapse whitespace-nowrap " +
    "text-slate-400 text-sm"; // Texto legible y con buen contraste en dark mode

  // Cabecera (Thead)
  const thead = CabeceraThead();

  // --- Lógica de Cuerpo y Aside (Preservada) ---
  // Mantenemos tu 'fix real' de seguridad
  const { tbody, productDetailSection } =
    (await CuerpoTbodyTabla(productos)) ?? {};

  const safeTbody = tbody ?? document.createElement("tbody");
  const safeAside = productDetailSection ?? document.createElement("aside");

  // Ensamblado
  table.append(thead, safeTbody);
  tableWrapper.append(table);
  section.append(tableWrapper);

  mainContainer.append(section, safeAside);

  return mainContainer;
};
