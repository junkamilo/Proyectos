import { FormularioUsuarios } from "../../components/AgregarUsuario/formularioUser";
import { NavUsuarios } from "../../components/navUser/nav";

export const AgregarUserController = () => {
  const content = document.querySelector(".containerUser");
  const navarUsuario = NavUsuarios();
  const Formuser = FormularioUsuarios();

  content.append( navarUsuario.nav,Formuser.container);

  return content;
};
