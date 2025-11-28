const UserRegistrados  = () => {
  // --- Card (Enlace) ---
  const card = document.createElement("a");
  card.href = "#UserRegisters"; // Navegación
  card.className =
    "cardPedidos group flex flex-col h-full items-center justify-center text-center " + // Layout
    "bg-white dark:bg-slate-800 " + // Paleta (Superficie)
    "rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 " + // Estilo
    "p-6 transition-all duration-300 ease-in-out " + // Animación
    "hover:shadow-2xl hover:-translate-y-1 " + // Hover: "Lift"
    "motion-reduce:transform-none " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 " + // Accesibilidad (Acento SPA)
    "focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950"; // Offset sobre el color del body

  // --- Icono (SVG "Lista de Pedidos") ---
  const icon = document.createElement("div");
  icon.className =
    "cardIcon flex h-16 w-16 items-center justify-center rounded-full " +
    "bg-purple-100 dark:bg-purple-900/50 " + // Fondo (Acento SPA)
    "text-purple-600 dark:text-purple-400 " + // Color Icono (Acento SPA)
    "transition-colors duration-300 ease-in-out " +
    "group-hover:bg-purple-200 dark:group-hover:bg-purple-800"; // Interacción

  // SVG en línea para "Pedidos" (Portapapeles con lista)
  icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-8 w-8">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75c0-.231-.035-.454-.1-.664M6.75 7.5H18a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25H6.75a2.25 2.25 0 01-2.25-2.25v-9a2.25 2.25 0 012.25-2.25z" />
    </svg>`;

  // --- Título ---
  const title = document.createElement("h3");
  title.textContent = "Usuarios";
  title.className =
    "cardTitle mt-5 text-xl font-semibold " +
    "text-slate-900 dark:text-slate-100 " +
    "transition-colors duration-300 ease-in-out " +
    "group-hover:text-purple-600 dark:group-hover:text-purple-400"; // Hover: Acento SPA

  // --- Descripción ---
  const desc = document.createElement("p");
  desc.textContent =
    "Revisa las órdenes de compra y gestiona los pedidos entrantes."; // Descripción corregida
  desc.className = "cardDesc mt-1 text-sm text-slate-600 dark:text-slate-400";

  // Botón (Eliminado, toda la card es el enlace)

  // --- Estructura ---
  card.append(icon, title, desc);

  return card;
};

export default UserRegistrados;