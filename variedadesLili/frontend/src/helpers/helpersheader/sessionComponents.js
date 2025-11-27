import { ButtonCerraSeccion, ButtonIniciarSeccion } from "../../components/header/buttonsActions";
import logoPerfil from "../../components/header/logoPerfil";
import search from "../../components/header/search";
import { menuHamburguesa } from "../../components/menuHambuerguesa/menuHamburguesa";
import { estaAutenticado } from "../auth";

export const sessionComponents = () => {
  if (estaAutenticado()) {
    const perfil = logoPerfil();
    const buttonHamburguesa = menuHamburguesa();
    const btnCerrar = ButtonCerraSeccion();
    const buscador = search();

    btnCerrar.addEventListener("click", () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      //Avisamos que cerramos sesión
      window.dispatchEvent(new Event("auth-change"));

      window.location.hash = "#Login";
      // Opcional: disparar un evento o callback para re-renderizar el header
    });

    perfil.addEventListener("click", () => {
      window.location.hash = "#ProFileView";
      // Opcional: disparar un evento o callback para re-renderizar el header
    });

    return [ buscador,buttonHamburguesa,perfil, btnCerrar];
  } else {
    const btnIniciar = ButtonIniciarSeccion();
    btnIniciar.addEventListener("click", () => {
      window.location.hash = "#Login";
    });
    return [btnIniciar];
  }
};
