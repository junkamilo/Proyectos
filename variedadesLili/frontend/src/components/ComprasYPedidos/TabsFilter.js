export const TabsFilter = (currentFilter, onFilterChange) => {
  const container = document.createElement("div");
  container.className =
    "flex flex-wrap gap-2 md:gap-4 p-1.5 bg-white/50 dark:bg-slate-800/50 rounded-2xl w-fit backdrop-blur-md border border-slate-200/50 dark:border-slate-700";

  const estados = [
    { id: "all", label: "Todos" },
    { id: "pagado", label: "Pagados" },
    { id: "enviado", label: "Enviados" },
    { id: "reclamado", label: "Reclamado" },
    { id: "entregado", label: "Entregados" },
    { id: "cancelado", label: "Cancelados" },
  ];

  estados.forEach((estado) => {
    const btn = document.createElement("button");
    btn.textContent = estado.label;

    const isActive = estado.id === currentFilter;
    const baseClass =
      "px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 focus:outline-none ";
    const activeClass =
      "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/30";
    const inactiveClass =
      "text-slate-500 hover:text-purple-600 hover:bg-white/80 dark:hover:bg-slate-700";

    btn.className = baseClass + (isActive ? activeClass : inactiveClass);

    btn.addEventListener("click", () => {
      onFilterChange(estado.id);
    });

    container.append(btn);
  });

  return container;
};
