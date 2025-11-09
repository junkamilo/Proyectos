import AgregarProductos from "./AgregarProductos";
import ComprasPedidos from "./ComprasPedidos";
import EliminarProductos from "./EliminarProductos";
import Inventario from "./Inventario";
import ModificarProductos from "./ModificarProductos";

const main = () => {
  // Instanciamos los componentes
  const addProductos = AgregarProductos();
  const editarProduc = ModificarProductos();
  const deleteProduct = EliminarProductos();
  const inventarioProductos = Inventario();
  const pedidos = ComprasPedidos();

  const container = document.createElement("main");
  // --- Clases de Tailwind Aplicadas (Main) ---
  // Layout: Ancho máximo y centrado (igual que el header), padding horizontal
  // Padding vertical 'py-8' para dar espacio debajo del header 'sticky'
  container.className = "appMain max-w-screen-xl mx-auto px-4 sm:px-6 py-8";

  // Título del área principal
  const title = document.createElement("h2");
  title.textContent = "Panel Principal";
  // --- Clases de Tailwind Aplicadas (Título) ---
  // Estilo: Grande, negrita, color oscuro y margen inferior
  title.className = "mainTitulo text-3xl font-bold text-slate-900 mb-6";

  // Contenedor donde irán las cards
  const content = document.createElement("div");
  // --- Clases de Tailwind Aplicadas (Content) ---
  // Layout: ¡CSS Grid!
  // 'grid': Activa el grid.
  // 'gap-6': Espacio entre tarjetas.
  // 'grid-cols-1': 1 columna en móvil (por defecto).
  // 'sm:grid-cols-2': 2 columnas en tablet.
  // 'lg:grid-cols-3': 3 columnas en escritorio.
  content.className =
    "mainContent grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";

  content.append(
    addProductos,
    editarProduc,
    deleteProduct,
    inventarioProductos,
    pedidos
  );

  container.append(title, content);

  return container;
};

export default main;