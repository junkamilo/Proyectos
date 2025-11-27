import { TablaEliminarProducto } from "../../components/EliminarProducto/Tabla";

export const EliminarProductosController = async () => {
  const content = document.querySelector(".containerEliminar");
  const tablaInfo = await TablaEliminarProducto();

  content.append(tablaInfo);

  return content;
};
