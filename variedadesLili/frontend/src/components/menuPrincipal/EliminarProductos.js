const EliminarProductos = () => {

  // --- Card (Enlace) ---
  const card = document.createElement("a");
  card.href = "#EliminarProductos"; // Navegación
  card.className =
    "cardEliminarProducto group flex flex-col h-full items-center justify-center text-center " + // Layout
    "bg-white dark:bg-slate-800 " + // Paleta (Superficie)
    "rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 " + // Estilo
    "p-6 transition-all duration-300 ease-in-out " + // Animación
    "hover:shadow-2xl hover:-translate-y-1 " + // Hover: "Lift"
    "motion-reduce:transform-none " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 " + // Accesibilidad (Acento Destructivo)
    "focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950"; // Offset sobre el color del body

  // --- Icono (SVG "Eliminar") ---
  const icon = document.createElement("div");
  icon.className =
    "cardIcon flex h-16 w-16 items-center justify-center rounded-full " +
    "bg-red-100 dark:bg-red-900/50 " + // Fondo (Acento Destructivo)
    "text-red-600 dark:text-red-400 " + // Color Icono (Acento Destructivo)
    "transition-colors duration-300 ease-in-out " +
    "group-hover:bg-red-200 dark:group-hover:bg-red-800"; // Interacción
  
  // SVG en línea para "Eliminar" (Papelera)
  icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-8 w-8">
      <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c.342.052.682.107 1.022.166m0 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166M6.615 5.79A48.108 48.108 0 018.082 5.397m10.05 0A48.108 48.108 0 0015.917 5.397M8.082 5.397l-.346-3.141A2.25 2.25 0 019.98 0h4.04a2.25 2.25 0 012.245 2.256l-.346 3.141" />
    </svg>`;

  // --- Título ---
  const title = document.createElement("h3");
  title.textContent = "Eliminar Producto";
  title.className =
    "cardTitle mt-5 text-xl font-semibold " +
    "text-slate-900 dark:text-slate-100 " +
    "transition-colors duration-300 ease-in-out " +
    "group-hover:text-red-600 dark:group-hover:text-red-400"; // Hover: Acento Destructivo

  // --- Descripción ---
  const desc = document.createElement("p");
  desc.textContent = "Desactiva o elimina permanentemente un producto del inventario."; // Descripción mejorada
  desc.className =
    "cardDesc mt-1 text-sm text-slate-600 dark:text-slate-400";

  // Botón (Eliminado, toda la card es el enlace)

  // --- Estructura ---
  card.append(icon, title, desc);

  return card;
};

export default EliminarProductos;
