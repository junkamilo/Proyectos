export const MaterialProducto = () => {
  // --- Grupo: Material (Ocupa 1 columna) ---
  const groupMaterial = document.createElement("div");
  groupMaterial.className = "flex flex-col gap-2";
  const labelMaterial = document.createElement("label");
  labelMaterial.textContent = "Material:";
  labelMaterial.className = "text-slate-600 font-medium";
  const inputMaterial = document.createElement("input");
  inputMaterial.type = "text";
  inputMaterial.name = "material";
  inputMaterial.placeholder = "Ej: Cerámica, plástico, madera...";
  inputMaterial.className =
    "w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 focus:border-transparent"; // Añadida transición y focus:border-transparent
  groupMaterial.append(labelMaterial, inputMaterial);

  return groupMaterial;
};
