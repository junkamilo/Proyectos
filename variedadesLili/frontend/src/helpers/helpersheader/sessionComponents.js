import { ButtonCerraSeccion, ButtonIniciarSeccion } from "../../components/header/buttonsActions";
import logoPerfil from "../../components/header/logoPerfil";
import menuHamburguesa from "../../components/header/menuHamburguesa";
import search from "../../components/header/search";
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
      window.location.hash = "#Login";
      // Opcional: disparar un evento o callback para re-renderizar el header
    });

    return [buttonHamburguesa, buscador,perfil, btnCerrar];
  } else {
    const btnIniciar = ButtonIniciarSeccion();
    btnIniciar.addEventListener("click", () => {
      window.location.hash = "#Login";
    });
    return [btnIniciar];
  }
};
