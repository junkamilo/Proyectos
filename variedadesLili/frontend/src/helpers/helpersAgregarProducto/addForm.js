// manejadorFormularioProductos.js
import { agregarProductoService } from "../../services/Productos/productosServices.js";

export const addForm = (form, groups) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const inputFile = groups.groupUrl.querySelector("input[type='file']");
    const file = inputFile.files[0];

    // ✅ Usamos FormData
    const formData = new FormData();
    formData.append("nombre_producto", groups.groupNombre.querySelector("input").value);
    formData.append("descripcion", groups.groupDescripcion.querySelector("textarea").value);
    formData.append("cantidad", parseInt(groups.groupCantidad.querySelector("input").value, 10));
    formData.append("precio", parseFloat(groups.groupPrecio.querySelector("input").value));
    formData.append("tamano", groups.groupTamano.querySelector("select").value);
    formData.append("estado", groups.groupEstado.querySelector("select").value);
    formData.append("categoria", groups.groupCategoria.querySelector("input").value);
    formData.append("material", groups.groupMaterial.querySelector("input").value);

    // ✅ Adjuntamos el archivo si existe
    if (file) formData.append("foto_producto", file);

    try {
      const response = await agregarProductoService(formData);
      alert(`✅ ${response.message}`);
      form.reset();
    } catch (error) {
      alert(`❌ Error: ${error.message}`);
      console.error("[FormularioProductos] Error al agregar producto:", error);
    }
  });
};

