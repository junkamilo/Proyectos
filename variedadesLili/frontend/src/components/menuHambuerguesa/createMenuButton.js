import "./css/createMenuButton.css";

export const createMenuButton = (text, href, iconSvg) => {
  const li = document.createElement("li");
  const btn = document.createElement("button");
  btn.type = "button";
  // Clase extraída: .menu-btn-destructive
  btn.className = "menu-btn-destructive";
  btn.addEventListener("click", () => {
    // Limpiar tokens
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    // Redirigir al login
    window.location.hash = "#Login";
  });

  // Icono
  const iconSpan = document.createElement("span");
  // Clase extraída: .menu-btn-icon
  iconSpan.className = "menu-btn-icon";
  iconSpan.innerHTML = iconSvg;

  // Texto
  const textSpan = document.createElement("span");
  textSpan.textContent = text;

  btn.append(iconSpan, textSpan);
  li.append(btn);
  return li;
};
