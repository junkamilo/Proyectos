// --- HELPER DE ICONOS SVG ---
export const getIconSvg = (name, classes) => {
  const svgs = {
    box: `<svg xmlns="http://www.w3.org/2000/svg" class="${classes}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>`,
    dollar: `<svg xmlns="http://www.w3.org/2000/svg" class="${classes}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
    cart: `<svg xmlns="http://www.w3.org/2000/svg" class="${classes}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>`,
    alert: `<svg xmlns="http://www.w3.org/2000/svg" class="${classes}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>`,
  };
  return svgs[name] || svgs.box;
};

export const createStatCard = (stat) => {
  const card = document.createElement("div");
  card.className =
    "relative overflow-hidden p-6 rounded-2xl " +
    "bg-white/80 dark:bg-slate-800/90 backdrop-blur-xl " +
    "border border-white/50 dark:border-slate-700 " +
    "shadow-xl shadow-purple-900/5 dark:shadow-black/20 " +
    "group hover:-translate-y-1 transition-transform duration-300";

  // Icono de fondo grande (Decorativo)
  const bgIcon = document.createElement("div");
  bgIcon.className =
    "absolute -right-4 -bottom-4 text-slate-100 dark:text-slate-700/50 opacity-50 transform rotate-12 group-hover:scale-110 transition-transform duration-500";
  bgIcon.innerHTML = getIconSvg(stat.icon, "h-24 w-24"); // Helper de iconos abajo

  // Contenido
  const content = document.createElement("div");
  content.className = "relative z-10";

  const headerRow = document.createElement("div");
  headerRow.className = "flex justify-between items-start mb-4";

  // Icono pequeño en círculo
  const iconCircle = document.createElement("div");
  // Colores dinámicos según el tipo
  let iconBg = "bg-purple-100 text-purple-600";
  if (stat.color === "emerald") iconBg = "bg-emerald-100 text-emerald-600";
  if (stat.color === "pink") iconBg = "bg-pink-100 text-pink-600";
  if (stat.color === "rose") iconBg = "bg-rose-100 text-rose-600";

  iconCircle.className = `p-3 rounded-xl ${iconBg}`;
  iconCircle.innerHTML = getIconSvg(stat.icon, "h-6 w-6");

  // Trend (Porcentaje)
  const trendBadge = document.createElement("span");
  const isPositive = stat.trend.includes("+");
  trendBadge.className = `text-xs font-bold px-2 py-1 rounded-full ${
    isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
  }`;
  trendBadge.textContent = stat.trend;

  headerRow.append(iconCircle, trendBadge);

  const valueEl = document.createElement("h3");
  valueEl.textContent = stat.value;
  valueEl.className = "text-3xl font-bold text-slate-800 dark:text-white mb-1";

  const labelEl = document.createElement("p");
  labelEl.textContent = stat.label;
  labelEl.className =
    "text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide";

  content.append(headerRow, valueEl, labelEl);
  card.append(bgIcon, content);
  return card;
};
