export const PrecioProducto = () => {

  // --- Grupo: Precio ---
  const groupPrecio = document.createElement("div");
  groupPrecio.className = "flex flex-col gap-2 group";

  // Label
  const labelPrecio = document.createElement("label");
  labelPrecio.textContent = "Precio:";
  labelPrecio.setAttribute("for", "precio_producto");
  labelPrecio.className =
    "text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1 transition-colors group-focus-within:text-purple-600 dark:group-focus-within:text-purple-400";

  // Wrapper relativo para el icono de moneda
  const inputWrapper = document.createElement("div");
  inputWrapper.className = "relative w-full";

  // Símbolo de Moneda ($)
  const currencySymbol = document.createElement("span");
  currencySymbol.textContent = "$";
  currencySymbol.className =
    "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-medium pointer-events-none";

  // Input Number
  const inputPrecio = document.createElement("input");
  inputPrecio.type = "number";
  inputPrecio.id = "precio_producto";
  inputPrecio.name = "precio";
  inputPrecio.min = "0";
  inputPrecio.step = "0.01";
  inputPrecio.placeholder = "15000";
  inputPrecio.required = true;

  inputPrecio.className =
    "w-full rounded-lg border border-slate-300 dark:border-slate-600 " + // Estructura
    "bg-slate-50 dark:bg-slate-900/50 " + // Fondo sutil
    "text-slate-900 dark:text-white " + // Texto
    "pl-8 pr-4 py-2.5 shadow-sm " + // Padding (pl-8 deja espacio al $)
    "placeholder:text-slate-400 dark:placeholder:text-slate-500 " + // Placeholder
    "transition-all duration-300 ease-in-out " + // Animación
    "focus:bg-white dark:focus:bg-slate-950 " + // Focus: Fondo
    "focus:border-purple-500 " + // Focus: Borde
    "focus:outline-none focus:ring-4 focus:ring-purple-500/20"; // Focus: Glow

  // Ensamblado del wrapper
  inputWrapper.append(currencySymbol, inputPrecio);
  groupPrecio.append(labelPrecio, inputWrapper);

  return groupPrecio;
};
