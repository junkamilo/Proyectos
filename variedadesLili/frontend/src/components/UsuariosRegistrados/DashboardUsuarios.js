export const DashboardUsuarios = (getAllClients) => {
  const clients = getAllClients?.data || [];

  const container = document.createElement("div");
  container.className =
    "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pb-12 animate-fade-in-up flex flex-col gap-8";

  // --- 1. HEADER & BUSCADOR ---
  const header = document.createElement("div");
  header.className =
    "flex flex-col md:flex-row justify-between items-end gap-6";

  const titleGroup = document.createElement("div");
  const title = document.createElement("h2");
  title.textContent = "Comunidad de Usuarios";
  title.className =
    "text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent";

  const subtitle = document.createElement("p");
  // CAMBIO: Usamos clients.length en lugar de mockUsuarios
  subtitle.innerHTML = `Gestión total de <span class="font-bold text-slate-800 dark:text-white">${clients.length}</span> usuarios registrados.`;
  subtitle.className =
    "text-sm text-slate-500 dark:text-slate-400 font-medium mt-1";

  titleGroup.append(title, subtitle);

  // Search Bar
  const searchWrapper = document.createElement("div");
  searchWrapper.className = "relative w-full md:w-80 group";

  const searchIcon = document.createElement("div");
  searchIcon.className =
    "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500 transition-colors pointer-events-none";
  searchIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>`;

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Buscar por nombre o correo...";
  searchInput.className =
    "w-full pl-10 pr-4 py-2.5 rounded-xl text-sm " +
    "bg-white/50 dark:bg-slate-800/50 backdrop-blur-md " +
    "border border-slate-200 dark:border-slate-700 " +
    "text-slate-800 dark:text-white " +
    "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white dark:focus:bg-slate-900 transition-all";

  // Lógica simple de búsqueda en el cliente
  searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    const cards = usersGrid.querySelectorAll(".user-card-item");
    cards.forEach((card) => {
      const name = card.dataset.name.toLowerCase();
      const email = card.dataset.email.toLowerCase();
      if (name.includes(term) || email.includes(term)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });

  searchWrapper.append(searchIcon, searchInput);
  header.append(titleGroup, searchWrapper);
  container.append(header);

  // --- 2. GRID DE USUARIOS ---
  const usersGrid = document.createElement("div");
  usersGrid.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";

  // --- HELPER: CARD DE USUARIO ---
  const createUserCard = (user) => {
    // CAMBIO: Definimos valores por defecto para datos que no vienen en la API
    const userRole = user.rol || "Cliente"; // Fallback
    const userStatus = user.estado || "online"; // Fallback
    const userCompras = user.compras || 0; // Fallback

    // Formatear fecha (usamos nacimiento o fecha actual si no hay registro)
    const rawDate = user.fecha_nacimiento || new Date().toISOString();
    const formattedDate = new Date(rawDate).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    const card = document.createElement("div");
    // Añadimos clase y dataset para el buscador
    card.className =
      "user-card-item group relative overflow-hidden rounded-2xl p-6 " +
      "bg-white/80 dark:bg-slate-800/90 backdrop-blur-xl " +
      "border border-white/50 dark:border-slate-700 " +
      "shadow-xl shadow-purple-900/5 hover:shadow-purple-900/15 " +
      "transition-all duration-300 hover:-translate-y-1";
    card.dataset.name = user.nombre_completo || "";
    card.dataset.email = user.email || "";

    // Header: Avatar + Rol
    const cardHeader = document.createElement("div");
    cardHeader.className = "flex justify-between items-start mb-4";

    // Avatar Wrapper
    const avatarWrapper = document.createElement("div");
    avatarWrapper.className = "relative";

    const img = document.createElement("img");
    // CAMBIO: Usamos nombre_completo para el avatar generado
    img.src =
      user.url_foto_perfil ||
      "https://ui-avatars.com/api/?background=random&name=" +
        encodeURIComponent(user.nombre_completo);
    img.alt = user.nombre_completo;
    img.className =
      "w-16 h-16 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-md";

    // Indicador de Estado
    const statusDot = document.createElement("span");
    const statusColor =
      userStatus === "online" ? "bg-green-500" : "bg-slate-400";
    statusDot.className = `absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white dark:border-slate-800 ${statusColor}`;

    avatarWrapper.append(img, statusDot);

    // Badge de Rol
    const roleBadge = document.createElement("span");
    roleBadge.textContent = userRole;
    const roleClass =
      userRole === "admin"
        ? "bg-purple-100 text-purple-700 border-purple-200"
        : "bg-blue-50 text-blue-600 border-blue-100";
    roleBadge.className = `px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${roleClass}`;

    cardHeader.append(avatarWrapper, roleBadge);

    // Info Principal
    const userInfo = document.createElement("div");
    userInfo.className = "mb-6";

    const name = document.createElement("h3");
    // CAMBIO: Propiedad real nombre_completo
    name.textContent = user.nombre_completo;
    name.className =
      "text-lg font-bold text-slate-800 dark:text-white truncate";

    const joinDate = document.createElement("p");
    // CAMBIO: Usamos la fecha formateada
    joinDate.textContent = `Nacimiento: ${formattedDate}`;
    joinDate.className =
      "text-xs text-slate-400 dark:text-slate-500 font-medium mb-3";

    // Stats rápidas
    const statsRow = document.createElement("div");
    statsRow.className =
      "flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 p-2 rounded-lg w-fit";
    statsRow.innerHTML = `
      <svg class="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
      <span>${userCompras} Pedidos</span>
    `;

    userInfo.append(name, joinDate, statsRow);

    // --- Footer: Acciones de Contacto ---
    const contactActions = document.createElement("div");
    contactActions.className =
      "grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-700";

    // Botón Email
    const emailBtn = document.createElement("a");
    emailBtn.href = `mailto:${user.email}`;
    emailBtn.className =
      "flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-colors " +
      "text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/30 hover:bg-purple-50 hover:text-purple-600 dark:hover:bg-purple-900/20 dark:hover:text-purple-400";
    emailBtn.innerHTML = `
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
      Email
    `;

    // Botón Teléfono (Condicional)
    const phoneBtn = document.createElement("a");
    // CAMBIO: Validación robusta del teléfono
    if (user.telefono && user.telefono.trim() !== "") {
      phoneBtn.href = `tel:${user.telefono}`;
      phoneBtn.className =
        "flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-colors " +
        "text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/30 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/20 dark:hover:text-green-400";
      phoneBtn.innerHTML = `
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
        Llamar
      `;
    } else {
      phoneBtn.className =
        "flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold text-slate-300 dark:text-slate-600 cursor-not-allowed bg-slate-50 dark:bg-slate-800/50";
      phoneBtn.innerHTML = `<span>Sin teléfono</span>`;
    }

    contactActions.append(emailBtn, phoneBtn);
    card.append(cardHeader, userInfo, contactActions);
    return card;
  };

  // Renderizar usuarios reales
  // CAMBIO: Iteramos sobre clients en lugar de mockUsuarios
  if (clients.length > 0) {
    clients.forEach((user) => {
      usersGrid.append(createUserCard(user));
    });
  } else {
    // Mensaje de estado vacío si no hay clientes
    const emptyState = document.createElement("div");
    emptyState.className =
      "col-span-full text-center py-12 text-slate-500 italic";
    emptyState.textContent = "No se encontraron usuarios registrados.";
    usersGrid.append(emptyState);
  }

  container.append(usersGrid);
  return container;
};
