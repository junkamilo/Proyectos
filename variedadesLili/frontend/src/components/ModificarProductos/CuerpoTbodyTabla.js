import { getAllProductosServices } from "../../services/Productos/productosServices";
import API_URL from "../../utils/api";
import { AsideDetallesProductos } from "./AsideDetallesProductos";
import { AsideRenderizadoDetalles } from "./AsideRenderizadoDetalles";

export const CrearFilaProducto = (
  producto,
  { productDetailSection, detailContent }
) => {
  const {
    id_producto,
    nombre_producto,
    url_foto_producto,
    cantidad,
    descripcion,
    precio,
    tamano,
    categoria,
    material,
    estado,
  } = producto;

  const row = document.createElement("tr");

  // 🔥 CLAVE: Le damos un ID único basado en la BD para encontrarlo fácil después
  row.id = `fila-prod-${id_producto}`;

  row.className =
    "group transition-colors duration-200 ease-in-out cursor-pointer hover:bg-purple-50 dark:hover:bg-white/5";
  row.dataset.productId = id_producto;

  // Click para detalles
  row.addEventListener("click", function () {
    // Usamos 'this.closest' para encontrar el tbody sin depender de variables externas
    const parentTbody = this.closest("tbody");
    if (parentTbody) {
      parentTbody
        .querySelectorAll("tr")
        .forEach((r) =>
          r.classList.remove("bg-purple-100", "dark:bg-purple-900/30")
        );
    }

    row.classList.add("bg-purple-100", "dark:bg-purple-900/30");

    AsideRenderizadoDetalles(producto, {
      productDetailSection,
      detailContent,
    });
  });

  // --- Construcción de Celdas (Igual que tenías) ---
  const tdProducto = document.createElement("td");
  tdProducto.className = "px-6 py-4";

  const prodContainer = document.createElement("div");
  prodContainer.className = "flex items-center gap-4";

  const img = document.createElement("img");
  // Ajusta la URL base según tu entorno
  img.src = url_foto_producto
    ? `${API_URL}${url_foto_producto}`
    : "https://via.placeholder.com/64x64?text=Img";
  img.alt = nombre_producto;
  img.className =
    "w-12 h-12 rounded-lg object-cover border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-800";

  const infoContainer = document.createElement("div");
  infoContainer.className = "flex flex-col";

  const nombre = document.createElement("p");
  nombre.textContent = nombre_producto;
  nombre.className =
    "font-semibold text-slate-800 dark:text-slate-100 text-sm line-clamp-1";

  const desc = document.createElement("p");
  desc.textContent = descripcion;
  desc.className =
    "text-xs text-slate-500 dark:text-slate-400 truncate w-32 sm:w-40";

  infoContainer.append(nombre, desc);
  prodContainer.append(img, infoContainer);
  tdProducto.append(prodContainer);

  const tdId = document.createElement("td");
  tdId.textContent = `#${id_producto}`;
  tdId.className =
    "px-6 py-4 font-mono text-xs text-slate-400 dark:text-slate-500 text-right";

  const tdPrecio = document.createElement("td");
  tdPrecio.textContent = `$${Number(precio).toLocaleString()}`;
  tdPrecio.className =
    "px-6 py-4 font-bold text-slate-700 dark:text-slate-200 text-sm text-right";

  const tdCant = document.createElement("td");
  tdCant.textContent = cantidad;
  tdCant.className = "px-6 py-4 text-center text-sm";

  const tdTamano = document.createElement("td");
  tdTamano.textContent = tamano;
  tdTamano.className = "px-6 py-4 capitalize text-sm";

  const tdTipo = document.createElement("td");
  tdTipo.textContent = categoria;
  tdTipo.className = "px-6 py-4 capitalize text-sm";

  const tdMaterial = document.createElement("td");
  tdMaterial.textContent = material;
  tdMaterial.className = "px-6 py-4 capitalize text-sm";

  const tdEstado = document.createElement("td");
  tdEstado.className = "px-6 py-4";

  const badge = document.createElement("span");
  badge.textContent = estado;

  let badgeClasses = "bg-slate-50 text-slate-600 ring-slate-500/30";
  const st = estado?.toLowerCase();

  if (st === "activo") {
    badgeClasses =
      "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-900/30 dark:text-emerald-400";
  } else if (st === "agotado") {
    badgeClasses =
      "bg-rose-50 text-rose-700 ring-rose-600/20 dark:bg-rose-900/30 dark:text-rose-400";
  } else if (st === "inactivo") {
    badgeClasses =
      "bg-slate-100 text-slate-600 ring-slate-500/20 dark:bg-slate-800 dark:text-slate-400";
  }

  badge.className = `inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${badgeClasses} uppercase tracking-wide`;
  tdEstado.append(badge);

  const tdAcciones = document.createElement("td");
  tdAcciones.className = "px-6 py-4 text-center";

  const actionContainer = document.createElement("div");
  actionContainer.className = "flex justify-center items-center";

  const editButton = document.createElement("button");
  editButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l .8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zM16.862 4.487L19.5 7.125M18 14v4.5a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>`;

  editButton.className =
    "p-2 rounded-full transition-all duration-200 text-slate-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:text-purple-400 dark:hover:bg-purple-900/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2";
  editButton.title = "Editar Producto";

  editButton.addEventListener("click", (e) => {
    e.stopPropagation();
    AsideRenderizadoDetalles(producto, {
      productDetailSection,
      detailContent,
    });
  });

  actionContainer.append(editButton);
  tdAcciones.append(actionContainer);

  row.append(
    tdProducto,
    tdId,
    tdPrecio,
    tdCant,
    tdTamano,
    tdTipo,
    tdMaterial,
    tdEstado,
    tdAcciones
  );

  return row;
};

// ==========================================
// 2. COMPONENTE PRINCIPAL (Simplificado)
// ==========================================
export const CuerpoTbodyTabla = async (productos = []) => {
  const response = await getAllProductosServices();
  const dataProductos = response.data || [];

  const tbody = document.createElement("tbody");
  tbody.className =
    "text-sm text-slate-600 dark:text-slate-300 divide-y divide-slate-100 dark:divide-slate-700/50";

  // --- Sección de Detalles del Producto (Aside) ---
  const { productDetailSection, detailContent } = AsideDetallesProductos();

  // Guardamos las referencias en una variable global o exportada para usarlas luego
  // Esto es un truco para que la función de update pueda acceder a ellas si es necesario
  window.tablaReferencias = { productDetailSection, detailContent };

  // --- Lógica de renderizado ---
  if (dataProductos.length === 0) {
    // Empty state (puedes pegar aquí tu código de empty state si lo deseas)
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 9;
    cell.className = "px-6 py-16 text-center text-slate-500";
    cell.textContent = "No hay productos registrados aún.";
    row.append(cell);
    tbody.append(row);
    return { tbody, productDetailSection, detailContent };
  }

  // --- RENDERIZADO DE PRODUCTOS (Ahora mucho más limpio) ---
  dataProductos.forEach((producto) => {
    // 🔥 AQUÍ ESTÁ LA SOLUCIÓN: Usamos la función helper en el renderizado inicial
    // para que las filas tengan ID y lógica correcta desde el principio.
    const row = CrearFilaProducto(producto, {
      productDetailSection,
      detailContent,
    });
    tbody.append(row);
  });

  return {
    tbody,
    productDetailSection,
    detailContent,
  };
};
