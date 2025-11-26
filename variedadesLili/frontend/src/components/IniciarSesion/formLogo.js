import "./css/formLogo.css";

export const formLogo = () => {
  const visualHeader = document.createElement("div");
  visualHeader.className = "flex flex-col items-center gap-4 mb-2";

  // Círculo con Gradiente e Icono
  const iconWrapper = document.createElement("div");
  iconWrapper.className = "gradientIcon"

  // Icono SVG (Candado / Seguridad)
  iconWrapper.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  `;

  // Título
  const title = document.createElement("h2");
  title.textContent = "Bienvenido";
  title.className ="title";

  const subtitle = document.createElement("p");
  subtitle.textContent = "Inicia sesión para gestionar tu inventario";
  subtitle.className = "subtitle";

  visualHeader.append(iconWrapper, title, subtitle);

  return visualHeader;
};
