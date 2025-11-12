export const Button = () => {
  // --- Botón (Ocupa 2 columnas) ---
  const button = document.createElement("button");
  button.type = "submit";
  button.textContent = "Guardar Producto";
  button.className =
    "w-full bg-pink-600 text-white font-semibold py-3 px-4 rounded-md shadow-md hover:bg-pink-700 hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 md:col-span-2"; // Añadida interacción hover, focus y md:col-span-2

  return button;
};
