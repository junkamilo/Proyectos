import { updateProductoService } from "../../services/Productos/productosServices.js";
import { renderView } from "./renderView.js";

export const renderEdit = (product, detailContent) => {
  detailContent.innerHTML = ""; // Limpiamos para pintar el formulario

  const form = document.createElement("form");
  form.className = "flex flex-col gap-4 animate-fade-in"; // Animación suave

  // --- Campo: URL Imagen (Preview + Input) ---
  const imgGroup = document.createElement("div");
  const imgPreview = document.createElement("img");
  imgPreview.src =
    product.imagen || "https://via.placeholder.com/300x200?text=No+Img";
  imgPreview.className = "w-full h-32 object-cover rounded-lg mb-2 opacity-50"; // Opacidad para indicar que se está editando

  const labelImg = document.createElement("label");
  labelImg.textContent = "URL de la Imagen";
  labelImg.className = "text-xs font-bold text-slate-500 uppercase";
  const inputImg = document.createElement("input");
  inputImg.type = "file";
  inputImg.accept = "image/*";
  inputImg.className =
    "w-full mt-1 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent";

  // Actualizar preview al cambiar url
  inputImg.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) imgPreview.src = URL.createObjectURL(file);
  });

  imgGroup.append(imgPreview, labelImg, inputImg);
  form.append(imgGroup);

  // --- Helper para crear Inputs ---
  const createInputGroup = (
    label,
    value,
    type = "text",
    widthClass = "w-full"
  ) => {
    const div = document.createElement("div");
    div.className = widthClass;

    const lbl = document.createElement("label");
    lbl.textContent = label;
    lbl.className = "text-xs font-bold text-slate-500 uppercase";

    const input = document.createElement("input");
    input.type = type;
    input.value = value;
    input.className =
      "w-full mt-1 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent";

    div.append(lbl, input);
    return { div, input };
  };

  // --- Fila 1: Nombre (Full) ---
  const nameGroup = createInputGroup("Nombre del Producto", product.nombre);
  form.append(nameGroup.div);

  // --- Fila 2: Grid para datos cortos ---
  const gridRow = document.createElement("div");
  gridRow.className = "grid grid-cols-2 gap-4";

  const priceGroup = createInputGroup("Precio", product.precio, "number");
  const stockGroup = createInputGroup("Stock", product.cantidad, "number");
  const typeGroup = createInputGroup("Categoría", product.tipo);
  const materialGroup = createInputGroup("Material", product.material);
  const sizeGroup = createInputGroup("Tamaño", product.tamaño);

  // --- Select de Estado ---
  const stateDiv = document.createElement("div");
  const stateLabel = document.createElement("label");
  stateLabel.textContent = "Estado";
  stateLabel.className = "text-xs font-bold text-slate-500 uppercase";
  const stateSelect = document.createElement("select");
  stateSelect.className =
    "w-full mt-1 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-500";
  ["Activo", "Agotado", "Inactivo"].forEach((st) => {
    const opt = document.createElement("option");
    opt.value = st;
    opt.textContent = st;
    if (st === product.estado) opt.selected = true;
    stateSelect.append(opt);
  });
  stateDiv.append(stateLabel, stateSelect);

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
  const descLabel = document.createElement("label");
  descLabel.textContent = "Descripción";
  descLabel.className = "text-xs font-bold text-slate-500 uppercase";
  const descInput = document.createElement("textarea");
  descInput.rows = 4;
  descInput.value = product.descripcion;
  descInput.className =
    "w-full mt-1 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none";
  descDiv.append(descLabel, descInput);
  form.append(descDiv);

  // --- Botones de Acción (Guardar / Cancelar) ---
  const actionDiv = document.createElement("div");
  actionDiv.className = "flex gap-3 mt-4 pt-4 border-t border-slate-200";

  const btnCancel = document.createElement("button");
  btnCancel.type = "button";
  btnCancel.textContent = "Cancelar";
  btnCancel.className =
    "flex-1 py-2 rounded-md border border-slate-300 text-slate-600 hover:bg-slate-100 font-medium transition-colors";

  const btnSave = document.createElement("button");
  btnSave.type = "submit"; // Submit para activar evento del form
  btnSave.textContent = "Guardar Cambios";
  btnSave.className =
    "flex-1 py-2 rounded-md bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 hover:-translate-y-0.5 transition-all";

  // --- Eventos de los Botones ---

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
        tipo: typeGroup.input.value,
        material: materialGroup.input.value,
        tamaño: sizeGroup.input.value,
        estado: stateSelect.value,
        descripcion: descInput.value,
        imagen: inputImg.files[0]
          ? URL.createObjectURL(inputImg.files[0])
          : product.imagen,
      };

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
