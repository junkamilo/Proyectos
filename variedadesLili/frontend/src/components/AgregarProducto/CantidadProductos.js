import "./css/CantidadProductos.css";

export const CantidadProductos = () => {
  const groupCantidad = document.createElement("div");
  // Clase extraída: .input-group
  groupCantidad.className = "input-group";

  const labelCantidad = document.createElement("label");
  labelCantidad.textContent = "Cantidad disponible:";
  labelCantidad.setAttribute("for", "cantidad_producto");
  // Clase extraída: .input-label
  labelCantidad.className = "input-label";

  const inputCantidad = document.createElement("input");
  inputCantidad.type = "number";
  inputCantidad.id = "cantidad_producto";
  inputCantidad.name = "cantidad";
  inputCantidad.min = "0";
  inputCantidad.required = true;
  inputCantidad.placeholder = "Ej: 10";
  // Clase extraída: .form-input
  inputCantidad.className = "form-input";

  groupCantidad.append(labelCantidad, inputCantidad);

  return groupCantidad;
};
