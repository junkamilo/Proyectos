import "./css/EstadoProducto.css";

export const EstadoProducto = () => {
  const groupEstado = document.createElement("div");
  // Clase extraída: .input-group
  groupEstado.className = "input-group";

  const labelEstado = document.createElement("label");
  labelEstado.textContent = "Estado:";
  labelEstado.setAttribute("for", "estado_producto");
  // Clase extraída: .input-label
  labelEstado.className = "input-label";

  const selectWrapper = document.createElement("div");
  // Clase extraída: .input-wrapper
  selectWrapper.className = "input-wrapper";

  const selectEstado = document.createElement("select");
  selectEstado.id = "estado_producto";
  selectEstado.name = "estado";
  // Clase extraída: .form-select-arrow
  selectEstado.className = "form-select-arrow";

  ["activo", "inactivo", "agotado"].forEach((estado) => {
    const option = document.createElement("option");
    option.value = estado;
    option.textContent = estado.charAt(0).toUpperCase() + estado.slice(1);
    // Clase extraída: .form-option
    option.className = "form-option";
    selectEstado.append(option);
  });

  const arrowIcon = document.createElement("div");
  // Clase extraída: .select-arrow-icon
  arrowIcon.className = "select-arrow-icon";
  arrowIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
    </svg>`;

  selectWrapper.append(selectEstado, arrowIcon);
  groupEstado.append(labelEstado, selectWrapper);

  return groupEstado;
};
