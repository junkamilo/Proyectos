import { deleteProductoService, getAllProductosServices } from "../../services/Productos/productosServices";
import { AsideDetallesProductos } from "./AsideDetallesProductos";
import { AsideRenderizadoDetalles } from "./AsideRenderizadoDetalles";

export const CuerpoTbodyTabla = async (productos = []) => {
  const response = await getAllProductosServices();
  const dataProductos = response.data || [];

  const tbody = document.createElement("tbody");
  tbody.className = "text-sm text-slate-700 divide-y divide-slate-200";

  // --- Sección de Detalles del Producto (Aside) ---
  const { productDetailSection, detailContent } = AsideDetallesProductos();

  // Lógica de renderizado de tabla
  if (dataProductos.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = headers.length;
    cell.className = "px-6 py-12 text-center text-slate-500";
    cell.innerHTML = `
        <div class="flex flex-col items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p>No hay productos registrados.</p>
        </div>
    `;
    row.append(cell);
    tbody.append(row);
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
          "hover:bg-pink-50 transition-colors duration-150 cursor-pointer group";
        row.dataset.productId = id_producto;

        // Click -> Detalles
        row.addEventListener("click", () => {
          tbody
            .querySelectorAll("tr")
            .forEach((r) => r.classList.remove("bg-pink-100"));
          row.classList.add("bg-pink-100");

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
        prodContainer.className = "flex items-center gap-3";

        const img = document.createElement("img");
        img.src = url_foto_producto
          ? `http://localhost:3000${url_foto_producto}`
          : "https://via.placeholder.com/48x48?text=No+Img";

        img.alt = nombre_producto;
        img.className =
          "w-10 h-10 rounded-lg object-cover border border-slate-200 shadow-sm bg-white";

        const infoContainer = document.createElement("div");

        const nombre = document.createElement("p");
        nombre.textContent = nombre_producto;
        nombre.className = "font-semibold text-slate-900 text-sm";

        const desc = document.createElement("p");
        desc.textContent = descripcion;
        desc.className = "text-xs text-slate-500 truncate w-32 sm:w-40";

        infoContainer.append(nombre, desc);
        prodContainer.append(img, infoContainer);
        tdProducto.append(prodContainer);

        // 2. ID
        const tdId = document.createElement("td");
        tdId.textContent = `#${id_producto}`;
        tdId.className = "px-6 py-4 font-mono text-xs text-slate-400";

        // 3. Precio
        const tdPrecio = document.createElement("td");
        tdPrecio.textContent = `$${Number(precio).toLocaleString()}`;
        tdPrecio.className = "px-6 py-4 font-bold text-slate-700 text-sm";

        // 4. Cantidad
        const tdCant = document.createElement("td");
        tdCant.textContent = cantidad;
        tdCant.className = "px-6 py-4 text-center";

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

        let badgeColorClass = "bg-slate-100 text-slate-600";
        if (estado?.toLowerCase() === "activo")
          badgeColorClass =
            "bg-green-100 text-green-700 border border-green-200";
        else if (estado?.toLowerCase() === "agotado")
          badgeColorClass = "bg-red-100 text-red-700 border border-red-200";
        else if (estado?.toLowerCase() === "inactivo")
          badgeColorClass = "bg-gray-100 text-gray-500 border border-gray-200";

        badge.className = `px-2 py-1 rounded-full text-[10px] uppercase font-bold tracking-wide ${badgeColorClass}`;
        tdEstado.append(badge);

        // 9. Acciones
        const tdAcciones = document.createElement("td");
        tdAcciones.className = "px-6 py-4";

        const actionContainer = document.createElement("div");
        actionContainer.className = "flex items-center gap-2";

        const detelButton = document.createElement("button");
        detelButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1H9a1 1 0 00-1 1v3M4 7h16" /></svg>`;

        detelButton.className =
          "p-1.5 rounded-md text-red-500 hover:bg-blue-50 transition-colors";
        detelButton.title = "Eliminar";

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
