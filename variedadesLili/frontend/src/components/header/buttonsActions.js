/* --- Botón Principal (Iniciar Sesión) --- */
export const ButtonIniciarSeccion = () => {
  const button = document.createElement("button");
  button.textContent = "Iniciar Sesión";
  button.className =
    "hidden md:block font-semibold py-2 px-5 rounded-lg " + // Sizing
    "text-white " + // Texto
    "bg-gradient-to-r from-purple-500 to-pink-500 " + // Gradiente (Acento SPA)
    "shadow-md dark:shadow-black/25 " + // Sombra sutil
    "transition-all duration-300 ease-in-out " + // Animación
    "hover:shadow-lg hover:-translate-y-0.5 " + // Hover: "lift"
    "active:translate-y-0 active:shadow-sm " + // Active: "press"
    "motion-reduce:transform-none " + // Accesibilidad
    "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 " +
    "focus:ring-offset-slate-100 dark:focus:ring-offset-slate-900"; // Coherencia 'glass'

  return button;
};

/* --- Botón Secundario (Cerrar Sesión) --- */
export const ButtonCerraSeccion = () => {
  const button = document.createElement("button");
  button.textContent = "Cerrar Sesión";
  button.className =
    "hidden md:block font-medium py-2 px-5 rounded-lg " + // Sizing
    "text-red-600 dark:text-red-500 " + // Color (Destructivo)
    "bg-transparent " + // Sin fondo por defecto (Coherencia 'glass')
    "transition-colors duration-300 ease-in-out " + // Animación
    "hover:bg-red-500/10 dark:hover:bg-red-500/20 " + // Hover: Fondo 'glass' rojo
    "focus:outline-none " +
    "focus:ring-2 focus:ring-red-500 focus:ring-offset-2 " + // Foco
    "focus:ring-offset-slate-100 dark:focus:ring-offset-slate-900"; // Coherencia 'glass'

  return button;
};
