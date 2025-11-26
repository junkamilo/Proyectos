import "./css/logoTitulo.css";

const logoTitulo = () => {
  const container = document.createElement("a");
  container.href = "#/";
  container.setAttribute("aria-label", "Variedades Lili - Ir a Inicio");
  // 'group' necesario para efectos hover en hijos
  container.className = "logoTituloContainer group logo-link";

  const logoIcon = document.createElement("div");
  logoIcon.className = "flex-shrink-0";
  logoIcon.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path 
        d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" 
        class="logo-icon-path" 
        stroke-width="1"
      />
    </svg>`;

  const title = document.createElement("h1");
  title.textContent = "Variedades Lili";
  title.className = "logo-text";

  container.append(logoIcon, title);
  return container;
};

export default logoTitulo;
