export const imgGroups = (product) => {
    const imgGroup = document.createElement("div");
  imgGroup.className = "group flex flex-col gap-3";

  const imgWrapper = document.createElement("div");
  imgWrapper.className =
    "relative overflow-hidden rounded-xl border border-slate-700/50 shadow-lg";

  const imgPreview = document.createElement("img");
  imgPreview.src = product.imagen || "https://via.placeholder.com/300x200?text=No+Img";
  imgPreview.className =
    "w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105";

  // Overlay decorativo
  const overlay = document.createElement("div");
  overlay.className =
    "absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none";

  imgWrapper.append(imgPreview, overlay);

  const labelImg = document.createElement("label");
  labelImg.textContent = "Actualizar Imagen";
  labelImg.className =
    "text-xs font-bold tracking-wider text-slate-400 uppercase ml-1";

  const inputImg = document.createElement("input");
  inputImg.type = "file";
  inputImg.accept = "image/*";
  inputImg.className =
    "block w-full text-sm text-slate-400 " +
    "file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 " +
    "file:text-xs file:font-semibold file:bg-indigo-600 file:text-white " +
    "hover:file:bg-indigo-500 file:cursor-pointer cursor-pointer " +
    "file:transition-colors file:duration-200";

  inputImg.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) imgPreview.src = URL.createObjectURL(file);
  });

  imgGroup.append(imgWrapper, labelImg, inputImg);

  return { 
    div: imgGroup, 
    input: inputImg 
  };
}
