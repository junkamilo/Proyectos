export const AgregarUser = () => {

  // --- Card (Enlace) ---
  const card = document.createElement("a");
  card.href = "#AgregarUser"; // Navegación
  card.className =
    "cardAgregarUser group relative flex flex-col h-full items-center justify-center " + // Layout
    "rounded-xl border-2 border-dashed border-slate-400 dark:border-slate-600 " + // Estilo "Slot"
    "bg-white/50 dark:bg-slate-800/50 " + // Fondo (No-blanco dominante)
    "p-6 text-center " + // Padding y alineación
    "transition-all duration-300 ease-in-out " + // Animación
    "hover:border-solid hover:border-purple-500 dark:hover:border-purple-500 " + // Hover: Borde (Acento SPA)
    "hover:bg-white dark:hover:bg-slate-800 " + // Hover: Fondo opaco
    "hover:shadow-xl hover:-translate-y-1 " + // Hover: "Lift"
    "motion-reduce:transform-none " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 " + // Accesibilidad
    "focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950";

  // --- Icono (SVG "Usuario Plus") ---
  const icon = document.createElement("div");
  icon.className =
    "cardIcon flex h-16 w-16 items-center justify-center rounded-full " +
    "bg-slate-100 dark:bg-slate-700 " + // Fondo neutro (estilo "slot")
    "text-slate-500 dark:text-slate-400 " +
    "transition-colors duration-300 ease-in-out " +
    "group-hover:bg-purple-100 dark:group-hover:bg-purple-900/50 " + // Hover: Fondo acento
    "group-hover:text-purple-600 dark:group-hover:text-purple-400"; // Hover: Icono acento

  // SVG en línea para "Usuario Plus"
  icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-9 w-9">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.304 21.75c-2.661 0-5.087-.66-7.098-1.792a12.348 12.348 0 01-1.006-1.113z" />
    </svg>`;

  // --- Título ---
  const title = document.createElement("h3");
  title.textContent = "Agregar Usuario";
  title.className =
    "cardTitle mt-5 text-xl font-semibold " +
    "text-slate-900 dark:text-slate-100 " +
    "transition-colors duration-300 ease-in-out " +
    "group-hover:text-purple-600 dark:group-hover:text-purple-400"; // Hover: Texto acento

  // --- Descripción ---
  const desc = document.createElement("p");
  desc.textContent = "Añade nuevos administradores o usuarios al sistema."; // Descripción mejorada
  desc.className = "cardDesc mt-1 text-sm text-slate-600 dark:text-slate-400";

  // Botón (Eliminado, toda la card es el enlace)

  // --- Estructura ---
  card.append(icon, title, desc);

  return card;
};
