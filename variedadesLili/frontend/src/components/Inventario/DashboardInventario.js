import { createStatCard } from "./cardEstadisticas";
import { cardsBarraPorcentage } from "./cardsBarraPorcentage";
import { headerInventario } from "./headerInventario";
import { tablaProducts } from "./tablaProducts";

// Mock Data (Datos de ejemplo para visualizar el diseño)
export const mockDashboardData = {
  stats: [
    {
      label: "Total Productos",
      value: "1,248",
      icon: "box",
      trend: "+12%",
      color: "purple",
    },
    {
      label: "Valor Inventario",
      value: "$45.2M",
      icon: "dollar",
      trend: "+5.4%",
      color: "emerald",
    },
    {
      label: "Productos Vendidos",
      value: "8,540",
      icon: "cart",
      trend: "+23%",
      color: "pink",
    },
    {
      label: "Stock Bajo",
      value: "12",
      icon: "alert",
      trend: "-2",
      color: "rose",
    },
  ],
  topCategories: [
    { name: "Alcancías", percent: 75, color: "bg-purple-500" },
    { name: "Decoración", percent: 45, color: "bg-pink-500" },
    { name: "Macetas", percent: 30, color: "bg-amber-400" },
  ],
  recentProducts: [
    {
      name: "Alcancía Cerdito",
      category: "Alcancías",
      stock: 120,
      price: 15000,
      status: "active",
      img: "https://via.placeholder.com/40",
    },
    {
      name: "Jarrón Floral",
      category: "Decoración",
      stock: 5,
      price: 45000,
      status: "low",
      img: "https://via.placeholder.com/40",
    },
    {
      name: "Maceta Geométrica",
      category: "Macetas",
      stock: 0,
      price: 22000,
      status: "out",
      img: "https://via.placeholder.com/40",
    },
    {
      name: "Figura Gato",
      category: "Decoración",
      stock: 45,
      price: 18000,
      status: "active",
      img: "https://via.placeholder.com/40",
    },
  ],
};

export const DashboardInventario = () => {
  //instanciamos los componentes
  const header = headerInventario();
  const tableCard = tablaProducts();
  const catsCard = cardsBarraPorcentage();


  const container = document.createElement("div");
  container.className =
    "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pb-12 animate-fade-in-up flex flex-col gap-8";

  // --- 2. GRID DE ESTADÍSTICAS (KPI Cards) ---
  const statsGrid = document.createElement("div");
  statsGrid.className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6";

  // Helper para crear cards
  mockDashboardData.stats.forEach((stat) => {
    statsGrid.append(createStatCard(stat));
  });

  container.append(header, statsGrid);

  // --- 3. SECCIÓN PRINCIPAL (Tabla + Gráfica) ---
  const mainSection = document.createElement("div");
  mainSection.className = "grid grid-cols-1 lg:grid-cols-3 gap-8"

  mainSection.append(tableCard, catsCard);
  container.append(mainSection);

  return container;
};
