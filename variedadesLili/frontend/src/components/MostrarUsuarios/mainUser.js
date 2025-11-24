import { editarUsuario, eliminarUsuario } from "../../services/Users/authService";
import { ModalEditarUsuario } from "../EditarUsuario/ModalEditarUsuario";

const getRoleStyle = (rol) => {
  const r = (rol || "usuario").toLowerCase();

  // Superadmin: Gradiente Púrpura/Dorado (Jerarquía alta)
  if (r === "superadmin") {
    return "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-purple-500/30";
  }
  // Admin: Indigo (Tecnológico)
  if (r === "admin") {
    return "bg-indigo-600 text-white shadow-indigo-500/30";
  }
  // Usuario: Slate (Neutro)
  return "bg-slate-700 text-slate-300 shadow-slate-500/10";
};

// ==========================================
// 2. COMPONENTE TARJETA DE USUARIO
// ==========================================
const UserCard = (usuario) => {
  const card = document.createElement("article");
  card.className =
    "group relative flex flex-col items-center p-6 " +
    "bg-slate-800/40 backdrop-blur-xl " + // Fondo Glass muy sutil
    "border border-slate-700/50 " +
    "rounded-2xl shadow-lg " +
    "transition-all duration-300 " +
    "hover:bg-slate-800/60 hover:border-slate-600 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-900/20"; // Efecto levitación

  // --- Avatar con Anillo de Estado ---
  const avatarContainer = document.createElement("div");
  avatarContainer.className = "relative mb-4";

  const img = document.createElement("img");
  img.src =
    usuario.url_foto_perfil ||
    "https://ui-avatars.com/api/?name=" + usuario.nombre + "&background=random";
  img.alt = usuario.nombre;
  img.className =
    "w-24 h-24 rounded-full object-cover " +
    "border-4 border-slate-800 shadow-xl " +
    "group-hover:scale-105 transition-transform duration-500";

  // Badge de Rol (Flotante sobre el avatar)
  const roleBadge = document.createElement("span");
  roleBadge.textContent = usuario.rol;
  roleBadge.className =
    `absolute -bottom-2 left-1/2 -translate-x-1/2 ` +
    `px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg ` +
    getRoleStyle(usuario.rol);

  avatarContainer.append(img, roleBadge);

  // --- Info del Usuario ---
  const infoContainer = document.createElement("div");
  infoContainer.className = "text-center w-full mb-6";

  const name = document.createElement("h3");
  name.textContent = usuario.nombre;
  name.className = "text-lg font-bold text-slate-100 truncate";

  const username = document.createElement("p");
  username.textContent = `@${usuario.username}`;
  username.className = "text-sm text-purple-400 font-medium mb-2";

  const emailContainer = document.createElement("div");
  emailContainer.className =
    "inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-900/50 border border-slate-700/50";
  emailContainer.innerHTML = `
    <svg class="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
    <span class="text-xs text-slate-400 truncate max-w-[150px]">${usuario.email}</span>
  `;

  infoContainer.append(name, username, emailContainer);

  // --- Acciones (Botones) ---
  const actionsContainer = document.createElement("div");
  actionsContainer.className =
    "grid grid-cols-2 gap-3 w-full mt-auto pt-4 border-t border-slate-700/50";

  // Botón Editar
  const btnEdit = document.createElement("button");
  btnEdit.className =
    "flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide " +
    "text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 hover:text-indigo-200 border border-indigo-500/20 " +
    "transition-colors duration-200";
  btnEdit.innerHTML = `
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
    Editar
  `;
  // Evento Edit (Hook)
  // Dentro del evento onclick del botón editar:
  btnEdit.onclick = async () => {
    ModalEditarUsuario(
      usuario, // El objeto con los datos actuales
      async (formData) => {
        // Aquí llamas a tu servicio
        try {
          console.log("Enviando datos...", Object.fromEntries(formData));
          // await updateUserServices(formData);
          await editarUsuario(formData);
          // ProductoAgregado({ message: "Usuario actualizado" }); // Tu alerta
          // Recargar usuarios...
        } catch (error) {
          console.error(error);
        }
      }
    );
  };

  // Botón Eliminar
  const btnDelete = document.createElement("button");
  btnDelete.className =
    "flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide " +
    "text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 hover:text-rose-200 border border-rose-500/20 " +
    "transition-colors duration-200";
  btnDelete.innerHTML = `
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
    Eliminar
  `;
  // Evento Delete (Hook)
  btnDelete.onclick = async () => {
    if (!confirm(`¿Seguro quieres eliminar a ${usuario.nombre}?`)) return;

    try {
      await eliminarUsuario(usuario.id_usuario);
      card.remove(); // elimina la tarjeta de la UI
    } catch (error) {
      alert("Error al eliminar usuario: " + error.message);
    }
  };

  actionsContainer.append(btnEdit, btnDelete);

  card.append(avatarContainer, infoContainer, actionsContainer);
  return card;
};

// ==========================================
// 3. COMPONENTE PRINCIPAL (Layout)
// ==========================================
export const MostrarUsuarios = async (usuarios = []) => {
  const container = document.createElement("div");
  container.className =
    "w-full max-w-[1400px] mx-auto px-4 sm:px-6 mb-12 animate-fade-in";

  // --- Header: Buscador y Contador ---
  const header = document.createElement("div");
  header.className =
    "flex flex-col sm:flex-row justify-between items-center gap-4 mb-8";

  // Título con contador
  const titleGroup = document.createElement("div");
  titleGroup.className = "flex items-baseline gap-3";

  const title = document.createElement("h2");
  title.textContent = "Directorio de Usuarios";
  title.className = "text-2xl font-bold text-slate-100";

  const badgeCount = document.createElement("span");
  badgeCount.textContent = `${usuarios.length} miembros`;
  badgeCount.className =
    "px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-800 text-slate-400 border border-slate-700";

  titleGroup.append(title, badgeCount);

  // Barra de Búsqueda (Visual)
  const searchContainer = document.createElement("div");
  searchContainer.className = "relative w-full sm:w-72 group";
  searchContainer.innerHTML = `
    <input type="text" placeholder="Buscar usuario..." 
      class="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-700 rounded-xl text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm">
    <svg class="absolute left-3 top-2.5 h-4 w-4 text-slate-500 group-focus-within:text-purple-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  `;

  header.append(titleGroup, searchContainer);

  // --- Grid de Usuarios ---
  const grid = document.createElement("div");
  grid.className =
    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6";

  // Renderizado de tarjetas
  if (usuarios.length > 0) {
    usuarios.forEach((user) => {
      grid.append(UserCard(user));
    });
  } else {
    // Estado vacío (Empty State)
    const emptyState = document.createElement("div");
    emptyState.className = "col-span-full py-12 text-center text-slate-500";
    emptyState.innerHTML = `
      <p class="text-lg">No hay usuarios registrados</p>
    `;
    grid.append(emptyState);
  }

  container.append(header, grid);
  return container;
};
