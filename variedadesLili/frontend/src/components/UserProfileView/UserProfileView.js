// ==========================================
// 1. HELPERS DE UI (Filas de Datos)
// ==========================================

/**
 * Crea una fila de información con etiqueta, valor y botón de editar.
 * @param {string} label - Título del campo (ej: Email).
 * @param {string} value - Valor real.
 * @param {boolean} isPassword - Si true, oculta el valor.
 * @param {function} onEdit - Callback al hacer click en editar.
 */
const createInfoRow = (label, value, isPassword = false, onEdit) => {
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

// ==========================================
// 2. COMPONENTE PRINCIPAL
// ==========================================

export const UserProfileView = (usuario) => {
  const container = document.createElement("div");
  container.className = "w-full max-w-4xl mx-auto pb-12 animate-fade-in";

  // --- A. PORTADA (COVER) + AVATAR ---
  const headerSection = document.createElement("header");
  headerSection.className = "relative mb-20 sm:mb-24"; // Margen inferior para dar espacio al avatar

  // 1. Fondo Gradiente (Cover simulado)
  const cover = document.createElement("div");
  cover.className =
    "h-48 sm:h-64 w-full rounded-b-3xl " +
    "bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 " + // Base oscura
    "relative overflow-hidden";

  // Patrón decorativo overlay (opcional para textura)
  const pattern = document.createElement("div");
  pattern.className =
    "absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]";
  cover.append(pattern);

  // 2. Avatar Flotante
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className =
    "absolute left-1/2 -translate-x-1/2 -bottom-16 sm:-bottom-20 " + // Posicionamiento central superpuesto
    "group cursor-pointer";

  // Imagen
  const avatarImg = document.createElement("img");
  avatarImg.src =
    usuario.url_foto_perfil ||
    `https://ui-avatars.com/api/?name=${usuario.nombre}&background=0f172a&color=fff`;
  avatarImg.className =
    "w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover " +
    "border-[6px] border-slate-900 " + // Borde grueso del color del fondo de la app para efecto "recorte"
    "shadow-2xl shadow-purple-500/20 transition-transform duration-500 group-hover:scale-105";

  // Botón flotante para cambiar foto (Cámara)
  const changePhotoBtn = document.createElement("div");
  changePhotoBtn.className =
    "absolute bottom-2 right-2 p-2.5 rounded-full " +
    "bg-indigo-600 text-white shadow-lg border-4 border-slate-900 " +
    "transition-transform duration-300 group-hover:scale-110 group-hover:bg-indigo-500";
  changePhotoBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  `;

  // Input file oculto para lógica futura
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.className = "hidden";
  avatarWrapper.onclick = () => fileInput.click();

  avatarWrapper.append(avatarImg, changePhotoBtn, fileInput);
  headerSection.append(cover, avatarWrapper);

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

  // --- C. GRID DE INFORMACIÓN (Tarjetas Glass) ---
  const gridContainer = document.createElement("div");
  gridContainer.className =
    "grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 sm:px-8";

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

  gridContainer.append(cardPersonal, cardSecurity);

  // Ensamblaje Final
  container.append(headerSection, identitySection, gridContainer);

  return container;
};
