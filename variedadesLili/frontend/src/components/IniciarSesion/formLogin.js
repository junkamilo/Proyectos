import { handleLoginSubmit } from "../../helpers/helpersLogin/handleLoginSubmit";
import { btnEnvio } from "./btnEnvio";
import { createIconPassword } from "./createIconPassword";
import { EnlaceOlvideContrasena } from "./EnlaceOlvideContrasena";
import { formLogo } from "./formLogo";
import { inputUsuario } from "./inputUsuario";

import "./css/formLogin.css";

const formLogin = () => {
  //instanciamos componentes del formulario
  const visualHeader = formLogo();
  //input usuario
  const { userComponent } = inputUsuario();
  //input contraseña
  const { passComponent } = createIconPassword();
  //boton de envio
  const btnSubmit = btnEnvio();
  //enlace olvide contraseña
  const forgotLink = EnlaceOlvideContrasena();

  //contenor principal
  const container = document.createElement("div");
  container.className ="loginContainer";

  //formulario
  const form = document.createElement("form");
  form.className = "flex flex-col gap-5";

  // Ensamblaje del formulario
  form.append(userComponent.group, passComponent.group, btnSubmit, forgotLink);

  //logica sudmit
  form.addEventListener("submit", (e) => {
    //instanciamos la logica del envio de datos del formulario
    handleLoginSubmit(e, userComponent.input, passComponent.input);
  });

  // unimos los componentes finales
  container.append(visualHeader, form);

  return container;
};

export default formLogin;
