import "./css/PrecioProducto.css";

export const PrecioProducto = () => {
  const groupPrecio = document.createElement("div");
  // Clase extraída: .input-group
  groupPrecio.className = "input-group";

  const labelPrecio = document.createElement("label");
  labelPrecio.textContent = "Precio:";
  labelPrecio.setAttribute("for", "precio_producto");
  // Clase extraída: .input-label
  labelPrecio.className = "input-label";

  const inputWrapper = document.createElement("div");
  // Clase extraída: .input-wrapper
  inputWrapper.className = "input-wrapper";

  const currencySymbol = document.createElement("span");
  currencySymbol.textContent = "$";
  // Clase extraída: .currency-symbol
  currencySymbol.className = "currency-symbol";

  const inputPrecio = document.createElement("input");
  inputPrecio.type = "number";
  inputPrecio.id = "precio_producto";
  inputPrecio.name = "precio";
  inputPrecio.min = "0";
  inputPrecio.step = "0.01";
  inputPrecio.placeholder = "15000";
  inputPrecio.required = true;
  // Clase extraída: .form-input-currency
  inputPrecio.className = "form-input-currency";

  inputWrapper.append(currencySymbol, inputPrecio);
  groupPrecio.append(labelPrecio, inputWrapper);

  return groupPrecio;
};
