import { renderEdit } from "./renderEdit.js";

import { renderEdit } from "./renderEdit.js";

export const renderView = (product, detailContent) => {
  // 🔥 ADAPTAMOS DIRECTO LAS PROPIEDADES
  product = {
    id: product.id_producto,
    nombre: product.nombre_producto,
    imagen: `http://localhost:3000${product.url_foto_producto}`,
    cantidad: product.cantidad,
    descripcion: product.descripcion,
    precio: product.precio,
    tamaño: product.tamano,
    tipo: product.categoria,
    material: product.material,
    estado: product.estado,
  };

  detailContent.innerHTML = ""; // Limpiamos contenido

  // --- Imagen Grande (Vista) ---
  const imgContainer = document.createElement("div");
  imgContainer.className = "relative group";

  const detailImg = document.createElement("img");
  detailImg.src =
    product.imagen || "https://via.placeholder.com/300x200?text=No+Img";
  detailImg.alt = product.nombre;
  detailImg.className =
    "w-full h-56 object-cover rounded-lg border border-slate-200 shadow-sm bg-white";

  // Badge de Estado
  const statusLabel = document.createElement("span");
  statusLabel.textContent = product.estado;
  let labelColor = "bg-gray-800";
  if (product.estado === "activo") labelColor = "bg-green-600";
  if (product.estado === "agotado") labelColor = "bg-red-600";
  statusLabel.className = `absolute top-2 right-2 text-white text-xs font-bold px-2 py-1 rounded shadow-sm ${labelColor}`;

  imgContainer.append(detailImg, statusLabel);
  detailContent.append(imgContainer);

  // --- Grilla de Datos (Vista) ---
  const detailList = document.createElement("dl");
  detailList.className =
    "grid grid-cols-2 gap-x-4 gap-y-3 text-sm border-b border-slate-100 pb-4";

  const addDetailItem = (label, value, isFull = false) => {
    const div = document.createElement("div");
    if (isFull) div.className = "col-span-2";

    const dt = document.createElement("dt");
    dt.textContent = label;
    dt.className = "text-xs text-slate-500 uppercase font-bold tracking-wide";

    const dd = document.createElement("dd");
    dd.textContent = value;
    dd.className = "text-slate-800 font-medium mt-0.5";

    div.append(dt, dd);
    detailList.append(div);
  };

  addDetailItem("Nombre", product.nombre, true);
  addDetailItem("ID", `#${product.id}`);
  addDetailItem("Precio", `$${Number(product.precio).toLocaleString()}`);
  addDetailItem("Categoría", product.tipo);
  addDetailItem("Stock", product.cantidad);
  addDetailItem("Tamaño", product.tamaño);
  addDetailItem("Material", product.material);

  detailContent.append(detailList);

  // --- Descripción (Vista) ---
  const fullDesc = document.createElement("div");
  fullDesc.className = "mt-2";
  const descTitle = document.createElement("h4");
  descTitle.textContent = "Descripción";
  descTitle.className = "text-xs text-slate-500 uppercase font-bold mb-1";
  const descText = document.createElement("p");
  descText.textContent = product.descripcion;
  descText.className = "text-sm text-slate-700 leading-relaxed";
  fullDesc.append(descTitle, descText);
  detailContent.append(fullDesc);

  // --- Botones Footer (Vista) ---
  const detailActions = document.createElement("div");
  detailActions.className = "flex gap-3 mt-6 pt-4 border-t border-slate-200";

  const btnEditar = document.createElement("button");
  btnEditar.textContent = "Editar Información";
  btnEditar.className =
    "flex-1 py-2 rounded-md bg-pink-600 text-white font-semibold shadow-md hover:bg-pink-700 hover:-translate-y-0.5 transition-all";

  // EVENTO CLAVE: Cambiar a Modo Edición
  btnEditar.addEventListener("click", () => {
    renderEdit(product, detailContent);
  });

  detailActions.append(btnEditar);
  detailContent.append(detailActions);
};
