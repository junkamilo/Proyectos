const Inventario = () => {

  // --- Card (Enlace) ---
  const card = document.createElement("a");
  card.href = "#Inventario"; // Navegación
  card.className =
    "cardInventario group flex flex-col h-full items-center justify-center text-center " + // Layout
    "bg-white dark:bg-slate-800 " + // Paleta (Superficie)
    "rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 " + // Estilo
    "p-6 transition-all duration-300 ease-in-out " + // Animación
    "hover:shadow-2xl hover:-translate-y-1 " + // Hover: "Lift"
    "motion-reduce:transform-none " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 " + // Accesibilidad (Acento SPA)
    "focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950"; // Offset sobre el color del body

  // --- Icono (SVG "Inventario/Caja") ---
  const icon = document.createElement("div");
  icon.className =
    "cardIcon flex h-16 w-16 items-center justify-center rounded-full " +
    "bg-purple-100 dark:bg-purple-900/50 " + // Fondo (Acento SPA)
    "text-purple-600 dark:text-purple-400 " + // Color Icono (Acento SPA)
    "transition-colors duration-300 ease-in-out " +
    "group-hover:bg-purple-200 dark:group-hover:bg-purple-800"; // Interacción
  
  // SVG en línea para "Inventario" (Caja de Archivo)
  icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-8 w-8">
      <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>`;

  // --- Título ---
  const title = document.createElement("h3");
  title.textContent = "Inventario";
  title.className =
    "cardTitle mt-5 text-xl font-semibold " +
    "text-slate-900 dark:text-slate-100 " +
    "transition-colors duration-300 ease-in-out " +
    "group-hover:text-purple-600 dark:group-hover:text-purple-400"; // Hover: Acento SPA

  // --- Descripción ---
  const desc = document.createElement("p");
  desc.textContent = "Revisa y gestiona el stock de todos los productos."; // Descripción mejorada
  desc.className =
    "cardDesc mt-1 text-sm text-slate-600 dark:text-slate-400";

  // Botón (Eliminado, toda la card es el enlace)

  // --- Estructura ---
  card.append(icon, title, desc);

  return card;
};

export default Inventario;