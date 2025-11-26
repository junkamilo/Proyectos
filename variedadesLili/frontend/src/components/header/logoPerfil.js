import { IMG_DEFAULT, obtenerNombreMostrar, obtenerUrlAvatar, obtenerUsuarioLogueado } from "../../helpers/helpersheader/userUtils";
import "./css/logoPerfil.css";


const logoPerfil = () => {
  // 1. Obtenemos los datos usando la lógica extraída
  const user = obtenerUsuarioLogueado();
  const avatarSrc = obtenerUrlAvatar(user);
  const nombreMostrar = obtenerNombreMostrar(user);

  // 2. Creación del DOM (Interfaz)
  const container = document.createElement("button");
  container.type = "button";
  container.className = "logoPerfil group profile-btn";

  // --- Imagen ---
  const img = document.createElement("img");
  img.src = avatarSrc;
  img.alt = user ? `Perfil de ${user.nombre}` : "Foto de perfil";
  img.className = "perfilImg profile-img";

  // Manejo de error (Backup visual)
  img.onerror = () => {
    img.onerror = null;
    img.src = IMG_DEFAULT;
  };

  // --- Nombre ---
  const name = document.createElement("span");
  name.textContent = nombreMostrar;
  name.className = "perfilNombre profile-name";

  // 3. Renderizado
  container.append(img, name);
  return container;
};

export default logoPerfil;
