import main from "../../components/menuPrincipal/main";

export const menuPrincipalController = () => {
  const mainContent = document.querySelector("main");

  // Limpia si hay algo dentro
  mainContent.innerHTML = "";

  // Crea el formulario y lo inserta
  const menuPrincipal = main();
  mainContent.appendChild(menuPrincipal);
};