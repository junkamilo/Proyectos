import { MostrarUsuarios } from "../../components/MostrarUsuarios/mainUser.js";
import { NavUsuarios } from "../../components/navUser/nav.js";

const usuarioEjemplo = [
  {
    id_usuario: 1,
    nombre: "Juan Pérez",
    username: "juanp",
    email: "juanp@mail.com",
    rol: "superadmin",
    url_foto_perfil: "" // Si quieres un avatar personalizado pon la URL, sino queda el random
  },
  {
    id_usuario: 2,
    nombre: "Ana Gómez",
    username: "ana_g",
    email: "ana@mail.com",
    rol: "admin",
    url_foto_perfil: ""
  },
  {
    id_usuario: 3,
    nombre: "Carlos Ruiz",
    username: "carlitos",
    email: "carlos@mail.com",
    rol: "usuario",
    url_foto_perfil: ""
  }
];

export const mostrarUserController = async () => {
  const content = document.querySelector(".containerUsers");
  const mainUser = await MostrarUsuarios(usuarioEjemplo);
  const navarUsuario = NavUsuarios();
  
  content.append(navarUsuario.nav,mainUser);

  return content;
};
