import { TablaInventario } from "../../components/EliminarProducto/Tabla";

export const EliminarProductosController = () => {
  const content = document.querySelector(".containerEliminar");
  const tablaInfo = TablaInventario();

  content.append(tablaInfo);

  return content;
};
