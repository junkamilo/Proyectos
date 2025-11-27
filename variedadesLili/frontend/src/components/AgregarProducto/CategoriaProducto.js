import "./css/CategoriaProducto.css";

export const CategoriaProducto = () => {
  const groupCategoria = document.createElement("div");
  // Clase extraída: .input-group
  groupCategoria.className = "input-group";

  const labelCategoria = document.createElement("label");
  labelCategoria.textContent = "Categoría:";
  labelCategoria.setAttribute("for", "categoria_producto");
  // Clase extraída: .input-label
  labelCategoria.className = "input-label";

  const inputWrapper = document.createElement("div");
  // Clase extraída: .input-wrapper
  inputWrapper.className = "input-wrapper";

  const tagIcon = document.createElement("div");
  // Clase extraída: .input-icon
  tagIcon.className = "input-icon";
  tagIcon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round"
        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>`;

  const selectCategoria = document.createElement("select");
  selectCategoria.id = "categoria_producto";
  selectCategoria.name = "categoria";
  // Clase extraída: .form-select
  selectCategoria.className = "form-select";

  const opciones = ["alcancia", "materos", "abono", "plantas"];

  opciones.forEach((categoria) => {
    const option = document.createElement("option");
    option.value = categoria;
    option.textContent = categoria.charAt(0).toUpperCase() + categoria.slice(1);
    selectCategoria.append(option);
  });

  inputWrapper.append(tagIcon, selectCategoria);
  groupCategoria.append(labelCategoria, inputWrapper);

  return groupCategoria;
};
