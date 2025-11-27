import { actualizarFilaProducto } from "../../helpers/ModificarProductos/renderTabla.js";
import { updateProductoService } from "../../services/Productos/productosServices.js";
import { btnActions } from "./renderEdit/btnActions.js";
import { createInputGroup } from "./renderEdit/createInputGroup.js";
import { Description } from "./renderEdit/Description.js";
import { gridRows } from "./renderEdit/gridRow.js";
import { imgGroups } from "./renderEdit/imgGroup.js";
import { renderView } from "./renderView.js";

export const renderEdit = (product, detailContent) => {
  detailContent.innerHTML = "";

  // 1. Instanciamos imgGroups
  const { div: imgGroupContainer, input: inputImg } = imgGroups(product);

  // 2. Instanciamos gridRows
  const { div: gridRowDOM, inputs: gridInputs } = gridRows(product);

  // 3. Instanciamos Description
  const { div: descDiv, input: descInput } = Description(product);

  // 4. INSTANCIAMOS BOTONES CON EL CALLBACK DE CANCELAR
  // Aquí le decimos qué hacer cuando den click en cancelar
  const { actionDiv, btnSave } = btnActions(() => {
    // Esta función se ejecutará al dar click en Cancelar
    renderView(product, detailContent);
  });

  const form = document.createElement("form");
  form.className = "flex flex-col gap-6 animate-fade-in pb-4";
  const nameGroup = createInputGroup("Nombre del Producto", product.nombre);

  form.append(imgGroupContainer, nameGroup.div, gridRowDOM, descDiv);
  form.append(actionDiv);
  detailContent.append(form);

  // LÓGICA SUBMIT
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const originalBtnText = btnSave.textContent;
    btnSave.textContent = "Guardando...";
    btnSave.disabled = true;
    btnSave.classList.add("opacity-75", "cursor-wait");

    try {
      const formData = new FormData();

      // --- CORRECCIÓN CRÍTICA DE DATOS ---
      // Tienes que acceder a cada grupo específico, no a gridInputs directamente
      formData.append("nombre_producto", nameGroup.input.value);

      formData.append("precio", gridInputs.priceGroup.input.value);
      formData.append("cantidad", gridInputs.stockGroup.input.value);
      formData.append("categoria", gridInputs.categoriaGroup.select.value);
      formData.append("material", gridInputs.materialGroup.select.value);
      formData.append("tamano", gridInputs.sizeGroup.select.value);
      formData.append("estado", gridInputs.estadoGroup.select.value);
      formData.append("descripcion", descInput.value); // Usamos descInput directamente

      if (inputImg.files[0]) {
        formData.append("foto_producto", inputImg.files[0]);
      }

      // Llamada al servicio
      await updateProductoService(product.id_producto, formData);

      const nuevaImagenUrl = inputImg.files[0]
        ? URL.createObjectURL(inputImg.files[0])
        : product.url_foto_producto || product.imagen;

      // Actualizar objeto local
      const updatedProduct = {
        ...product, // Copiamos todo lo viejo

        // 1. ACTUALIZAMOS PROPIEDADES "BACKEND" (Para que renderView no lea las viejas)
        nombre_producto: nameGroup.input.value,
        url_foto_producto: nuevaImagenUrl,
        // Nota: si tu backend usa 'tamano' o 'tipo', actualízalos aquí también si difieren

        // 2. ACTUALIZAMOS PROPIEDADES "FRONTEND" (Para uso inmediato)
        nombre: nameGroup.input.value,
        precio: Number(gridInputs.priceGroup.input.value),
        cantidad: Number(gridInputs.stockGroup.input.value),
        categoria: gridInputs.categoriaGroup.select.value,
        material: gridInputs.materialGroup.select.value,
        tamano: gridInputs.sizeGroup.select.value,
        estado: gridInputs.estadoGroup.select.value, // Ojo: Verifica si tu back espera mayúscula o minúscula
        descripcion: descInput.value,
        imagen: nuevaImagenUrl,
      };

      if (typeof actualizarFilaProducto === "function") {
        actualizarFilaProducto(updatedProduct);
      }

      renderView(updatedProduct, detailContent);
      alert("Producto actualizado correctamente!");
    } catch (err) {
      console.error(err);
      alert("Hubo un error al actualizar el producto");
    } finally {
      btnSave.textContent = originalBtnText;
      btnSave.disabled = false;
      btnSave.classList.remove("opacity-75", "cursor-wait");
    }
  });
};
