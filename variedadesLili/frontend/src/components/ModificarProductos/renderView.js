import { getEstadoClasses } from "../../helpers/ModificarProductos/getEstadoProductos.js";
import API_URL from "../../utils/api.js";
import { renderEdit } from "./renderEdit.js";

export const renderView = (product, detailContent) => {
  // 🔥 ADAPTAMOS DIRECTO LAS PROPIEDADES
  product = {
    id_producto: product.id_producto,
    nombre: product.nombre_producto ?? product.nombre ?? "",
    imagen:
      product.imagen ??
      (product.url_foto_producto
        ? `${API_URL}${product.url_foto_producto}`
        : "https://via.placeholder.com/300x200?text=No+Img"),
    cantidad: product.cantidad ?? 0,
    descripcion: product.descripcion ?? "",
    precio: product.precio ?? 0,
    tamaño: product.tamano ?? product.tamaño ?? "",
    categoria: product.categoria ?? product.tipo ?? "",
    material: product.material ?? "",
    estado: product.estado ?? "Activo",
  };

  detailContent.innerHTML = ""; // Limpiamos contenido

  // --- Imagen Grande (Vista) ---
  const imgContainer = document.createElement("div");
  imgContainer.className =
    "relative group w-full mb-6 rounded-2xl overflow-hidden shadow-md bg-slate-100 dark:bg-slate-800";

  const detailImg = document.createElement("img");
  detailImg.src =
    product.imagen || "https://via.placeholder.com/300x200?text=No+Img";
  detailImg.alt = product.nombre;
  detailImg.className =
    "w-full h-64 object-cover transition-transform duration-700 ease-in-out group-hover:scale-105";

  // Badge de Estado
  // Suponiendo que esto va dentro de tu renderView o Card
  const statusLabel = document.createElement("span");

  // 1. Clases estructurales (Forma, posición, tipografía)
  statusLabel.className =
    "absolute top-3 right-3 z-10 " + // Posicionamiento sobre la imagen
    "inline-flex items-center gap-1.5 " + // Flex para alinear el puntito y texto
    "px-3 py-1 rounded-full " + // Forma de píldora
    "text-[10px] font-bold uppercase tracking-widest " + // Tipografía técnica
    "backdrop-blur-md transition-all duration-300 " + // Efecto cristal
    getEstadoClasses((product.estado || "").toLowerCase()); // 2. Inyectamos los colores

  // 3. Contenido HTML (Puntito + Texto)
  // El 'currentColor' hace que el puntito herede el color del texto definido en getEstadoClasses
  statusLabel.innerHTML = `
  <span class="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
  ${product.estado}
`;

  // Añadir al padre (ej. cardImageContainer)
  // cardImageContainer.append(statusLabel);

  imgContainer.append(detailImg, statusLabel);
  detailContent.append(imgContainer);

  // --- Grilla de Datos (Vista) ---
  const detailList = document.createElement("dl");
  detailList.className = "grid grid-cols-2 gap-x-4 gap-y-5 mb-6 text-sm";

  const addDetailItem = (label, value, isFull = false) => {
    const div = document.createElement("div");
    if (isFull) div.className = "col-span-2";

    const dt = document.createElement("dt");
    dt.textContent = label;
    dt.className =
      "text-xs text-slate-400 dark:text-slate-500 uppercase font-bold tracking-wider mb-1";

    const dd = document.createElement("dd");
    dd.textContent = value;
    dd.className = "text-slate-800 dark:text-slate-200 font-medium text-base";

    div.append(dt, dd);
    detailList.append(div);
  };

  addDetailItem("Nombre", product.nombre, true);
  addDetailItem("ID", `#${product.id_producto}`);
  addDetailItem("Precio", `$${Number(product.precio).toLocaleString()}`);
  addDetailItem("Categoría", product.categoria);
  addDetailItem("Stock", product.cantidad);
  addDetailItem("Tamaño", product.tamaño);
  addDetailItem("Material", product.material);

  detailContent.append(detailList);

  // --- Descripción (Vista) ---
  const fullDesc = document.createElement("div");
  fullDesc.className =
    "bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl border border-slate-100 dark:border-slate-700";
  const descTitle = document.createElement("h4");
  descTitle.textContent = "Descripción";
  descTitle.className =
    "text-xs text-slate-400 dark:text-slate-500 uppercase font-bold mb-2 tracking-wider";
  const descText = document.createElement("p");
  descText.textContent = product.descripcion;
  descText.className =
    "text-sm text-slate-600 dark:text-slate-300 leading-relaxed";
  fullDesc.append(descTitle, descText);
  detailContent.append(fullDesc);

  // --- Botones Footer (Vista) ---
  const detailActions = document.createElement("div");
  detailActions.className =
    "mt-8 pt-6 border-t border-slate-100 dark:border-slate-700";

  const btnEditar = document.createElement("button");
  btnEditar.textContent = "Editar Información";
  btnEditar.className =
    "w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2";

  // EVENTO CLAVE: Cambiar a Modo Edición
  btnEditar.addEventListener("click", () => {
    renderEdit(product, detailContent);
  });

  detailActions.append(btnEditar);
  detailContent.append(detailActions);
};
