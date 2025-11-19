import { deleteProductoService } from "../../services/Productos/productosServices";

export const renderView = (product, detailContent) => {
  // 🔥 ADAPTAMOS DIRECTO LAS PROPIEDADES (Lógica intacta)
  product = {
    id_producto: product.id_producto,
    nombre: product.nombre_producto,
    imagen:
      product.imagen ?? `http://localhost:3000${product.url_foto_producto}`,
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
  // Diseño: Rounded-xl, overflow oculto, sombra y fondo sutil
  imgContainer.className =
    "relative group w-full mb-6 rounded-2xl overflow-hidden shadow-md bg-slate-100 dark:bg-slate-800";

  const detailImg = document.createElement("img");
  detailImg.src =
    product.imagen || "https://via.placeholder.com/300x200?text=No+Img";
  detailImg.alt = product.nombre;
  // Diseño: Alto fijo, zoom suave en hover
  detailImg.className =
    "w-full h-64 object-cover transition-transform duration-700 ease-in-out group-hover:scale-105";

  // Badge de Estado
  const statusLabel = document.createElement("span");
  statusLabel.textContent = product.estado;

  // Lógica de Colores (Estilos modernos Glass)
  let labelColor = "bg-slate-700/90 text-slate-100 shadow-slate-500/20";
  if (product.estado === "activo")
    labelColor = "bg-emerald-500/90 text-white shadow-emerald-500/20";
  if (product.estado === "agotado")
    labelColor = "bg-rose-500/90 text-white shadow-rose-500/20";

  statusLabel.className = `absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full shadow-lg backdrop-blur-sm uppercase tracking-wide ${labelColor}`;

  imgContainer.append(detailImg, statusLabel);
  detailContent.append(imgContainer);

  // --- Grilla de Datos (Vista) ---
  const detailList = document.createElement("dl");
  // Diseño: Grid espacioso
  detailList.className = "grid grid-cols-2 gap-x-4 gap-y-5 mb-6 text-sm";

  const addDetailItem = (label, value, isFull = false) => {
    const div = document.createElement("div");
    if (isFull) div.className = "col-span-2";

    const dt = document.createElement("dt");
    dt.textContent = label;
    // Diseño: Labels técnicos
    dt.className =
      "text-xs text-slate-400 dark:text-slate-500 uppercase font-bold tracking-wider mb-1";

    const dd = document.createElement("dd");
    dd.textContent = value;
    // Diseño: Valores legibles
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
  // Diseño: Caja contenedora separada
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
  // Diseño: Separador superior
  detailActions.className =
    "mt-8 pt-6 border-t border-slate-100 dark:border-slate-700";

  const btnEliminar = document.createElement("button");
  // Añadimos icono de papelera al botón
  btnEliminar.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1H9a1 1 0 00-1 1v3M4 7h16" />
    </svg>
    Eliminar Producto
  `;

  // Diseño: PALETA DESTRUCTIVA (Rojo/Rose)
  btnEliminar.className =
    "w-full flex items-center justify-center py-3 px-4 rounded-xl " +
    "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 " + // Gradiente Rojo
    "text-white font-bold shadow-lg shadow-red-500/20 " + // Sombra Roja
    "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-red-500/40 " + // Efecto Lift
    "focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900";

  // EVENTO CLAVE: Lógica intacta
  btnEliminar.addEventListener("click", async (e) => {
    e.stopPropagation();

    const confirmar = confirm(
      `¿Seguro que deseas eliminar "${product.nombre}"?`
    );
    if (!confirmar) return;

    try {
      await deleteProductoService(product.id_producto);

      alert("Producto eliminado correctamente");
      //renderTablaProductos(); // actualiza la vista
    } catch (error) {
      alert(error.message);
    }
  });

  detailActions.append(btnEliminar);
  detailContent.append(detailActions);
};
