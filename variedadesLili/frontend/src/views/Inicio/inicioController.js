import formLogin from "../../components/IniciarSesion/formLogin";

export const inicioController = () => {
  const container = document.getElementById("login-container");

  // Limpia si hay algo dentro
  container.innerHTML = "";

  // Crea el formulario y lo inserta
  const form = formLogin();
  container.appendChild(form);
};
