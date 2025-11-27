export const createInputGroup = (labelText, type = "text", placeholder = "") => {
  const container = document.createElement("div");
  container.className = "w-full space-y-2 group"; // Espaciado vertical

  const label = document.createElement("label");
  label.textContent = labelText;
  label.className =
    "block text-xs font-bold tracking-wider text-slate-400 uppercase ml-1 transition-colors group-focus-within:text-purple-400";

  const input = document.createElement("input");
  input.type = type;
  input.placeholder = placeholder;
  input.className =
    "w-full px-4 py-3 rounded-xl text-sm " +
    "bg-slate-900/50 text-slate-200 placeholder-slate-600 " + // Fondo oscuro translúcido
    "border border-slate-700 " +
    "focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none " +
    "transition-all duration-200 shadow-sm";

  container.append(label, input);
  return { container, input };
};
