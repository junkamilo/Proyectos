// src/components/Dashboard/SendButton.js

export const SendButton = (onClick) => {
  const btn = document.createElement("button");
  
  // Estilos Tailwind: Gradiente, sombras, hover effects
  btn.className = `
    group flex items-center gap-2 
    px-4 py-2 
    bg-gradient-to-r from-purple-600 to-pink-600 
    text-white text-sm font-bold 
    rounded-xl shadow-md shadow-purple-500/20 
    transition-all duration-300 
    hover:shadow-purple-500/40 hover:-translate-y-0.5 active:scale-95
  `;

  // Icono de Avión de papel (SVG) + Texto
  btn.innerHTML = `
    <span>Enviar</span>
    <svg class="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
    </svg>
  `;

  // Asignar el evento click
  btn.addEventListener("click", (e) => {
    e.stopPropagation(); // Evita que el click se propague a la tarjeta si quisieras hacerla clickeable
    onClick(e);
  });

  return btn;
};