export const headerInventario = () => {
  // --- 1. TÍTULO Y BIENVENIDA ---
  const header = document.createElement("div");
  header.className =
    "flex flex-col md:flex-row justify-between items-start md:items-center gap-4";

  const titleGroup = document.createElement("div");
  const title = document.createElement("h2");
  title.textContent = "Dashboard de Inventario";
  title.className =
    "text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent";

  const subtitle = document.createElement("p");
  subtitle.textContent = "Resumen general de tu stock y movimientos.";
  subtitle.className = "text-sm text-slate-500 dark:text-slate-400 font-medium";

  titleGroup.append(title, subtitle);

  // Botón de acción rápida (Ej: Descargar reporte)
  const actionBtn = document.createElement("button");
  actionBtn.textContent = "Descargar Reporte";
  actionBtn.className =
    "px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 " +
    "text-slate-600 dark:text-slate-300 font-semibold text-sm shadow-sm " +
    "hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors";

  header.append(titleGroup, actionBtn);

  return header;
};
