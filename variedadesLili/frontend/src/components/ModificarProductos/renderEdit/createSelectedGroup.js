export const createSelectGroup = (label, options, selectedValue) => {
    const div = document.createElement("div");
    div.className = "w-full space-y-1.5";

    const lbl = document.createElement("label");
    lbl.textContent = label;
    lbl.className =
      "text-xs font-bold tracking-wider text-slate-400 uppercase ml-1";

    const wrapper = document.createElement("div");
    wrapper.className = "relative";

    const select = document.createElement("select");
    select.className =
      "w-full px-4 py-2.5 rounded-lg text-sm appearance-none " + // appearance-none para custom arrow
      "bg-slate-900/50 text-slate-200 " +
      "border border-slate-700 " +
      "focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none " +
      "cursor-pointer transition-all duration-200";

    options.forEach((optValue) => {
      const opt = document.createElement("option");
      opt.value = optValue;
      opt.textContent = optValue;
      // Las opciones nativas siempre son blancas/grises por el SO,
      // pero intentamos darles fondo oscuro
      opt.className = "bg-slate-800 text-slate-200";
      if (optValue === selectedValue) opt.selected = true;
      select.append(opt);
    });

    const arrow = document.createElement("div");
    arrow.className =
      "absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500";
    arrow.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    `;

    wrapper.append(select, arrow);
    div.append(lbl, wrapper);
    return { div, select };
  };
