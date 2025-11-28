import { createInfoRow } from "./createInfoRow";

export const cardProfile = (usuario) => {
  // 1. Tarjeta Información Personal
  const cardPersonal = document.createElement("section");
  cardPersonal.className =
    "bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden shadow-lg flex flex-col";

  // Header Tarjeta
  const headerPersonal = document.createElement("div");
  headerPersonal.className =
    "px-6 py-4 bg-slate-800/60 border-b border-slate-700/50";
  headerPersonal.innerHTML = `<h3 class="text-slate-200 font-bold flex items-center gap-2">
      <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      Información Personal
    </h3>`;

  // Filas
  const rowNombre = createInfoRow(
    "Nombre Completo",
    usuario.nombre,
    false,
    () => alert("Editar nombre")
  );
  const rowUser = createInfoRow(
    "Nombre de Usuario",
    usuario.username,
    false,
    () => alert("Editar username")
  );
  const rowFecha = createInfoRow(
    "Miembro desde",
    new Date(usuario.fecha_registro).toLocaleDateString(),
    false,
    null
  ); // Fecha no editable

  cardPersonal.append(headerPersonal, rowNombre, rowUser, rowFecha);

  return cardPersonal;
};
