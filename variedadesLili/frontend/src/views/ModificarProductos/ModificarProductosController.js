import { CrearFilaProducto } from "../../components/ModificarProductos/CuerpoTbodyTabla.js";
import { TablaInventario } from "../../components/ModificarProductos/Tabla.js";

export const ModificarProductosController = async () => {
  const content = document.querySelector(".containerInventario");

  // 🔥 Protección adicional
  const tablaInfo = (await TablaInventario()) ?? document.createElement("div");

  content.append(tablaInfo);

  // =========================================================
  // DEFINICIÓN DE LA FUNCIÓN GLOBAL DE ACTUALIZACIÓN
  // =========================================================
  window.actualizarFilaProducto = (productoActualizado) => {
    console.log(
      "⚡ Controlador recibiendo actualización:",
      productoActualizado
    );

    // 1. Buscamos la fila vieja por su ID
    const filaVieja = document.getElementById(
      `fila-prod-${productoActualizado.id_producto}`
    );

    if (filaVieja) {
      // 2. Recuperamos las referencias necesarias (DetailSection, detailContent)
      // Estas se guardaron en window.tablaReferencias dentro de CuerpoTbodyTabla.js
      const refs = window.tablaReferencias || {};

      // 3. Creamos la NUEVA fila usando la función importada
      // Si refs está vacío, podría fallar el click, pero visualmente se actualizará
      const filaNueva = CrearFilaProducto(productoActualizado, refs);

      // 4. Mantenemos el estado "seleccionado" (color morado) si la vieja lo estaba
      if (filaVieja.classList.contains("bg-purple-100")) {
        filaNueva.classList.add("bg-purple-100", "dark:bg-purple-900/30");
      }

      // 5. REEMPLAZO EN EL DOM
      filaVieja.replaceWith(filaNueva);

      // Feedback visual (Flash verde)
      filaNueva.classList.add(
        "bg-emerald-100",
        "transition-colors",
        "duration-500"
      );
      setTimeout(() => filaNueva.classList.remove("bg-emerald-100"), 500);
    } else {
      console.warn("No se encontró la fila antigua para reemplazar.");
    }
  };

  return content;
};
