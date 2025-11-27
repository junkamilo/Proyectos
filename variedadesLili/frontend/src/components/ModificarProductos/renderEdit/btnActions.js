// btnActions.js

// Eliminamos el import de renderView para evitar conflictos
// import { renderView } from "../renderView";

// Recibimos 'onCancel' como argumento
export const btnActions = (onCancel) => {
  const actionDiv = document.createElement("div");
  actionDiv.className =
    "grid grid-cols-2 gap-4 mt-4 pt-6 border-t border-slate-700/50";

  const btnCancel = document.createElement("button");
  btnCancel.type = "button";
  btnCancel.textContent = "Cancelar";
  btnCancel.className =
    "w-full py-2.5 rounded-lg text-sm font-semibold " +
    "text-slate-300 border border-slate-600 " +
    "hover:bg-slate-800 hover:text-white hover:border-slate-500 " +
    "transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500";

  // Ejecutamos la función que nos pasaron desde el padre
  btnCancel.addEventListener("click", () => {
    if (onCancel) onCancel();
  });

  const btnSave = document.createElement("button");
  btnSave.type = "submit";
  btnSave.textContent = "Guardar Cambios";
  btnSave.className =
    "w-full py-2.5 rounded-lg text-sm font-semibold text-white " +
    "bg-indigo-600 hover:bg-indigo-500 " +
    "shadow-lg shadow-indigo-500/20 " +
    "transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900";

  actionDiv.append(btnCancel, btnSave);

  return {
    actionDiv,
    btnCancel,
    btnSave,
  };
};
