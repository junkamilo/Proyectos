import { TablaInventario } from "../../components/Inventario/Tabla";

export const InventarioController = () => {
  const content = document.querySelector(".containerInventario");
  const tablaInfo = TablaInventario();

  content.append(tablaInfo);

  return content;
};
