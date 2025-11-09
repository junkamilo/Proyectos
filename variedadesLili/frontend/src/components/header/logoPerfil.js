const logoPerfil = () => {
  const container = document.createElement("div");

  // --- Clases de Tailwind Aplicadas (Container) ---
  // IMPORTANTE: 'hidden md:flex' lo oculta en móvil y lo muestra como flex en escritorio
  // Interacción: 'hover:bg-slate-100' para un feedback sutil
  container.className =
    "logoPerfil hidden md:flex items-center gap-2 cursor-pointer p-1 rounded-full transition-colors hover:bg-slate-100";

  const img = document.createElement("img");
  img.src = "./assets/perfil.png"; // Ruta de la imagen
  img.alt = "Foto de perfil";

  // --- Clases de Tailwind Aplicadas (Imagen) ---
  // Estilo: Círculo, borde de 2px color primario (rosa)
  img.className =
    "perfilImg w-9 h-9 rounded-full object-cover border-2 border-pink-500";

  const name = document.createElement("span");
  name.textContent = "Usuario"; // Dinámico en el futuro

  // --- Clases de Tailwind Aplicadas (Nombre) ---
  // Estilo: Texto sutil
  // Responsivo: 'hidden lg:block' (oculto en tablet, visible en laptop/desktop)
  name.className =
    "perfilNombre text-sm font-medium text-slate-700 hidden lg:block";

  container.append(img, name);
  return container;
};

export default logoPerfil;
