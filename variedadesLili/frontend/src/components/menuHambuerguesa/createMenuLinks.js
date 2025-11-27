import "./css/createMenuLink.css";

export const createMenuLink = (text, href, iconSvg) => {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = href;
  // Clase extraída: .menu-link
  a.className = "menu-link";

  // Icono
  const iconSpan = document.createElement("span");
  // Clase extraída: .menu-link-icon
  iconSpan.className = "menu-link-icon";
  iconSpan.innerHTML = iconSvg;

  // Texto
  const textSpan = document.createElement("span");
  textSpan.textContent = text;

  a.append(iconSpan, textSpan);
  li.append(a);
  return li;
};
