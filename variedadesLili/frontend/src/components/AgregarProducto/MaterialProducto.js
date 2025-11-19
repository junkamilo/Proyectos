export const MaterialProducto = () => {

  // --- Grupo: Material ---
  const groupMaterial = document.createElement("div");
  groupMaterial.className = "flex flex-col gap-2 group";

  // Label
  const labelMaterial = document.createElement("label");
  labelMaterial.textContent = "Material:";
  labelMaterial.setAttribute("for", "material_producto");
  labelMaterial.className =
    "text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1 transition-colors group-focus-within:text-purple-600 dark:group-focus-within:text-purple-400";

  // Wrapper relativo para el icono
  const inputWrapper = document.createElement("div");
  inputWrapper.className = "relative w-full";

  // Icono de Cubo (Material)
  const cubeIcon = document.createElement("div");
  cubeIcon.className =
    "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-purple-500 pointer-events-none";
  cubeIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>`;

  // Input Text
  const inputMaterial = document.createElement("input");
  inputMaterial.type = "text";
  inputMaterial.id = "material_producto";
  inputMaterial.name = "material";
  inputMaterial.placeholder = "Ej: Cerámica, arcilla, madera...";
  
  inputMaterial.className =
    "w-full rounded-lg border border-slate-300 dark:border-slate-600 " + // Estructura
    "bg-slate-50 dark:bg-slate-900/50 " + // Fondo sutil
    "text-slate-900 dark:text-white " + // Texto
    "pl-10 pr-4 py-2.5 shadow-sm " + // Padding (pl-10 deja espacio al icono)
    "placeholder:text-slate-400 dark:placeholder:text-slate-500 " + // Placeholder
    "transition-all duration-300 ease-in-out " + // Animación
    "focus:bg-white dark:focus:bg-slate-950 " + // Focus: Fondo
    "focus:border-purple-500 " + // Focus: Borde
    "focus:outline-none focus:ring-4 focus:ring-purple-500/20"; // Focus: Glow

  // Ensamblado
  inputWrapper.append(cubeIcon, inputMaterial);
  groupMaterial.append(labelMaterial, inputWrapper);

  return groupMaterial;
};
