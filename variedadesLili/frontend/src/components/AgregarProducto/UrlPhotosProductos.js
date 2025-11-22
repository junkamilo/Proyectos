export const UrlPhotosProductos = () => {
  const container = document.createElement("div");
  container.className = "flex flex-col gap-2 md:col-span-2 group";

  const label = document.createElement("label");
  label.textContent = "Foto del producto:";
  label.className =
    "text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1 transition-colors group-focus-within:text-purple-600 dark:group-focus-within:text-purple-400";

  const uploadZone = document.createElement("div");
  uploadZone.className =
    "relative w-full h-52 rounded-xl bg-slate-50 dark:bg-slate-900/50 " +
    "border-2 border-dashed border-slate-300 dark:border-slate-600 " +
    "flex flex-col justify-center items-center cursor-pointer overflow-hidden " +
    "transition-all duration-300 ease-in-out hover:bg-purple-50 dark:hover:bg-purple-900/20 " +
    "hover:border-purple-500 dark:hover:border-purple-400 group/zone";

  const placeholderContent = document.createElement("div");
  placeholderContent.className =
    "flex flex-col items-center text-slate-400 dark:text-slate-500 transition-colors duration-300 group-hover/zone:text-purple-600 dark:group-hover/zone:text-purple-400";

  placeholderContent.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-3 transition-transform duration-300 group-hover/zone:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
    <span class="text-sm font-semibold">Haz clic para subir imagen</span>
    <span class="text-xs text-slate-400 dark:text-slate-500 mt-1">(jpg, png, webp)</span>
  `;

  const imgPreview = document.createElement("img");
  imgPreview.className =
    "absolute inset-0 w-full h-full object-contain hidden bg-white dark:bg-slate-800 p-2";
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

  // 🔥 FUNCION RESET (IMPORTANTE)
  const reset = () => {
    inputFile.value = "";
    imgPreview.src = "";
    imgPreview.classList.add("hidden");
    placeholderContent.classList.remove("hidden");

    uploadZone.classList.add(
      "border-dashed",
      "border-slate-300",
      "dark:border-slate-600"
    );
    uploadZone.classList.remove(
      "border-solid",
      "border-purple-500",
      "bg-white",
      "dark:bg-slate-800"
    );
  };

  uploadZone.append(placeholderContent, imgPreview, inputFile);
  container.append(label, uploadZone);

  // ⬅️ IMPORTANTE: devuelvo el reset para que el formulario lo pueda usar
  return { container, reset };
};
