export const createButton = () => {
  const btn = document.createElement("button");
  btn.type = "submit";
  btn.textContent = "Registrar Usuario";
  btn.className =
    "col-span-1 md:col-span-2 w-full py-3.5 mt-4 rounded-xl " +
    "font-bold text-white tracking-wide uppercase text-sm " +
    "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 " +
    "shadow-lg shadow-purple-900/40 " +
    "transform transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 " +
    "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900";
  return btn;
};
