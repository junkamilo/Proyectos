const contentName = () => {
  const contentName = document.createElement("div");
  const TituloName = document.createElement("h1");

  // Contenedor centrado con más margen vertical (my-12)
  contentName.className = "flex justify-center items-center my-12";

  TituloName.textContent = "Variedades Lili";

  // --- Clases del Título de Marca ---
  // Tamaño responsivo: text-4xl (móvil) md:text-5xl (escritorio)
  // Peso: font-extrabold
  // Efecto Degradado:
  // 1. bg-gradient-to-r...: Define el fondo como un degradado.
  // 2. bg-clip-text: Recorta el fondo a la forma del texto.
  // 3. text-transparent: Hace que el texto en sí sea transparente, mostrando el fondo.
  // 4. animate-gradient-shift: Aplica la animación de CSS para mover el degradado.
  TituloName.className =
    "text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-600 to-amber-500 bg-clip-text text-transparent animate-gradient-shift";

  contentName.append(TituloName);
  return contentName;
};

export default contentName;
