export const identitysections = (usuario) => {
  // --- B. IDENTIDAD (Nombre y Rol) ---
  const identitySection = document.createElement("div");
  identitySection.className = "text-center px-4 mb-10";

  const nameTitle = document.createElement("h1");
  nameTitle.textContent = usuario.nombre;
  nameTitle.className = "text-3xl font-bold text-white tracking-tight mb-1";

  const usernameText = document.createElement("p");
  usernameText.textContent = `@${usuario.username}`;
  usernameText.className = "text-slate-400 font-medium text-lg mb-4";

  // Badge de Rol (Reutilizando estilos visuales)
  const roleBadge = document.createElement("span");
  roleBadge.textContent = usuario.rol;
  roleBadge.className =
    "inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest " +
    "bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.3)]";

  identitySection.append(nameTitle, usernameText, roleBadge);

  return identitySection;
};
