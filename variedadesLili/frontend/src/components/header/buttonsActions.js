import "./css/btns.css";

/* --- Botón Principal (Iniciar Sesión) --- */
export const ButtonIniciarSeccion = () => {
  const button = document.createElement("button");
  button.textContent = "Iniciar Sesión";
  button.className = "btn-session-init";

  return button;
};

/* --- Botón Secundario (Cerrar Sesión) --- */
export const ButtonCerraSeccion = () => {
  const button = document.createElement("button");
  button.textContent = "Cerrar Sesión";
  button.className = "btn-session-close";

  return button;
};
