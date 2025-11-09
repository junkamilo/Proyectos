import { router } from './router/routers';
import './style.css';

const app = document.getElementById("app");

// Ejecuta router al cargar
router(app);

// Vuelve a ejecutar router cuando cambie la ruta
window.addEventListener("hashchange", () => router(app));