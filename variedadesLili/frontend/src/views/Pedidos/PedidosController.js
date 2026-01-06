import { DashboardPedidos } from "../../components/ComprasYPedidos/DashboardPedidos";

export const PedidosController = async () => {
  const content = document.querySelector(".containerPedidos");

  // Limpia si hay algo dentro
  content.innerHTML = "";

  // Crea el formulario y lo inserta
  const DasborPedidos = await DashboardPedidos();

  content.appendChild(DasborPedidos);
};
