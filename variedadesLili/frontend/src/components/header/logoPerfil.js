const logoPerfil = () => {
  // --- Contenedor (Botón) ---
  // Convertido a <button> para semántica y accesibilidad
  const container = document.createElement("button");
  container.type = "button";
  container.className =
    "logoPerfil group hidden md:flex items-center gap-2.5 cursor-pointer rounded-full p-1 " +
    "transition-colors duration-300 ease-in-out " +
    "hover:bg-slate-500/10 dark:hover:bg-slate-500/20 " + // Overlay sutil para fondo 'glass'
    "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 " +
    "focus:ring-offset-slate-100 dark:focus:ring-offset-slate-900"; // Offset coincide con el color base del 'glass' header

  // --- Imagen de Perfil ---
  const img = document.createElement("img");
  img.src = "./assets/perfil.png"; // Ruta de la imagen
  img.alt = "Foto de perfil";
  img.className =
    "perfilImg w-9 h-9 rounded-full object-cover border-2 border-pink-500 " +
    "transition-all duration-300 ease-in-out " +
    "group-hover:border-purple-500 group-hover:scale-105 " + // Animación en hover
    "group-focus:border-purple-500 " + // Estado de focus
    "motion-reduce:transform-none"; // Respetar 'prefers-reduced-motion'

  // --- Nombre de Usuario ---
  const name = document.createElement("span");
  name.textContent = "Usuario";
  name.className =
    "perfilNombre text-sm font-medium text-slate-700 dark:text-slate-200 hidden lg:block " +
    "transition-colors duration-300 ease-in-out pr-2 " + // Padding derecho para la forma de píldora
    "group-hover:text-purple-600 dark:group-hover:text-purple-400"; // Cambio de color en hover

  container.append(img, name);
  return container;
};

export default logoPerfil;
