const ModificarProductos = () => {

  // --- Card (Enlace) ---
  const card = document.createElement("a");
  card.href = "#ModificarProductos"; // Navegación
  card.className =
    "cardModificarProducto group flex flex-col h-full items-center justify-center text-center " + // Layout
    "bg-white dark:bg-slate-800 " + // Paleta (Superficie sobre el body 'slate')
    "rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 " + // Estilo
    "p-6 transition-all duration-300 ease-in-out " + // Animación
    "hover:shadow-2xl hover:-translate-y-1 " + // Hover: "Lift"
    "motion-reduce:transform-none " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 " + // Accesibilidad
    "focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950"; // Offset sobre el color del body

  // --- Icono (SVG "Editar") ---
  const icon = document.createElement("div");
  icon.className =
    "cardIcon flex h-16 w-16 items-center justify-center rounded-full " +
    "bg-purple-100 dark:bg-purple-900/50 " + // Fondo (Acento SPA)
    "text-purple-600 dark:text-purple-400 " + // Color Icono (Acento SPA)
    "transition-colors duration-300 ease-in-out " +
    "group-hover:bg-purple-200 dark:group-hover:bg-purple-800"; // Interacción

  // SVG en línea para "Editar" (Lápiz)
  icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-8 w-8">
      <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zM16.862 4.487L19.5 7.125M18 14v4.5a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>`;

  // --- Título ---
  const title = document.createElement("h3");
  title.textContent = "Modificar Productos";
  title.className =
    "cardTitle mt-5 text-xl font-semibold " +
    "text-slate-900 dark:text-slate-100 " +
    "transition-colors duration-300 ease-in-out " +
    "group-hover:text-purple-600 dark:group-hover:text-purple-400"; // Hover: Acento SPA

  // --- Descripción ---
  const desc = document.createElement("p");
  desc.textContent =
    "Edita detalles, precios y stock de los productos existentes."; // Descripción mejorada
  desc.className = "cardDesc mt-1 text-sm text-slate-600 dark:text-slate-400";

  // Botón (Eliminado, toda la card es el enlace)

  // --- Estructura ---
  card.append(icon, title, desc);

  return card;
};

export default ModificarProductos;
