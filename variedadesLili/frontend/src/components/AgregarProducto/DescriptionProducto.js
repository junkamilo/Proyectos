import "./css/DescriptionProducto.css";

export const DescriptionProducto = () => {
  const groupDescripcion = document.createElement("div");
  // Clase extraída: .input-group-wide (incluye col-span-2)
  groupDescripcion.className = "input-group-wide";

  const labelDescripcion = document.createElement("label");
  labelDescripcion.textContent = "Descripción del producto:";
  labelDescripcion.setAttribute("for", "descripcion_producto");
  // Clase extraída: .input-label
  labelDescripcion.className = "input-label";

  const textareaDescripcion = document.createElement("textarea");
  textareaDescripcion.id = "descripcion_producto";
  textareaDescripcion.name = "descripcion";
  textareaDescripcion.rows = "4";
  textareaDescripcion.placeholder =
    "Ej: Alcancía pintada a mano con diseño floral, ideal para regalo...";
  // Clase extraída: .form-textarea
  textareaDescripcion.className = "form-textarea";

  groupDescripcion.append(labelDescripcion, textareaDescripcion);

  return groupDescripcion;
};
