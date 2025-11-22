import { TablaInventario } from "../../components/ModificarProductos/Tabla.js";

export const ModificarProductosController = async () => {
  const content = document.querySelector(".containerInventario");

  // 🔥 Protección adicional
  const tablaInfo = (await TablaInventario()) ?? document.createElement("div");

  content.append(tablaInfo);

  return content;
};

