const logoTitulo = () => {
  const container = document.createElement("div");
  // El layout se controla en el 'header' padre
  container.className = "logoTituloContainer";

  const title = document.createElement("h1");
  title.textContent = "Variedades Lili";

  // --- Clases de Tailwind Aplicadas ---
  // Tamaño responsivo: text-2xl (móvil) sm:text-3xl (escritorio)
  // Peso: font-extrabold
  // Efecto Degradado (igual que el login): rosa a ámbar
  // Animación: 'animate-gradient-shift' (definida en el CSS anterior)
  title.className =
    "text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-pink-600 to-amber-500 bg-clip-text text-transparent animate-gradient-shift cursor-pointer";

  container.append(title);
  return container;
};

export default logoTitulo;
