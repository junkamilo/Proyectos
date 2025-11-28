import { DashboardPedidos } from "../../components/ComprasYPedidos/DashboardPedidos";

export const PedidosController = () => {
  const content = document.querySelector(".containerPedidos");

  // Limpia si hay algo dentro
  content.innerHTML = "";

  // Crea el formulario y lo inserta
  const DasborPedidos = DashboardPedidos();

  content.appendChild(DasborPedidos);
};
