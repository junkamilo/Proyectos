import { Footer } from "./components/footer/footer";
import { header } from "./components/header/header";
import { router } from "./router/routers";
import "./style.css";

const app = document.getElementById("app");
const body = document.querySelector("body");
const headerMain = header();
const footer = Footer();
body.append(headerMain, app, footer);

// Ejecuta router al cargar
router(app);

// Vuelve a ejecutar router cuando cambie la ruta
window.addEventListener("hashchange", async () => {
  const currentView = await router(app);
});

//Aquí montas lo que quieras que aparezca apenas se abre la página.
window.addEventListener("DOMContentLoaded", async () => {
  const currentView = await router(app);
});
