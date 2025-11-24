import { FormularioUsuarios } from "../../components/AgregarUsuario/formularioUser";
import { NavUsuarios } from "../../components/navUser/nav";
import { USersForm } from "../../helpers/helpersUsers/USersForm";

export const AgregarUserController = () => {
  const content = document.querySelector(".containerUser");

  // Componentes UI
  const navarUsuario = NavUsuarios();
  const Formuser = FormularioUsuarios();

  content.append(navarUsuario.nav, Formuser.container);

  /**
    * FormularioUsuarios() solo construye la UI y devuelve form y groups.
      USersForm().addForm() se encarga del submit y envío de datos al backend.
    */

  // Conectamos la lógica de submit
  const { addForm } = USersForm();
  addForm(Formuser.form, Formuser.groups);

  return content;
};
