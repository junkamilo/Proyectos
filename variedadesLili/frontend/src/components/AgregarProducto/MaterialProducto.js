import "./css/MaterialProducto.css";

export const MaterialProducto = () => {
  const groupMaterial = document.createElement("div");
  // Clase extraída: .input-group
  groupMaterial.className = "input-group";

  const labelMaterial = document.createElement("label");
  labelMaterial.textContent = "Material:";
  labelMaterial.setAttribute("for", "material_producto");
  // Clase extraída: .input-label
  labelMaterial.className = "input-label";

  const inputWrapper = document.createElement("div");
  // Clase extraída: .input-wrapper
  inputWrapper.className = "input-wrapper";

  const cubeIcon = document.createElement("div");
  // Clase extraída: .input-icon
  cubeIcon.className = "input-icon";
  cubeIcon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
      fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round"
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>`;

  const selectMaterial = document.createElement("select");
  selectMaterial.id = "material_producto";
  selectMaterial.name = "material";
  // Clase extraída: .form-select
  selectMaterial.className = "form-select";

  const materiales = [
    "cerámica",
    "plástico",
    "madera",
    "metal",
    "tierra",
    "natural",
  ];

  materiales.forEach((material) => {
    const option = document.createElement("option");
    option.value = material;
    option.textContent = material.charAt(0).toUpperCase() + material.slice(1);
    selectMaterial.append(option);
  });

  inputWrapper.append(cubeIcon, selectMaterial);
  groupMaterial.append(labelMaterial, inputWrapper);

  return groupMaterial;
};
