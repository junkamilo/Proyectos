import { MostrarUsuarios } from "../../components/MostrarUsuarios/mainUser.js";
import { NavUsuarios } from "../../components/navUser/nav.js";
import { getUsuarios } from "../../services/Users/authService.js";

export const mostrarUserController = async () => {
  const content = document.querySelector(".containerUsers");

  // Traemos los usuarios desde el backend
  let usuarios = [];
  try {
    usuarios = await getUsuarios();
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
  }

  const mainUser = await MostrarUsuarios(usuarios);
  const navarUsuario = NavUsuarios();

  // Pegamos nav + grid
  content.innerHTML = "";
  content.append(navarUsuario.nav, mainUser);

  return content;
};
