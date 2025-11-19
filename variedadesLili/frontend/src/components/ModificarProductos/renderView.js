import { renderEdit } from "./renderEdit.js";

export const renderView = (product, detailContent) => {
  // 🔥 ADAPTAMOS DIRECTO LAS PROPIEDADES
  product = {
    id_producto: product.id_producto,
    nombre: product.nombre_producto ?? product.nombre ?? "",
    imagen:
      product.imagen ??
      (product.url_foto_producto
        ? `http://localhost:3000${product.url_foto_producto}`
        : "https://via.placeholder.com/300x200?text=No+Img"),
    cantidad: product.cantidad ?? 0,
    descripcion: product.descripcion ?? "",
    precio: product.precio ?? 0,
    tamaño: product.tamano ?? product.tamaño ?? "",
    tipo: product.categoria ?? product.tipo ?? "",
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
  const statusLabel = document.createElement("span");
  statusLabel.textContent = product.estado;
  let labelColor = "bg-slate-700/90 text-slate-100 shadow-slate-500/20"; // Default
  if (product.estado === "activo")
    labelColor = "bg-emerald-500/90 text-white shadow-emerald-500/20"; // Green modern
  if (product.estado === "agotado")
    labelColor = "bg-rose-500/90 text-white shadow-rose-500/20"; // Red modern
  statusLabel.className = `absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full shadow-lg backdrop-blur-sm uppercase tracking-wide ${labelColor}`;

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
  addDetailItem("Categoría", product.tipo);
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
