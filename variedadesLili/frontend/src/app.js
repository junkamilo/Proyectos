import { header } from "./components/header/header";
import { router } from "./router/routers";
import "./style.css";

const app = document.getElementById("app");

// Ejecuta router al cargar
router(app);

// Vuelve a ejecutar router cuando cambie la ruta
window.addEventListener("hashchange", async () => {
  const currentView = await router(app);
  const headerMain = header();
  // Insertamos el header arriba
  app.prepend(headerMain);
});

//Aquí montas lo que quieras que aparezca apenas se abre la página.
window.addEventListener("DOMContentLoaded", async () => {
  const currentView = await router(app);
  const headerMain = header();
  // Insertamos el header arriba
  app.prepend(headerMain);
});
