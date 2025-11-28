import { createInfoRow } from "./createInfoRow";

export const cardSecuriti = (usuario) => {
  // 2. Tarjeta Seguridad y Contacto
  const cardSecurity = document.createElement("section");
  cardSecurity.className =
    "bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden shadow-lg flex flex-col";

  const headerSecurity = document.createElement("div");
  headerSecurity.className =
    "px-6 py-4 bg-slate-800/60 border-b border-slate-700/50";
  headerSecurity.innerHTML = `<h3 class="text-slate-200 font-bold flex items-center gap-2">
    <svg class="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
    Seguridad y Contacto
  </h3>`;

  const rowEmail = createInfoRow(
    "Correo Electrónico",
    usuario.email,
    false,
    () => alert("Editar email")
  );
  const rowPass = createInfoRow("Contraseña", usuario.contrasena, true, () =>
    alert("Cambiar contraseña")
  );

  // Estado de la cuenta (Visual extra)
  const statusDiv = document.createElement("div");
  statusDiv.className =
    "mt-auto p-4 bg-emerald-500/10 border-t border-slate-700/50 flex items-center justify-center gap-2";
  statusDiv.innerHTML = `
    <span class="relative flex h-3 w-3">
      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
      <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
    </span>
    <span class="text-xs font-bold text-emerald-400 uppercase tracking-wide">Cuenta Verificada y Activa</span>
  `;

  cardSecurity.append(headerSecurity, rowEmail, rowPass, statusDiv);

  return cardSecurity;
};
