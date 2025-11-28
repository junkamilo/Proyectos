import { DashboardUsuarios } from "../../components/UsuariosRegistrados/DashboardUsuarios";

export const userRegisterController = () => {
  const content = document.querySelector(".containerRegister");

  content.innerHTML = "";

  const UsersRegister = DashboardUsuarios();

  content.append(UsersRegister);

  return content;
};
