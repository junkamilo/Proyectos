export const Description = (product) => {
  const descDiv = document.createElement("div");
  descDiv.className = "space-y-1.5";

  const descLabel = document.createElement("label");
  descLabel.textContent = "Descripción";
  descLabel.className =
    "text-xs font-bold tracking-wider text-slate-400 uppercase ml-1";

  const descInput = document.createElement("textarea");
  descInput.rows = 4;
  descInput.value = product.descripcion;
  descInput.className =
    "w-full px-4 py-2.5 rounded-lg text-sm " +
    "bg-slate-900/50 text-slate-200 placeholder-slate-600 " +
    "border border-slate-700 " +
    "focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none " +
    "resize-y custom-scrollbar transition-all duration-200";

  descDiv.append(descLabel, descInput);

  return { div: descDiv, input: descInput };
};
