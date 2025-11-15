import { estaAutenticado } from "../helpers/auth";
import { loadView } from "../helpers/loadView";
import { AgregarProductosController } from "../views/AgregarProductos/AgregarProductosController";
import { AgregarUserController } from "../views/AgregarUser/AgregarUserController";
import { EliminarProductosController } from "../views/EliminarProductos/EliminarProductosController";
import { inicioController } from "../views/Inicio/inicioController";
import { InventarioController } from "../views/Inventario/InventarioController";
import { menuPrincipalController } from "../views/MenuPrincipal/menuPrincipalController";
import { ModificarProductosController } from "../views/ModificarProductos/ModificarProductosController";
import { PedidosController } from "../views/Pedidos/PedidosController";

const routes = {
  "/": {
    template: "Inicio/inicio.html",
    controlador: inicioController,
    private: false,
  },
  MenuPrincipal: {
    template: "MenuPrincipal/menuPrincipal.html",
    controlador: menuPrincipalController,
    private: true,
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
    await loadView(app, "Inicio/inicio.html");
    inicioController();
    return;
  }

  //si las rutas son privadas y el usuario no esta autenticado
  if (rutas.private && !estaAutenticado()) {
    //lo redirijimos a que se inicie seccion(login)
    window.location.hash = "#Login";
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
