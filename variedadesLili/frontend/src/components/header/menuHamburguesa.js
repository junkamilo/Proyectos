const menuHamburguesa = () => {
  const container = document.createElement("div");
  container.className = "relative md:hidden";

  // Botón hamburguesa
  const button = document.createElement("button");
  button.className ="hamburgerBtn flex flex-col justify-center items-center gap-1.5 p-2 rounded-md transition-colors hover:bg-slate-100";

  // Líneas de la hamburguesa
  const createLine = (lineClass) => {
    const line = document.createElement("span");
    line.className = `line ${lineClass} block w-6 h-0.5 bg-slate-900 rounded-full transition-all duration-300 ease-in-out`;
    return line;
  };

  const line1 = createLine("line-1");
  const line2 = createLine("line-2");
  const line3 = createLine("line-3");

  button.append(line1, line2, line3);

  // Contenedor del menú
  const menu = document.createElement("div");
  menu.className = "hamburgerMenu";

  const ul = document.createElement("ul");
  ul.className = "flex flex-col p-2"; // Padding interno del menú

  // Helper para crear <li>
  const createMenuItem = (text) => {
    const li = document.createElement("li");
    li.textContent = text;
    li.className ="block w-full px-4 py-2 text-left text-slate-700 rounded-md hover:bg-pink-50 hover:text-pink-600 transition-colors cursor-pointer";
    return li;
  };

  const li1 = createMenuItem("Inicio");
  const li2 = createMenuItem("Perfil");
  const li3 = createMenuItem("Cerrar Sesión");

  ul.append(li1, li2, li3);
  menu.append(ul);

  // Evento para abrir/cerrar menú
  button.addEventListener("click", () => {
    menu.classList.toggle("menuActivo");
    button.classList.toggle("menuActivo");
  });

  container.append(button, menu);
  return container;
};

export default menuHamburguesa;
