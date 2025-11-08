const logoLogin = () => {
  const container = document.createElement("div");
  // El espaciado (margen) será controlado por el componente padre (formLogin)
  container.className = "flex justify-center";

  const img = document.createElement("img");
  img.src = "./assets/logo-login.png"; // Asumimos que esta ruta es correcta
  img.alt = "Logo de Variedades Lili";

  // --- Clases de Tailwind Aplicadas ---
  // w-24 h-24: Tamaño
  // object-contain: Mantiene la proporción
  // rounded-full: Círculo perfecto
  // border-4 border-amber-300: Borde de color acento
  // shadow-lg: Sombra para profundidad
  // animate-pulse-slow: Animación personalizada de 'latido'
  img.className =
    "w-24 h-24 object-contain rounded-full border-4 border-amber-300 shadow-lg animate-pulse-slow";

  container.append(img);
  return container;
};

export default logoLogin;
