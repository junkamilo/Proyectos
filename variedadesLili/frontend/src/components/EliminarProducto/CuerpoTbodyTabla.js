import {
  deleteProductoService,
  getAllProductosServices,
} from "../../services/Productos/productosServices";
import { AsideDetallesProductos } from "./AsideDetallesProductos";
import { AsideRenderizadoDetalles } from "./AsideRenderizadoDetalles";

export const CuerpoTbodyTabla = async (productos = []) => {
  const response = await getAllProductosServices();
  const dataProductos = response.data || [];

  const tbody = document.createElement("tbody");
  tbody.className =
    "text-sm text-slate-600 dark:text-slate-300 divide-y divide-slate-100 dark:divide-slate-700/50";

  // --- Sección de Detalles del Producto (Aside) ---
  const { productDetailSection, detailContent } = AsideDetallesProductos();

  // Lógica de renderizado de tabla
  if (dataProductos.length === 0) {
    // --- EMPTY STATE (Moderno) ---
    const row = document.createElement("tr");
    const cell = document.createElement("td");

    cell.colSpan = 9;
    cell.className = "px-6 py-16 text-center";

    cell.innerHTML = `
        <div class="flex flex-col items-center justify-center gap-3 opacity-60">
            <div class="p-4 rounded-full bg-slate-100 dark:bg-slate-800">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p class="text-base font-medium text-slate-500 dark:text-slate-400">No hay productos registrados.</p>
        </div>
    `;

    row.append(cell);
    tbody.append(row);

    // 🔥 FIX OBLIGATORIO: retornar también en el "no hay productos"
    return {
      tbody,
      productDetailSection,
      detailContent,
    };
  } else {
    // Renderizar productos
    dataProductos.forEach(
      ({
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
        fecha_creacion,
        fecha_actualizacion,
      }) => {
        const row = document.createElement("tr");
        row.className =
          "group transition-colors duration-200 ease-in-out cursor-pointer " +
          "hover:bg-red-50 dark:hover:bg-red-900/10";
        row.dataset.productId = id_producto;

        // Click -> Detalles
        row.addEventListener("click", () => {
          tbody
            .querySelectorAll("tr")
            .forEach((r) =>
              r.classList.remove("bg-red-100", "dark:bg-red-900/30")
            );

          row.classList.add("bg-red-100", "dark:bg-red-900/30");

          AsideRenderizadoDetalles(
            {
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
              fecha_creacion,
              fecha_actualizacion,
            },
            { productDetailSection, detailContent }
          );
        });

        // 1. Producto
        const tdProducto = document.createElement("td");
        tdProducto.className = "px-6 py-4";

        const prodContainer = document.createElement("div");
        prodContainer.className = "flex items-center gap-4";

        const img = document.createElement("img");
        img.src = url_foto_producto
          ? `http://localhost:3000${url_foto_producto}`
          : "https://via.placeholder.com/64x64?text=No+Img";
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

        // 2. ID
        const tdId = document.createElement("td");
        tdId.textContent = `#${id_producto}`;
        tdId.className =
          "px-6 py-4 font-mono text-xs text-slate-400 dark:text-slate-500 text-right";

        // 3. Precio
        const tdPrecio = document.createElement("td");
        tdPrecio.textContent = `$${Number(precio).toLocaleString()}`;
        tdPrecio.className =
          "px-6 py-4 font-bold text-slate-700 dark:text-slate-200 text-sm text-right";

        // 4. Cantidad
        const tdCant = document.createElement("td");
        tdCant.textContent = cantidad;
        tdCant.className = "px-6 py-4 text-center text-sm";

        // 5. Tamaño
        const tdTamano = document.createElement("td");
        tdTamano.textContent = tamano;
        tdTamano.className = "px-6 py-4 capitalize text-sm";

        // 6. Categoría
        const tdTipo = document.createElement("td");
        tdTipo.textContent = categoria;
        tdTipo.className = "px-6 py-4 capitalize text-sm";

        // 7. Material
        const tdMaterial = document.createElement("td");
        tdMaterial.textContent = material;
        tdMaterial.className = "px-6 py-4 capitalize text-sm";

        // 8. Estado
        const tdEstado = document.createElement("td");
        tdEstado.className = "px-6 py-4";

        const badge = document.createElement("span");
        badge.textContent = estado;

        let badgeClasses = "bg-slate-50 text-slate-600 ring-slate-500/30";
        const st = estado?.toLowerCase();

        if (st === "activo")
          badgeClasses =
            "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-900/30 dark:text-emerald-400";
        else if (st === "agotado")
          badgeClasses =
            "bg-rose-50 text-rose-700 ring-rose-600/20 dark:bg-rose-900/30 dark:text-rose-400";
        else if (st === "inactivo")
          badgeClasses =
            "bg-slate-100 text-slate-600 ring-slate-500/20 dark:bg-slate-800 dark:text-slate-400";

        badge.className = `inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${badgeClasses} uppercase tracking-wide`;
        tdEstado.append(badge);

        // 9. Acciones
        const tdAcciones = document.createElement("td");
        tdAcciones.className = "px-6 py-4 text-center";

        const actionContainer = document.createElement("div");
        actionContainer.className = "flex justify-center items-center";

        const detelButton = document.createElement("button");
        detelButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1H9a1 1 0 00-1 1v3M4 7h16" /></svg>`;

        detelButton.className =
          "p-2 rounded-lg transition-all duration-200 text-red-500 hover:text-red-700 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2";
        detelButton.title = "Eliminar Producto";

        detelButton.addEventListener("click", async (e) => {
          e.stopPropagation();

          const confirmar = confirm(
            `¿Seguro que deseas eliminar "${nombre_producto}"?`
          );
          if (!confirmar) return;

          try {
            await deleteProductoService(id_producto);

            alert("Producto eliminado correctamente");
            renderTablaProductos();
          } catch (error) {
            alert(error.message);
          }
        });

        actionContainer.append(detelButton);
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

        tbody.append(row);
      }
    );

    return {
      tbody,
      productDetailSection,
      detailContent,
    };
  }
};
