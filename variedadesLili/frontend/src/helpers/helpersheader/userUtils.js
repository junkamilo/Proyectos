const SERVER_URL = "http://localhost:3000";
const DEFAULT_IMG = "/assets/perfil.png";


 //1. Obtiene el usuario del LocalStorage de forma segura
 
export const obtenerUsuarioLogueado = () => {
  try {
    const userStored = localStorage.getItem("usuario");
    if (userStored && userStored !== "undefined") {
      return JSON.parse(userStored);
    }
    return null;
  } catch (error) {
    console.error("Error al leer usuario:", error);
    localStorage.removeItem("usuario");
    return null;
  }
};

/**
 * 2. Genera la URL de la foto de perfil
 * Recibe el objeto usuario y devuelve la URL completa o la default
 */
export const obtenerUrlAvatar = (user) => {
  // Si no hay usuario o no tiene foto, devolvemos default
  if (!user || !user.foto) return DEFAULT_IMG;

  // Si la foto ya es una URL externa (http/https), la devolvemos tal cual
  if (user.foto.startsWith("http")) return user.foto;

  // Si es local, concatenamos el servidor
  return `${SERVER_URL}${user.foto}`;
};

/**
 * 3. Obtiene el nombre corto para mostrar
 */
export const obtenerNombreMostrar = (user) => {
  if (!user || !user.nombre) return "Usuario";
  return user.nombre.split(" ")[0]; // Devuelve el primer nombre
};

/**
 * 4. Exportamos la imagen por defecto por si se necesita en el evento error
 */
export const IMG_DEFAULT = DEFAULT_IMG;
