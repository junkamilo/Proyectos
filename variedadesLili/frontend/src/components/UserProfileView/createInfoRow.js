/**
 * Crea una fila de información con etiqueta, valor y botón de editar.
 * @param {string} label - Título del campo (ej: Email).
 * @param {string} value - Valor real.
 * @param {boolean} isPassword - Si true, oculta el valor.
 * @param {function} onEdit - Callback al hacer click en editar.
 */

export const createInfoRow = (label, value, isPassword = false, onEdit) => {
  const row = document.createElement("div");
  row.className =
    "flex items-center justify-between p-4 " +
    "border-b border-slate-700/50 last:border-0 " +
    "transition-colors hover:bg-slate-700/30 group"; // Hover effect en la fila

  // Contenedor Texto
  const textGroup = document.createElement("div");
  textGroup.className = "flex flex-col gap-1";

  const lbl = document.createElement("span");
  lbl.textContent = label;
  lbl.className = "text-xs font-bold text-slate-500 uppercase tracking-wider";

  const val = document.createElement("span");
  val.textContent = isPassword ? "••••••••••••" : value;
  val.className = "text-sm sm:text-base font-medium text-slate-200 font-mono"; // font-mono para datos técnicos

  textGroup.append(lbl, val);

  // Botón Editar (Solo aparece/ilumina en hover del grupo en desktop, visible en mobile)
  const btnEdit = document.createElement("button");
  btnEdit.className =
    "p-2 rounded-lg text-slate-500 " +
    "opacity-100 sm:opacity-0 sm:group-hover:opacity-100 " + // Fade in en desktop
    "hover:bg-indigo-500/20 hover:text-indigo-400 " +
    "transition-all duration-200 focus:opacity-100 focus:outline-none";
  btnEdit.title = `Editar ${label}`;

  // Icono Pencil
  btnEdit.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
  `;

  if (onEdit) {
    btnEdit.onclick = onEdit;
    row.append(textGroup, btnEdit);
  } else {
    // Si no es editable (ej: fecha registro), solo mostramos texto
    row.append(textGroup);
  }

  return row;
};
