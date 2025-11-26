import { estaAutenticado } from "../helpers/auth";
import { loadView } from "../helpers/loadView";
import { AgregarProductosController } from "../views/AgregarProductos/AgregarProductosController";
import { AgregarUserController } from "../views/AgregarUser/AgregarUserController";
import { EliminarProductosController } from "../views/EliminarProductos/EliminarProductosController";
import { InventarioController } from "../views/Inventario/InventarioController";
import { LoginController } from "../views/Login/LoginController";
import { menuPrincipalController } from "../views/MenuPrincipal/menuPrincipalController";
import { ModificarProductosController } from "../views/ModificarProductos/ModificarProductosController";
import { mostrarUserController } from "../views/MostrarUsers/mostrarUserController";
import { PedidosController } from "../views/Pedidos/PedidosController";
import { userProfileController } from "../views/UserProfile/userProfileController";

const routes = {
  "/": {
    template: "MenuPrincipal/menuPrincipal.html",
    controlador: menuPrincipalController,
    private: true,
  },
  Login: {
    template: "Login/login.html",
    controlador: LoginController,
    private: false,
  },
  AgregarProductos: {
    template: "AgregarProductos/AgregarProductos.html",
    controlador: AgregarProductosController,
    private: true,
  },
  AgregarUser: {
    template: "AgregarUser/AgregarUser.html",
    controlador: AgregarUserController,
    private: true,
  },
  MostrarUsers: {
    template: "MostrarUsers/mostrarUser.html",
    controlador: mostrarUserController,
    private: true,
  },
  ProFileView: {
    template: "UserProfile/userProfile.html",
    controlador: userProfileController,
    private: true,
  },
  EliminarProductos: {
    template: "EliminarProductos/EliminarProductos.html",
    controlador: EliminarProductosController,
    private: true,
  },
  Inventario: {
    template: "Inventario/Inventario.html",
    controlador: InventarioController,
    private: true,
  },
  ModificarProductos: {
    template: "ModificarProductos/ModificarProductos.html",
    controlador: ModificarProductosController,
    private: true,
  },
  Pedidos: {
    template: "Pedidos/Pedidos.html",
    controlador: PedidosController,
    private: true,
  },
};

export const router = async (app) => {
  const hash = location.hash.slice(1);
  const [rutas, params] = matchRoute(hash);

  if (!rutas) {
    app.className = "";
    await loadView(app, "MenuPrincipal/menuPrincipal.html");
    menuPrincipalController();
    return;
  }

  //si las rutas son privadas y el usuario no esta autenticado
  if (rutas.private && !estaAutenticado()) {
    //lo redirijimos a que se inicie seccion(login)
    window.location.hash = "#Login";
    return;
  }

  // 2. Protección de rutas de LOGIN (Si YA eres usuario, vete al Home)
  // Si la ruta es "Login" y el usuario SÍ está autenticado...
  if (hash === "Login" && estaAutenticado()) {
    window.location.hash = "/"; // Redirige al home (o tu ruta principal)
    return;
  }
  // return
  app.className = "";

  // Llamando la vista
  await loadView(app, rutas.template);
  // Ejecutar el controldor
  rutas.controlador(params);
};

const matchRoute = (hash) => {
  const arreglo = hash.replace(/^#/, "").split("/");

  for (const route in routes) {
    const b = route.split("/");

    if (b.length !== arreglo.length) continue;

    const params = {};

    const matched = b.every((parte, i) => {
      if (parte.startsWith(":")) {
        const partName = parte.slice(1);
        const value = arreglo[i];
        params[partName] = value;
        return true;
      }
      if (parte === arreglo[i]) {
        return true;
      }
    });
    if (matched) {
      return [routes[route], params];
    }
  }
  return [null, null];
};
