export const UrlPhotosProductos = () => {

  const container = document.createElement("div");
  container.className = "flex flex-col gap-2 md:col-span-2 group";

  // --- Etiqueta (Label) ---
  const label = document.createElement("label");
  label.textContent = "Foto del producto:";
  // Mismo estilo que NameProductos para consistencia
  label.className =
    "text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1 transition-colors group-focus-within:text-purple-600 dark:group-focus-within:text-purple-400";

  // --- Zona de Carga (Input Visual) ---
  const uploadZone = document.createElement("div");
  uploadZone.className =
    "relative w-full h-52 rounded-xl " + // Estructura (más alto h-52)
    "bg-slate-50 dark:bg-slate-900/50 " + // Fondo base
    "border-2 border-dashed border-slate-300 dark:border-slate-600 " + // Borde inicial
    "flex flex-col justify-center items-center " + // Centrado
    "cursor-pointer overflow-hidden " + // Comportamiento
    "transition-all duration-300 ease-in-out " + // Animaciones
    "hover:bg-purple-50 dark:hover:bg-purple-900/20 " + // Hover: Fondo
    "hover:border-purple-500 dark:hover:border-purple-400 " + // Hover: Borde
    "group/zone"; // Sub-grupo para animar el icono interno

  // --- Contenido Placeholder (Icono + Texto) ---
  const placeholderContent = document.createElement("div");
  placeholderContent.className =
    "flex flex-col items-center text-slate-400 dark:text-slate-500 transition-colors duration-300 group-hover/zone:text-purple-600 dark:group-hover/zone:text-purple-400";

  // SVG Cloud Upload
  placeholderContent.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-3 transition-transform duration-300 group-hover/zone:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
    <span class="text-sm font-semibold">Haz clic para subir imagen</span>
    <span class="text-xs text-slate-400 dark:text-slate-500 mt-1">(jpg, png, webp)</span>
  `;

  // --- Imagen de Previsualización ---
  const imgPreview = document.createElement("img");
  imgPreview.className =
    "absolute inset-0 w-full h-full object-contain hidden " +
    "bg-white dark:bg-slate-800 p-2"; // Fondo sólido para que la imagen transparente se vea bien
  imgPreview.alt = "Vista previa";

  // --- Input File (Oculto) ---
  const inputFile = document.createElement("input");
  inputFile.type = "file";
  inputFile.accept = "image/*";
  inputFile.name = "foto_producto";
  inputFile.className = "hidden";

  // --- Eventos (Lógica de UI) ---

  // 1. Transferir clic de la zona al input oculto
  uploadZone.addEventListener("click", () => {
    inputFile.click();
  });

  // 2. Manejar selección de archivo
  inputFile.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imgPreview.src = e.target.result;

        // Mostrar imagen, ocultar placeholder
        imgPreview.classList.remove("hidden");
        placeholderContent.classList.add("hidden");

        // ESTADO DE ÉXITO (Actualizado al tema Purple)
        // Cambiamos el borde a sólido y morado
        uploadZone.classList.remove(
          "border-dashed",
          "border-slate-300",
          "dark:border-slate-600"
        );
        uploadZone.classList.add(
          "border-solid",
          "border-purple-500",
          "bg-white",
          "dark:bg-slate-800"
        );
      };
      reader.readAsDataURL(file);
    }
  });

  // --- Ensamblaje ---
  uploadZone.append(placeholderContent, imgPreview, inputFile);
  container.append(label, uploadZone);

  return container;
};
