import { loadView } from "../helpers/loadView";
import { inicioController } from "../views/Inicio/inicioController";

const routes = {
  "/": {
    template: "Inicio/inicio.html",
    controlador: inicioController,
    private: false,
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
  console.log("Controlador recibe params:", params);
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

    console.log("Ruta coincidida:", route);
    console.log("Parámetros detectados:", params);
    if (matched) {
      return [routes[route], params];
    }
  }
  return [null, null];
};
