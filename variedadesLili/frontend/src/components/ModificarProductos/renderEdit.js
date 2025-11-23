import { actualizarFilaProducto } from "../../helpers/ModificarProductos/renderTabla.js";
import { updateProductoService } from "../../services/Productos/productosServices.js";
import { renderView } from "./renderView.js";

export const renderEdit = (product, detailContent) => {
  detailContent.innerHTML = "";

  const form = document.createElement("form");
  form.className = "flex flex-col gap-6 animate-fade-in pb-4"; // Gap más amplio y padding bottom

  // =======================
  // PREVIEW + INPUT IMAGEN
  // =======================
  const imgGroup = document.createElement("div");
  imgGroup.className = "group flex flex-col gap-3";

  const imgWrapper = document.createElement("div");
  imgWrapper.className =
    "relative overflow-hidden rounded-xl border border-slate-700/50 shadow-lg";

  const imgPreview = document.createElement("img");
  imgPreview.src =
    product.imagen || "https://via.placeholder.com/300x200?text=No+Img";
  imgPreview.className =
    "w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105";

  // Overlay decorativo
  const overlay = document.createElement("div");
  overlay.className =
    "absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none";

  imgWrapper.append(imgPreview, overlay);

  const labelImg = document.createElement("label");
  labelImg.textContent = "Actualizar Imagen";
  labelImg.className =
    "text-xs font-bold tracking-wider text-slate-400 uppercase ml-1";

  const inputImg = document.createElement("input");
  inputImg.type = "file";
  inputImg.accept = "image/*";
  inputImg.className =
    "block w-full text-sm text-slate-400 " +
    "file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 " +
    "file:text-xs file:font-semibold file:bg-indigo-600 file:text-white " +
    "hover:file:bg-indigo-500 file:cursor-pointer cursor-pointer " +
    "file:transition-colors file:duration-200";

  inputImg.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) imgPreview.src = URL.createObjectURL(file);
  });

  imgGroup.append(imgWrapper, labelImg, inputImg);
  form.append(imgGroup);

  // =======================
  // INPUT GENÉRICO (Dark Mode Style)
  // =======================
  const createInputGroup = (label, value, type = "text") => {
    const div = document.createElement("div");
    div.className = "w-full space-y-1.5";

    const lbl = document.createElement("label");
    lbl.textContent = label;
    lbl.className =
      "text-xs font-bold tracking-wider text-slate-400 uppercase ml-1";

    const input = document.createElement("input");
    input.type = type;
    input.value = value;
    input.className =
      "w-full px-4 py-2.5 rounded-lg text-sm " +
      "bg-slate-900/50 text-slate-200 placeholder-slate-600 " + // Colores Dark
      "border border-slate-700 " +
      "focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none " +
      "transition-all duration-200";

    div.append(lbl, input);
    return { div, input };
  };

  // =======================
  // SELECT GENÉRICO (Dark Mode Style + Custom Arrow)
  // =======================
  const createSelectGroup = (label, options, selectedValue) => {
    const div = document.createElement("div");
    div.className = "w-full space-y-1.5";

    const lbl = document.createElement("label");
    lbl.textContent = label;
    lbl.className =
      "text-xs font-bold tracking-wider text-slate-400 uppercase ml-1";

    const wrapper = document.createElement("div");
    wrapper.className = "relative";

    const select = document.createElement("select");
    select.className =
      "w-full px-4 py-2.5 rounded-lg text-sm appearance-none " + // appearance-none para custom arrow
      "bg-slate-900/50 text-slate-200 " +
      "border border-slate-700 " +
      "focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none " +
      "cursor-pointer transition-all duration-200";

    options.forEach((optValue) => {
      const opt = document.createElement("option");
      opt.value = optValue;
      opt.textContent = optValue;
      // Las opciones nativas siempre son blancas/grises por el SO,
      // pero intentamos darles fondo oscuro
      opt.className = "bg-slate-800 text-slate-200";
      if (optValue === selectedValue) opt.selected = true;
      select.append(opt);
    });

    const arrow = document.createElement("div");
    arrow.className =
      "absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500";
    arrow.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    `;

    wrapper.append(select, arrow);
    div.append(lbl, wrapper);
    return { div, select };
  };

  // =======================
  // ARMADO DE CAMPOS
  // =======================
  const nameGroup = createInputGroup("Nombre del Producto", product.nombre);
  form.append(nameGroup.div);

  const gridRow = document.createElement("div");
  gridRow.className = "grid grid-cols-1 sm:grid-cols-2 gap-5"; // Espaciado ajustado

  const priceGroup = createInputGroup("Precio", product.precio, "number");
  const stockGroup = createInputGroup("Stock", product.cantidad, "number");

  const categoriaGroup = createSelectGroup(
    "Categoría",
    ["alcancia", "materos", "abono", "plantas"],
    product.categoria
  );
  console.log("CATEGORÍA QUE LLEGA DESDE EL BACK:", product.categoria);

  const materialGroup = createSelectGroup(
    "Material",
    ["cerámica", "plástico", "madera", "metal", "tierra", "natural"],
    product.material
  );

  const sizeGroup = createSelectGroup(
    "Tamaño",
    ["pequeño", "mediano", "grande"],
    product.tamano ?? product.tamaño
  );

  const estadoGroup = createSelectGroup(
    "Estado",
    ["Activo", "Agotado", "Inactivo"],
    //convertimos las
    product.estado
      ? product.estado[0].toUpperCase() + product.estado.slice(1).toLowerCase()
      : "Activo"
  );

  gridRow.append(
    priceGroup.div,
    stockGroup.div,
    categoriaGroup.div,
    materialGroup.div,
    sizeGroup.div,
    estadoGroup.div
  );

  form.append(gridRow);

  // =======================
  // DESCRIPCIÓN
  // =======================
  const descDiv = document.createElement("div");
  descDiv.className = "space-y-1.5";

  const descLabel = document.createElement("label");
  descLabel.textContent = "Descripción";
  descLabel.className =
    "text-xs font-bold tracking-wider text-slate-400 uppercase ml-1";

  const descInput = document.createElement("textarea");
  descInput.rows = 4;
  descInput.value = product.descripcion;
  descInput.className =
    "w-full px-4 py-2.5 rounded-lg text-sm " +
    "bg-slate-900/50 text-slate-200 placeholder-slate-600 " +
    "border border-slate-700 " +
    "focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none " +
    "resize-y custom-scrollbar transition-all duration-200";

  descDiv.append(descLabel, descInput);
  form.append(descDiv);

  // =======================
  // BOTONES DE ACCIÓN
  // =======================
  const actionDiv = document.createElement("div");
  actionDiv.className =
    "grid grid-cols-2 gap-4 mt-4 pt-6 border-t border-slate-700/50";

  const btnCancel = document.createElement("button");
  btnCancel.type = "button";
  btnCancel.textContent = "Cancelar";
  btnCancel.className =
    "w-full py-2.5 rounded-lg text-sm font-semibold " +
    "text-slate-300 border border-slate-600 " +
    "hover:bg-slate-800 hover:text-white hover:border-slate-500 " +
    "transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500";

  btnCancel.addEventListener("click", () => {
    // Al cancelar, volvemos a renderizar la vista de lectura
    renderView(product, detailContent);
  });

  const btnSave = document.createElement("button");
  btnSave.type = "submit";
  btnSave.textContent = "Guardar Cambios";
  btnSave.className =
    "w-full py-2.5 rounded-lg text-sm font-semibold text-white " +
    "bg-indigo-600 hover:bg-indigo-500 " +
    "shadow-lg shadow-indigo-500/20 " +
    "transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900";

  actionDiv.append(btnCancel, btnSave);
  form.append(actionDiv);
  detailContent.append(form);

  // =======================
  // LÓGICA SUBMIT (Preservada)
  // =======================
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Feedback visual inmediato en el botón
    const originalBtnText = btnSave.textContent;
    btnSave.textContent = "Guardando...";
    btnSave.disabled = true;
    btnSave.classList.add("opacity-75", "cursor-wait");

    try {
      const formData = new FormData();

      formData.append("nombre_producto", nameGroup.input.value);
      formData.append("precio", priceGroup.input.value);
      formData.append("cantidad", stockGroup.input.value);
      formData.append("categoria", categoriaGroup.select.value);
      formData.append("material", materialGroup.select.value);
      formData.append("tamano", sizeGroup.select.value);
      formData.append("estado", estadoGroup.select.value);
      formData.append("descripcion", descInput.value);

      if (inputImg.files[0]) {
        formData.append("foto_producto", inputImg.files[0]);
      }

      // Llamada al servicio
      const response = await updateProductoService(
        product.id_producto,
        formData
      );
      console.log(response);

      // Actualizar objeto local
      const updatedProduct = {
        ...product,
        nombre: nameGroup.input.value,
        precio: Number(priceGroup.input.value),
        cantidad: Number(stockGroup.input.value),
        categoria: categoriaGroup.select.value,
        material: materialGroup.select.value,
        tamano: sizeGroup.select.value,
        estado: estadoGroup.select.value.toLowerCase(),
        descripcion: descInput.value,
        imagen: inputImg.files[0]
          ? URL.createObjectURL(inputImg.files[0])
          : product.imagen,
      };

      // Si existe esta función global
      if (typeof actualizarFilaProducto === "function") {
        actualizarFilaProducto(updatedProduct);
      }

      // Volver a la vista de detalles
      renderView(updatedProduct, detailContent);

      // TODO: Usar tu componente Swal aquí: ProductoAgregado({ message: "Producto actualizado" })
      alert("Producto actualizado correctamente!");
    } catch (err) {
      console.error(err);
      // TODO: Usar tu componente Swal aquí: ErrorProducto(err)
      alert("Hubo un error al actualizar el producto");
    } finally {
      btnSave.textContent = originalBtnText;
      btnSave.disabled = false;
      btnSave.classList.remove("opacity-75", "cursor-wait");
    }
  });
};
