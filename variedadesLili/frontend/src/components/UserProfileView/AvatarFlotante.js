import API_URL from "../../utils/api";

export const AvatarFlotante = (usuario) => {

  
  const getAvatarUrl = (u) => {
    // Si no hay foto, usar avatar generado por nombre
    if (!u.url_foto_perfil) {
      return `https://ui-avatars.com/api/?name=${u.nombre}&background=0f172a&color=fff&size=256`;
    }

    // Limpiar posibles barras invertidas de Windows (\)
    const cleanPath = u.url_foto_perfil.replace(/\\/g, "/");

    // Si ya es una URL absoluta (ej: cloudinary, google, etc)
    if (cleanPath.startsWith("http")) {
      return cleanPath;
    }

    // Si es una ruta local, pegarle el dominio del servidor
    // Aseguramos que no haya doble barra //
    const path = cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;
    return `${API_URL}${path}`;
  };
  // --- Header Container ---
  const headerSection = document.createElement("header");
  headerSection.className = "relative mb-20 sm:mb-24 animate-fade-in";

  // --- Fondo Gradiente (Cover) ---
  const cover = document.createElement("div");
  cover.className =
    "h-48 sm:h-64 w-full rounded-b-3xl " +
    "bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 " +
    "relative overflow-hidden border-b border-slate-700/50";

  // Patrón decorativo (Opcional)
  const pattern = document.createElement("div");
  pattern.className =
    "absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]";
  cover.append(pattern);

  // --- Wrapper del Avatar ---
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className =
    "absolute left-1/2 -translate-x-1/2 -bottom-16 sm:-bottom-20 " +
    "group cursor-pointer z-10";

  // --- Imagen del Avatar ---
  const avatarImg = document.createElement("img");

  //APLICACIÓN DE LA LÓGICA AQUÍ
  avatarImg.src = getAvatarUrl(usuario);
  avatarImg.alt = usuario.nombre;

  avatarImg.className =
    "w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover " +
    "border-[6px] border-slate-900 " + // El borde simula el "recorte"
    "shadow-2xl shadow-purple-500/30 " +
    "transition-transform duration-500 group-hover:scale-105 group-hover:shadow-purple-500/50";

  // MANEJO DE ERROR (Fallback visual)
  // Si la imagen falla (404), carga el avatar por defecto
  avatarImg.onerror = () => {
    console.warn("No se pudo cargar la imagen:", avatarImg.src);
    avatarImg.src = `https://ui-avatars.com/api/?name=${usuario.nombre}&background=0f172a&color=fff`;
  };

  // --- Botón Flotante (Cámara) ---
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

  // Input file oculto (Hook para subir imagen luego)
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.className = "hidden";

  // Evento click en todo el wrapper abre el input
  avatarWrapper.onclick = () => fileInput.click();

  // Ensamblaje
  avatarWrapper.append(avatarImg, changePhotoBtn, fileInput);
  headerSection.append(cover, avatarWrapper);

  return headerSection;
};
