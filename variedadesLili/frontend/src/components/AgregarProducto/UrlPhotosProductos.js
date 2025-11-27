import "./css/UrlPhotosProductos.css";

export const UrlPhotosProductos = () => {
  const container = document.createElement("div");
  // Clase extraída: .input-group-wide
  container.className = "input-group-wide";

  const label = document.createElement("label");
  label.textContent = "Foto del producto:";
  // Clase extraída: .input-label
  label.className = "input-label";

  const uploadZone = document.createElement("div");
  // Clase extraída: .upload-zone
  uploadZone.className = "upload-zone";

  const placeholderContent = document.createElement("div");
  // Clase extraída: .upload-placeholder
  placeholderContent.className = "upload-placeholder";

  placeholderContent.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="upload-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
    <span class="text-sm font-semibold">Haz clic para subir imagen</span>
    <span class="text-xs text-slate-400 dark:text-slate-500 mt-1">(jpg, png, webp)</span>
  `;

  const imgPreview = document.createElement("img");
  // Clase extraída: .upload-preview
  imgPreview.className = "upload-preview hidden";
  imgPreview.alt = "Vista previa";

  const inputFile = document.createElement("input");
  inputFile.type = "file";
  inputFile.accept = "image/*";
  inputFile.name = "foto_producto";
  inputFile.className = "hidden";

  uploadZone.addEventListener("click", () => inputFile.click());

  inputFile.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imgPreview.src = e.target.result;
        imgPreview.classList.remove("hidden");
        placeholderContent.classList.add("hidden");
        // Activamos estilos de "archivo cargado" usando la clase CSS
        uploadZone.classList.add("has-file");
      };
      reader.readAsDataURL(file);
    }
  });

  // 🔥 FUNCION RESET
  const reset = () => {
    inputFile.value = "";
    imgPreview.src = "";
    imgPreview.classList.add("hidden");
    placeholderContent.classList.remove("hidden");
    // Removemos estilos de "archivo cargado"
    uploadZone.classList.remove("has-file");
  };

  uploadZone.append(placeholderContent, imgPreview, inputFile);
  container.append(label, uploadZone);

  return { container, reset };
};
