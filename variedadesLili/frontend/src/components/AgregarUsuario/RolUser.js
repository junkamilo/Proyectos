export const createSelectGroup = (labelText, options = []) => {
  const container = document.createElement("div");
  container.className = "w-full space-y-2 group";

  const label = document.createElement("label");
  label.textContent = labelText;
  label.className =
    "block text-xs font-bold tracking-wider text-slate-400 uppercase ml-1 transition-colors group-focus-within:text-purple-400";

  const wrapper = document.createElement("div");
  wrapper.className = "relative";

  const select = document.createElement("select");
  select.className =
    "w-full px-4 py-3 rounded-xl text-sm appearance-none cursor-pointer " +
    "bg-slate-900/50 text-slate-200 " +
    "border border-slate-700 " +
    "focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none " +
    "transition-all duration-200";

  options.forEach((optVal) => {
    const opt = document.createElement("option");
    opt.value = optVal.toLowerCase();
    opt.textContent = optVal;
    opt.className = "bg-slate-800 text-slate-200"; // Opciones legibles
    select.append(opt);
  });

  // Flecha custom
  const arrow = document.createElement("div");
  arrow.className =
    "absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500";
  arrow.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>`;

  wrapper.append(select, arrow);
  container.append(label, wrapper);
  return { container, select };
};
