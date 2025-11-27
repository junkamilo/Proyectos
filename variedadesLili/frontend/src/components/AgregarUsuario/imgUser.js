 export const createPhotoGroup = () => {
  const container = document.createElement("div");
  container.className = "w-full space-y-2 group";

  const label = document.createElement("label");
  label.textContent = "Foto de Perfil";
  label.className =
    "block text-xs font-bold tracking-wider text-slate-400 uppercase ml-1 transition-colors group-focus-within:text-purple-400";

  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.className =
    "block w-full text-sm text-slate-400 " +
    "file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 " +
    "file:text-xs file:font-bold file:bg-purple-600 file:text-white " +
    "hover:file:bg-purple-500 file:cursor-pointer cursor-pointer " +
    "file:transition-colors file:duration-200 " +
    "bg-slate-900/50 rounded-xl border border-slate-700"; // Contenedor del input file

  container.append(label, input);
  return { container, input };
};
