export const UrlPhotosProductos = () => {
  const container = document.createElement("div");
  container.className = "flex flex-col gap-2 md:col-span-2";

  // --- Etiqueta (Label) ---
  const label = document.createElement("label");
  label.textContent = "Foto del producto:";
  label.className = "text-slate-600 font-medium";

  // --- Zona de Carga (Input Visual) ---
  const uploadZone = document.createElement("div");
  uploadZone.className =
    "relative w-full h-48 bg-slate-50 border-2 border-dashed border-slate-300 rounded-md flex flex-col justify-center items-center cursor-pointer overflow-hidden transition-all duration-300 hover:bg-slate-100 hover:border-pink-500 group";

  // --- Contenido Placeholder (Icono + Texto) ---
  const placeholderContent = document.createElement("div");
  placeholderContent.className =
    "flex flex-col items-center text-slate-400 group-hover:text-pink-500 transition-colors";
  placeholderContent.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
    <span class="text-sm font-medium">Click para subir imagen</span>
    <span class="text-xs text-slate-400 mt-1">(jpg, png, webp)</span>
  `;

  // --- Imagen de Previsualización ---
  const imgPreview = document.createElement("img");
  // 'object-contain' asegura que se vea toda la imagen sin recortar
  imgPreview.className =
    "absolute inset-0 w-full h-full object-contain hidden bg-white p-2";
  imgPreview.alt = "Vista previa";

  // --- Input File (Oculto) ---
  // Este es el input real que manejará el archivo
  const inputFile = document.createElement("input");
  inputFile.type = "file";
  inputFile.accept = "image/*";
  inputFile.name = "foto_producto"; // Importante para el formulario padre
  inputFile.className = "hidden";

  // --- Eventos ---

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
        imgPreview.classList.remove("hidden");
        placeholderContent.classList.add("hidden");

        // Cambiamos el borde a sólido y rosa para indicar éxito
        uploadZone.classList.remove("border-dashed", "border-slate-300");
        uploadZone.classList.add("border-solid", "border-pink-500");
      };
      reader.readAsDataURL(file);
    }
  });

  // --- Ensamblaje ---
  uploadZone.append(placeholderContent, imgPreview, inputFile);
  container.append(label, uploadZone);

  return container;
};
