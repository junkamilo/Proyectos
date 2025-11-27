export const createInputGroup = (label, value, type = "text") => {
    const div = document.createElement("div");
    div.className = "w-full space-y-1.5";

    const lbl = document.createElement("label");
    lbl.textContent = label;
    lbl.className =
      "text-xs font-bold tracking-wider text-slate-400 uppercase ml-1";

    const input = document.createElement("input");
    input.type = type;
    input.value = value;
    input.className =
      "w-full px-4 py-2.5 rounded-lg text-sm " +
      "bg-slate-900/50 text-slate-200 placeholder-slate-600 " + // Colores Dark
      "border border-slate-700 " +
      "focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none " +
      "transition-all duration-200";

    div.append(lbl, input);
    return { div, input };
  };