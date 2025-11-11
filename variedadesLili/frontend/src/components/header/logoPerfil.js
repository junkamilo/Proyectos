const logoPerfil = () => {
  const container = document.createElement("div");
  container.className ="logoPerfil hidden md:flex items-center gap-2 cursor-pointer p-1 rounded-full transition-colors hover:bg-slate-100";

  const img = document.createElement("img");
  img.src = "./assets/perfil.png"; // Ruta de la imagen
  img.alt = "Foto de perfil";
  img.className ="perfilImg w-9 h-9 rounded-full object-cover border-2 border-pink-500";

  const name = document.createElement("span");
  name.textContent = "Usuario";
  name.className ="perfilNombre text-sm font-medium text-slate-700 hidden lg:block";

  container.append(img, name);
  return container;
};

export default logoPerfil;
