import "./css/TamanoProducto.css";

export const TamanoProducto = () => {
  const groupTamano = document.createElement("div");
  // Clase extraída: .input-group
  groupTamano.className = "input-group";

  const labelTamano = document.createElement("label");
  labelTamano.textContent = "Tamaño:";
  labelTamano.setAttribute("for", "tamano_producto");
  // Clase extraída: .input-label
  labelTamano.className = "input-label";

  const selectWrapper = document.createElement("div");
  // Clase extraída: .input-wrapper
  selectWrapper.className = "input-wrapper";

  const selectTamano = document.createElement("select");
  selectTamano.id = "tamano_producto";
  selectTamano.name = "tamano";
  // Clase extraída: .form-select-arrow
  selectTamano.className = "form-select-arrow";

  ["pequeño", "mediano", "grande"].forEach((t) => {
    const option = document.createElement("option");
    option.value = t;
    option.textContent = t.charAt(0).toUpperCase() + t.slice(1);
    // Clase extraída: .form-option
    option.className = "form-option";
    selectTamano.append(option);
  });

  const arrowIcon = document.createElement("div");
  // Clase extraída: .select-arrow-icon
  arrowIcon.className = "select-arrow-icon";
  arrowIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
    </svg>`;

  selectWrapper.append(selectTamano, arrowIcon);
  groupTamano.append(labelTamano, selectWrapper);

  return groupTamano;
};
