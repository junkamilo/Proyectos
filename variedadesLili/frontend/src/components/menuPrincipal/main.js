import AgregarProductos from "./AgregarProductos";
import { AgregarUser } from "./AgregarUser";
import ComprasPedidos from "./ComprasPedidos";
import EliminarProductos from "./EliminarProductos";
import Inventario from "./Inventario";
import ModificarProductos from "./ModificarProductos";
import UserRegistrados from "./usersRegistrados";

const main = () => {

  // Instanciamos los componentes
  const addProductos = AgregarProductos();
  const editarProduc = ModificarProductos();
  const deleteProduct = EliminarProductos();
  const inventarioProductos = Inventario();
  const pedidos = ComprasPedidos();
  const nuevoUser = AgregarUser();
  const UsuariosRegisters = UserRegistrados();

  // Contenedor principal (<main>)
  const container = document.createElement("main");
  // 'flex-grow' es clave para que ocupe el espacio entre header y footer
  container.className = "appMain flex-grow";

  // Wrapper interno para centrado y padding
  const innerWrapper = document.createElement("div");
  innerWrapper.className =
    "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 " + // Coherente con Header/Footer
    "py-12 md:py-16 " + // Más espaciado vertical
    "animate-fade-in-up"; // Animación de entrada (ver CSS)

  // Título del área principal
  const title = document.createElement("h2");
  title.textContent = "Panel Principal";
  // Título innovado con el gradiente de la SPA
  title.className =
    "mainTitulo text-4xl lg:text-5xl font-extrabold tracking-tight text-center mb-10 md:mb-14 " +
    "bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent animate-gradient-shift";

  // Contenedor donde irán las cards
  const content = document.createElement("div");
  content.className =
    "mainContent grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"; // Gap optimizado

  // --- Ensamblado (Lógica sin tocar) ---
  content.append(
    addProductos,
    editarProduc,
    deleteProduct,
    inventarioProductos,
    pedidos,
    nuevoUser,
    UsuariosRegisters
  );

  innerWrapper.append(title, content);
  container.append(innerWrapper);

  return container;
};

export default main;
