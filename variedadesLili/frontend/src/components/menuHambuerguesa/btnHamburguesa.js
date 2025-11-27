import "./css/btnHamburguesa.css";

export const btnHamburguesa = () => {
  const button = document.createElement("button");
  // Se mantiene 'hamburgerBtn' por si usas selectores JS para la lógica de apertura
  button.className = "hamburgerBtn hamburger-btn";
  button.setAttribute("aria-label", "Abrir menú principal");
  button.setAttribute("aria-expanded", "false");

  // --- Líneas de la hamburguesa ---
  const createLine = (lineClass) => {
    const line = document.createElement("span");
    // Se mantiene 'line' y 'lineClass' para las animaciones CSS/JS específicas
    line.className = `line ${lineClass} hamburger-line`;
    return line;
  };

  const line1 = createLine("line-1");
  const line2 = createLine("line-2");
  const line3 = createLine("line-3");

  button.append(line1, line2, line3);

  return button;
};
