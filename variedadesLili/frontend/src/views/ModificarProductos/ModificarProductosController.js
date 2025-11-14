import { TablaInventario } from "../../components/ModificarProductos/Tabla.js";

export const ModificarProductosController = async () => {
  const content = document.querySelector(".containerInventario");
  const tablaInfo = await TablaInventario();

  content.append(tablaInfo);

  return content;
};
