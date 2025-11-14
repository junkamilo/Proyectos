import { TablaInventario } from "../../components/ModificarProductos/Tabla.js";

export const ModificarProductosController = () => {
  const content = document.querySelector(".containerInventario");
  const tablaInfo = TablaInventario();

  content.append(tablaInfo);

  return content;
};
