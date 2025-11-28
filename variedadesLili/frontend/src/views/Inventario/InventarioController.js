import { DashboardInventario } from "../../components/Inventario/DashboardInventario";


export const InventarioController = () => {
  const content = document.querySelector(".containerInventario");
  const Inventario = DashboardInventario();

  content.append(Inventario);

  return content;
};
