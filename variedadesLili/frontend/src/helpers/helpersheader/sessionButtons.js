import { ButtonCerraSeccion, ButtonIniciarSeccion } from "../../components/header/buttonsActions";
import { estaAutenticado } from "../auth";

//agregamps logicas a los botones
export const obtenerBotonSesion = () => {
  if (estaAutenticado()) {
    const btnCerrar = ButtonCerraSeccion();
    btnCerrar.addEventListener("click", () => {
      // Limpiar tokens
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      // Redirigir al login
      window.location.hash = "#Login";
    });
    return btnCerrar;
  } else {
    const btnIniciar = ButtonIniciarSeccion();
    btnIniciar.addEventListener("click", () => {
      window.location.hash = "#Login";
    });
    return btnIniciar;
  }
};
