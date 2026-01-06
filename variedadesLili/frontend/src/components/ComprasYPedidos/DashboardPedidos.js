import { getAllPedidosServices } from "../../services/Pedidos/PedidoServices";
import { HeaderTitle } from "./HeaderTitle";
import { OrderCard } from "./OrderCard";
import { EmptyState, LoadingState } from "./StateViews";
import { TabsFilter } from "./TabsFilter";

export const DashboardPedidos = () => {
  // --- CONFIGURACIÓN DOM ---
  const container = document.createElement("div");
  container.className =
    "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pb-20 animate-fade-in-up flex flex-col gap-8";

  const header = document.createElement("div");
  header.className = "flex flex-col gap-6";

  const ordersGrid = document.createElement("div");
  ordersGrid.className = "grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[300px]";

  // --- ESTADO ---
  let pedidosData = [];
  let currentFilter = "all";

  // --- FUNCIONES DE RENDERIZADO ---

  // 1. Renderizar la barra de filtros (Tabs)
  const renderTabs = () => {
    // Limpiamos el contenedor de tabs anterior (si existía) para redibujar
    const oldTabs = header.querySelector(".tabs-container-wrapper");
    if (oldTabs) oldTabs.remove();

    // Creamos el nuevo componente de tabs
    const tabs = TabsFilter(currentFilter, (newFilter) => {
      currentFilter = newFilter;
      renderTabs(); // Re-renderizamos tabs para actualizar estilos activo
      renderGrid(); // Re-renderizamos grid con nuevo filtro
    });

    // Wrapper para poder identificarlo y borrarlo al actualizar
    const wrapper = document.createElement("div");
    wrapper.className = "tabs-container-wrapper";
    wrapper.append(tabs);

    header.append(wrapper);
  };

  // 2. Renderizar la grilla de pedidos
  const renderGrid = () => {
    ordersGrid.innerHTML = "";

    // Validación de seguridad
    if (!Array.isArray(pedidosData)) pedidosData = [];

    const filteredData =
      currentFilter === "all"
        ? pedidosData
        : pedidosData.filter((p) => p.estado === currentFilter);

    if (filteredData.length === 0) {
      ordersGrid.innerHTML = EmptyState();
    } else {
      filteredData.forEach((pedido) => {
        // Llamamos al componente OrderCard importado
        ordersGrid.append(OrderCard(pedido));
      });
    }
  };

  // --- INICIALIZACIÓN ---
  const init = async () => {
    // 1. Montar estructura inicial
    const title = HeaderTitle(); // Asumo que devuelve un nodo DOM
    header.prepend(title);
    container.append(header, ordersGrid);

    // 2. Renderizar estado de carga
    renderTabs(); // Pintamos tabs iniciales
    ordersGrid.innerHTML = LoadingState();

    // 3. Obtener Datos
    pedidosData = await getAllPedidosServices();

    // 4. Pintar datos reales
    renderGrid();
  };

  init();

  return container;
};
