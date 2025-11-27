import "./css/btn.css";

export const btnEnvio = () => {
  // --- Botón de Envío ---
  const btnSubmit = document.createElement("button");
  btnSubmit.type = "submit";
  btnSubmit.textContent = "Iniciar Sesión";
  btnSubmit.className ="btnSubmit";

  return btnSubmit;
};
