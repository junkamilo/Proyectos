import { editarUsuario } from "../../services/Users/authService";
import API_URL from "../../utils/api";

/**
 * Modal para editar usuario.
 * @param {Object} usuario - Objeto con los datos actuales (id_usuario, nombre, etc.)
 * @param {Function} onSave - Callback que recibe el FormData listo para enviar.
 * @param {Function} onClose - Callback para cerrar el modal (opcional si se maneja internamente).
 */
export const ModalEditarUsuario = (usuario, onSave, onClose) => {
  // 1. BACKDROP
  const overlay = document.createElement("div");
  overlay.className =
    "fixed inset-0 z-50 flex items-center justify-center p-4 " +
    "bg-slate-900/80 backdrop-blur-sm " +
    "animate-fade-in transition-opacity duration-300";

  const closeModal = () => {
    overlay.classList.add("opacity-0");
    setTimeout(() => {
      overlay.remove();
      if (onClose) onClose();
    }, 300);
  };

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  // 2. MODAL
  const modal = document.createElement("div");
  modal.className =
    "relative w-full max-w-lg " +
    "bg-slate-800 border border-slate-700 " +
    "rounded-2xl shadow-2xl shadow-black/50 " +
    "flex flex-col overflow-hidden animate-scale-up";
  modal.addEventListener("click", (e) => e.stopPropagation());

  // HEADER
  const header = document.createElement("div");
  header.className =
    "flex justify-between items-center px-6 py-4 " +
    "border-b border-slate-700/50 bg-slate-800/50";

  const title = document.createElement("h3");
  title.textContent = "Editar Perfil";
  title.className = "text-lg font-bold text-slate-100";

  const closeBtn = document.createElement("button");
  closeBtn.innerHTML = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;
  closeBtn.className = "text-slate-400 hover:text-white transition-colors";
  closeBtn.onclick = closeModal;

  header.append(title, closeBtn);

  // FORM
  const form = document.createElement("form");
  form.className =
    "p-6 space-y-5 overflow-y-auto max-h-[80vh] custom-scrollbar";

  // FOTO
  const photoSection = document.createElement("div");
  photoSection.className = "flex flex-col items-center gap-3 mb-2";

  const imgContainer = document.createElement("div");
  imgContainer.className = "relative group w-24 h-24 cursor-pointer";

  const imgPreview = document.createElement("img");

  // -----------------------------------------------------------
  // LÓGICA DE URL CORREGIDA
  // -----------------------------------------------------------
  if (usuario.url_foto_perfil) {
    if (usuario.url_foto_perfil.startsWith("http")) {
      // Si es una imagen externa (ej. Cloudinary o Google)
      imgPreview.src = usuario.url_foto_perfil;
    } else {
      // Si viene de TU base de datos (ej: /uploads/usuarios/foto.jpg)
      // Concatenamos http://localhost:3000 + /uploads/...
      imgPreview.src = `${API_URL}${usuario.url_foto_perfil}`;
    }
  } else {
    // Avatar por defecto
    imgPreview.src = `https://ui-avatars.com/api/?name=${usuario.nombre}&background=random`;
  }
  // -----------------------------------------------------------

  imgPreview.className =
    "w-full h-full rounded-full object-cover border-2 border-slate-600 group-hover:border-indigo-500 transition-colors bg-slate-700";
    
  // Manejo de error visual (si la imagen no carga, poner default)
  imgPreview.onerror = () => {
     imgPreview.src = `https://ui-avatars.com/api/?name=${usuario.nombre}&background=random`;
  };

  const editOverlay = document.createElement("div");
  editOverlay.className =
    "absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity";
  editOverlay.innerHTML = `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path></svg>`;

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.className = "hidden";
  fileInput.onchange = (e) => {
    if (e.target.files[0]) {
      imgPreview.src = URL.createObjectURL(e.target.files[0]);
    }
  };

  imgContainer.onclick = () => fileInput.click();
  imgContainer.append(imgPreview, editOverlay, fileInput);

  const photoLabel = document.createElement("span");
  photoLabel.textContent = "Toca para cambiar foto";
  photoLabel.className = "text-xs text-slate-500 font-medium";

  photoSection.append(imgContainer, photoLabel);
  form.append(photoSection);

  // CAMPOS
  const createField = (label, name, value, type = "text") => {
    const div = document.createElement("div");
    div.className = "space-y-1.5";
    div.innerHTML = `
      <label class="block text-xs font-bold text-slate-400 uppercase ml-1">${label}</label>
      <input type="${type}" name="${name}" value="${value}" 
        class="w-full px-4 py-2.5 rounded-lg bg-slate-900/50 border border-slate-700 text-slate-200 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all placeholder-slate-600">
    `;
    return div;
  };

  const nombreField = createField("Nombre Completo", "nombre", usuario.nombre);
  const userField = createField("Usuario", "username", usuario.username);
  const emailField = createField("Correo Electrónico", "email", usuario.email, "email");

  // ROL
  const roleDiv = document.createElement("div");
  roleDiv.className = "space-y-1.5";
  const roleLabel = document.createElement("label");
  roleLabel.className = "block text-xs font-bold text-slate-400 uppercase ml-1";
  roleLabel.textContent = "Rol de Usuario";

  const roleSelect = document.createElement("div");
  roleSelect.className = "relative";
  roleSelect.innerHTML = `
    <select name="rol" class="w-full px-4 py-2.5 rounded-lg bg-slate-900/50 border border-slate-700 text-slate-200 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none appearance-none cursor-pointer">
      <option value="usuario" class="bg-slate-800">Usuario</option>
      <option value="admin" class="bg-slate-800">Admin</option>
      <option value="superadmin" class="bg-slate-800">Superadmin</option>
    </select>
    <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
    </div>
  `;
  roleSelect.querySelector("select").value = usuario.rol || "usuario";
  roleDiv.append(roleLabel, roleSelect);

  const gridInputs = document.createElement("div");
  gridInputs.className = "grid grid-cols-1 sm:grid-cols-2 gap-4";
  gridInputs.append(nombreField, userField);

  form.append(gridInputs, emailField, roleDiv);

  // FOOTER (dentro del form)
  const footer = document.createElement("div");
  footer.className =
    "grid grid-cols-2 gap-3 px-6 py-4 bg-slate-800/50 border-t border-slate-700/50";

  const btnCancel = document.createElement("button");
  btnCancel.type = "button";
  btnCancel.textContent = "Cancelar";
  btnCancel.className =
    "px-4 py-2 rounded-lg text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-700 transition-colors";
  btnCancel.onclick = closeModal;

  const btnSave = document.createElement("button");
  btnSave.type = "submit";
  btnSave.textContent = "Guardar Cambios";
  btnSave.className =
    "px-4 py-2 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 transition-all transform active:scale-95";

  footer.append(btnCancel, btnSave);
  form.append(footer); 

  modal.append(header, form);
  overlay.append(modal);
  document.body.appendChild(overlay);

  // SUBMIT
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    if (fileInput.files[0]) {
      formData.append("url_foto_perfil", fileInput.files[0]);
    } else {
      // Importante: Mandar la ruta vieja si no se seleccionó foto nueva
      formData.append("url_foto_perfil_existente", usuario.url_foto_perfil);
    }

    btnSave.textContent = "Guardando...";
    btnSave.disabled = true;

    try {
      const response = await editarUsuario(usuario.id_usuario, formData);
      alert(`Usuario actualizado: ${response.data.username || "Exitosamente"}`);
      if (onSave) onSave(response.data);
      closeModal();
    } catch (error) {
      alert("Error al actualizar usuario: " + error.message);
      btnSave.textContent = "Guardar Cambios";
      btnSave.disabled = false;
    }
  });

  return overlay;
};

