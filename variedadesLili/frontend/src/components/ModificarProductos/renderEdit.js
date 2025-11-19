import { actualizarFilaProducto } from "../../helpers/ModificarProductos/renderTabla.js";
import { updateProductoService } from "../../services/Productos/productosServices.js";
import { renderView } from "./renderView.js";

export const renderEdit = (product, detailContent) => {
  detailContent.innerHTML = ""; // Limpiamos para pintar el formulario

  const form = document.createElement("form");
  // Diseño: Animación de entrada y espaciado vertical
  form.className = "flex flex-col gap-5 animate-fade-in";

  // --- Campo: URL Imagen (Preview + Input) ---
  const imgGroup = document.createElement("div");
  imgGroup.className = "flex flex-col gap-2"; // Espaciado interno

  const imgPreview = document.createElement("img");
  imgPreview.src =
    product.imagen || "https://via.placeholder.com/300x200?text=No+Img";
  // Diseño: Altura fija, bordes redondeados, opacidad sutil para indicar edición
  imgPreview.className =
    "w-full h-40 object-cover rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm opacity-90 transition-opacity hover:opacity-100";

  const labelImg = document.createElement("label");
  labelImg.textContent = "Actualizar Imagen"; // Texto ligeramente mejorado
  labelImg.className =
    "text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider ml-1";

  const inputImg = document.createElement("input");
  inputImg.type = "file";
  inputImg.accept = "image/*";
  // Diseño: Estilo moderno para input file usando pseudo-clase 'file:'
  inputImg.className =
    "block w-full text-sm text-slate-500 dark:text-slate-400 " +
    "file:mr-4 file:py-2 file:px-4 " +
    "file:rounded-full file:border-0 " +
    "file:text-xs file:font-bold " +
    "file:bg-purple-50 file:text-purple-700 " +
    "hover:file:bg-purple-100 " +
    "dark:file:bg-purple-900/30 dark:file:text-purple-400 cursor-pointer";

  // Actualizar preview al cambiar url (Lógica intacta)
  inputImg.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) imgPreview.src = URL.createObjectURL(file);
  });

  imgGroup.append(imgPreview, labelImg, inputImg);
  form.append(imgGroup);

  // --- Helper para crear Inputs (Estilo Estandarizado) ---
  const createInputGroup = (
    label,
    value,
    type = "text",
    widthClass = "w-full"
  ) => {
    const div = document.createElement("div");
    div.className = widthClass + " group";

    const lbl = document.createElement("label");
    lbl.textContent = label;
    // Diseño: Label técnico
    lbl.className =
      "text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider ml-1 mb-1 block group-focus-within:text-purple-600 dark:group-focus-within:text-purple-400 transition-colors";

    const input = document.createElement("input");
    input.type = type;
    input.value = value;
    // Diseño: Input Moderno (Coherente con el Formulario de Registro)
    input.className =
      "w-full px-3 py-2.5 rounded-lg text-sm font-medium " +
      "bg-slate-50 dark:bg-slate-900/50 " +
      "border border-slate-200 dark:border-slate-700 " +
      "text-slate-800 dark:text-slate-100 " +
      "focus:bg-white dark:focus:bg-slate-950 " +
      "focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none " +
      "transition-all duration-200";

    div.append(lbl, input);
    return { div, input };
  };

  // --- Fila 1: Nombre (Full) ---
  const nameGroup = createInputGroup("Nombre del Producto", product.nombre);
  form.append(nameGroup.div);

  // --- Fila 2: Grid para datos cortos ---
  const gridRow = document.createElement("div");
  // Diseño: Grid responsivo (1 col móvil, 2 col tablet)
  gridRow.className = "grid grid-cols-1 sm:grid-cols-2 gap-4";

  const priceGroup = createInputGroup("Precio", product.precio, "number");
  const stockGroup = createInputGroup("Stock", product.cantidad, "number");
  const typeGroup = createInputGroup(
    "Categoría",
    product.tipo ?? product.categoria ?? ""
  );
  const materialGroup = createInputGroup("Material", product.material);
  const sizeGroup = createInputGroup("Tamaño",product.tamaño ?? product.tamano ?? ""
  );

  // --- Select de Estado (Con Flecha Custom) ---
  const stateDiv = document.createElement("div");
  stateDiv.className = "w-full group relative"; // Relative para el icono

  const stateLabel = document.createElement("label");
  stateLabel.textContent = "Estado";
  stateLabel.className =
    "text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider ml-1 mb-1 block group-focus-within:text-purple-600 transition-colors";

  // Wrapper para el icono SVG
  const selectWrapper = document.createElement("div");
  selectWrapper.className = "relative";

  const stateSelect = document.createElement("select");
  // Diseño: Appearance-none para ocultar flecha nativa + padding derecho
  stateSelect.className =
    "w-full px-3 py-2.5 rounded-lg text-sm font-medium appearance-none cursor-pointer " +
    "bg-slate-50 dark:bg-slate-900/50 " +
    "border border-slate-200 dark:border-slate-700 " +
    "text-slate-800 dark:text-slate-100 " +
    "focus:bg-white dark:focus:bg-slate-950 " +
    "focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none " +
    "transition-all duration-200";

  ["Activo", "Agotado", "Inactivo"].forEach((st) => {
    const opt = document.createElement("option");
    opt.value = st;
    opt.textContent = st;
    if (st === product.estado) opt.selected = true;
    stateSelect.append(opt);
  });

  // Icono SVG Flecha
  const arrowIcon = document.createElement("div");
  arrowIcon.className =
    "absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-purple-500 transition-colors";
  arrowIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>`;

  selectWrapper.append(stateSelect, arrowIcon);
  stateDiv.append(stateLabel, selectWrapper);

  gridRow.append(
    priceGroup.div,
    stockGroup.div,
    typeGroup.div,
    materialGroup.div,
    sizeGroup.div,
    stateDiv
  );
  form.append(gridRow);

  // --- Descripción (Textarea) ---
  const descDiv = document.createElement("div");
  descDiv.className = "group";

  const descLabel = document.createElement("label");
  descLabel.textContent = "Descripción";
  descLabel.className =
    "text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider ml-1 mb-1 block group-focus-within:text-purple-600 transition-colors";

  const descInput = document.createElement("textarea");
  descInput.rows = 4;
  descInput.value = product.descripcion;
  // Diseño: Resize vertical y estilos consistentes
  descInput.className =
    "w-full px-3 py-2.5 rounded-lg text-sm font-medium resize-y " +
    "bg-slate-50 dark:bg-slate-900/50 " +
    "border border-slate-200 dark:border-slate-700 " +
    "text-slate-800 dark:text-slate-100 " +
    "focus:bg-white dark:focus:bg-slate-950 " +
    "focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none " +
    "transition-all duration-200";

  descDiv.append(descLabel, descInput);
  form.append(descDiv);

  // --- Botones de Acción (Guardar / Cancelar) ---
  const actionDiv = document.createElement("div");
  actionDiv.className =
    "flex gap-4 mt-6 pt-4 border-t border-slate-100 dark:border-slate-700";

  const btnCancel = document.createElement("button");
  btnCancel.type = "button";
  btnCancel.textContent = "Cancelar";
  // Diseño: Botón Ghost (Sutil)
  btnCancel.className =
    "flex-1 py-2.5 rounded-lg font-medium transition-colors " +
    "text-slate-600 dark:text-slate-400 " +
    "border border-slate-200 dark:border-slate-700 " +
    "hover:bg-slate-50 dark:hover:bg-slate-800 " +
    "focus:outline-none focus:ring-2 focus:ring-slate-400";

  const btnSave = document.createElement("button");
  btnSave.type = "submit"; // Submit para activar evento del form
  btnSave.textContent = "Guardar Cambios";
  // Diseño: Botón Primario Gradiente (Coherencia SPA)
  btnSave.className =
    "flex-1 py-2.5 rounded-lg font-bold text-white shadow-md " +
    "bg-gradient-to-r from-purple-600 to-pink-600 " +
    "hover:from-purple-700 hover:to-pink-700 hover:-translate-y-0.5 " +
    "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 " +
    "transition-all duration-300";

  // --- Eventos de los Botones (Lógica Intacta) ---

  // Cancelar: Simplemente volvemos a pintar la vista original
  btnCancel.addEventListener("click", () => {
    renderView(product, detailContent);
  });

  // Guardar:
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      // Armamos FormData correctamente (esto es lo único que se envía al backend)
      const formData = new FormData();

      formData.append("nombre_producto", nameGroup.input.value);
      formData.append("precio", priceGroup.input.value);
      formData.append("cantidad", stockGroup.input.value);
      formData.append("categoria", typeGroup.input.value);
      formData.append("material", materialGroup.input.value);
      formData.append("tamano", sizeGroup.input.value);
      formData.append("estado", stateSelect.value);
      formData.append("descripcion", descInput.value);

      // Añadir archivo SOLO si el usuario seleccionó uno
      if (inputImg.files[0]) {
        formData.append("foto_producto", inputImg.files[0]);
      }

      // Llamamos al servicio que hace el PUT
      const response = await updateProductoService(
        product.id_producto,
        formData
      );

      // Actualizamos la vista localmente
      product = {
        ...product,
        id_producto: product.id_producto,
        nombre: nameGroup.input.value,
        precio: Number(priceGroup.input.value),
        cantidad: Number(stockGroup.input.value),
        categoria: typeGroup.input.value,
        tamano: sizeGroup.input.value,
        material: materialGroup.input.value,
        estado: stateSelect.value,
        descripcion: descInput.value,
        imagen: inputImg.files[0]
          ? URL.createObjectURL(inputImg.files[0])
          : product.imagen,
      };
      actualizarFilaProducto(product);

      alert("¡Producto actualizado correctamente!");
      renderView(product, detailContent);
    } catch (err) {
      console.error(err);
      alert("Hubo un error al actualizar el producto");
    }
  });

  actionDiv.append(btnCancel, btnSave);
  form.append(actionDiv);
  detailContent.append(form);
};
