import "./css/NameProductos.css";

export const NameProductos = () => {
  const groupNombre = document.createElement("div");
  // Clase extraída: .input-group-wide (incluye col-span-2)
  groupNombre.className = "input-group-wide";

  const labelNombre = document.createElement("label");
  labelNombre.textContent = "Nombre del producto:";
  labelNombre.setAttribute("for", "nombre_producto");
  // Clase extraída: .input-label
  labelNombre.className = "input-label";

  const inputNombre = document.createElement("input");
  inputNombre.type = "text";
  inputNombre.id = "nombre_producto";
  inputNombre.name = "nombre_producto";
  inputNombre.placeholder = "Ej: Alcancía de cerámica edición especial";
  inputNombre.required = true;
  // Clase extraída: .form-input
  inputNombre.className = "form-input";

  groupNombre.append(labelNombre, inputNombre);

  return groupNombre;
};
