import { DashboardUsuarios } from "../../components/UsuariosRegistrados/DashboardUsuarios";
import { getAllclientes } from "../../services/Clientes/clientesServices";

export const userRegisterController = async () => {
  const content = document.querySelector(".containerRegister");
  const getAllClients = await getAllclientes();
  console.log(getAllClients);
  

  content.innerHTML = "";

  const UsersRegister = DashboardUsuarios(getAllClients);

  content.append(UsersRegister);

  return content;
};
