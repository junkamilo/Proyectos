export const Footer = () => {
  // --- Footer (Contenedor principal) ---
  const footer = document.createElement("footer");
  footer.className =
    "w-full bg-slate-900 text-slate-200 dark:bg-slate-950 mt-24 lg:mt-32 border-t border-slate-700 dark:border-slate-800";

  // --- Contenedor interno ---
  const container = document.createElement("div");
  container.className = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24";

  // --- Grid principal del Footer ---
  const mainGrid = document.createElement("div");
  mainGrid.className =
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8";

  // --- Columna 1: Marca y Redes (Ocupa 2 columnas en LG) ---
  const brandSection = document.createElement("div");
  brandSection.className = "md:col-span-2";

  // Texto principal (Marca)
  const brand = document.createElement("h3");
  brand.textContent = "Cerámicas JP";
  brand.className =
    "text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent animate-gradient-shift"; // Cohesión SPA

  // Descripción
  const description = document.createElement("p");
  description.textContent =
    "Organizando y distribuyendo los mejores acabados para tu proyecto. Calidad y estructura en nuestro inventario.";
  description.className = "mt-4 text-sm text-slate-400 max-w-xs";

  // Contenedor de Redes Sociales
  const socialContainer = document.createElement("div");
  socialContainer.className = "mt-6 flex gap-5";

  const socialLinks = [
    {
      label: "Twitter",
      icon: "<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='currentColor'><path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.25 2.25h6.58l4.613 6.068L18.244 2.25zM17.1 19.35h1.9l-8.4-11.07H8.4l8.7 11.07z'/></svg>",
    },
    {
      label: "Instagram",
      icon: "<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='currentColor'><path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.148 3.227-1.667 4.773-4.919 4.919-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.07-1.646-.07-4.85s.012-3.584.07-4.85c.148-3.227 1.667-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zM12 0C8.74 0 8.333.015 7.053.072 2.695.272.273 2.69.073 7.053.015 8.333 0 8.74 0 12s.015 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.985 8.74 24 12 24s3.667-.015 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98C23.985 15.667 24 15.26 24 12s-.015-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98C15.667.015 15.26 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.805a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z'/></svg>",
    },
    {
      label: "Facebook",
      icon: "<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='currentColor'><path d='M9.198 21.5h4v-8.01h2.669l.399-2.64h-3.068v-1.7c0-.76.21-1.28 1.31-1.28h1.68V6.04c-.29-.04-1.28-.12-2.44-.12-2.42 0-4.09 1.43-4.09 4.02v1.93H6.6v2.64h2.6v8.01z'/></svg>",
    },
  ];

  socialLinks.forEach((item) => {
    const a = document.createElement("a");
    a.href = "#"; // Placeholder
    a.className =
      "text-slate-500 transition-colors duration-300 hover:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 dark:focus:ring-offset-slate-950 rounded-sm";
    a.innerHTML = item.icon;
    a.setAttribute("aria-label", `Síguenos en ${item.label}`);
    socialContainer.append(a);
  });

  brandSection.append(brand, description, socialContainer);
  mainGrid.append(brandSection);

  // --- Columnas de Enlaces (Inventario) ---
  const linkColumns = [
    {
      title: "Navegación",
      links: [
        { name: "Inicio", url: "#/inicio" },
        { name: "Productos", url: "#/productos" },
        { name: "Inventario", url: "#/inventario" },
        { name: "Contacto", url: "#/contacto" },
      ],
    },
    {
      title: "Categorías",
      links: [
        { name: "Pisos y Porcelanatos", url: "#/productos/pisos" },
        { name: "Muros y Paredes", url: "#/productos/muros" },
        { name: "Decorativos", url: "#/productos/decorativos" },
        { name: "Adhesivos y Pegantes", url: "#/productos/adhesivos" },
      ],
    },
    {
      title: "Ayuda",
      links: [
        { name: "Preguntas Frecuentes", url: "#/ayuda/faq" },
        { name: "Política de Envíos", url: "#/ayuda/envios" },
        { name: "Devoluciones", url: "#/ayuda/devoluciones" },
        { name: "Mi Cuenta", url: "#/cuenta" },
      ],
    },
  ];

  // Generar las 3 columnas de enlaces
  linkColumns.forEach((col) => {
    const colDiv = document.createElement("div");

    const title = document.createElement("h4");
    title.textContent = col.title;
    title.className =
      "text-sm font-semibold uppercase tracking-wider text-slate-100 dark:text-white";
    colDiv.append(title);

    const ul = document.createElement("ul");
    ul.className = "mt-4 space-y-3";

    col.links.forEach((item) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = item.url;
      a.textContent = item.name;
      a.className =
        "text-sm text-slate-400 transition-colors duration-300 ease-in-out hover:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 dark:focus:ring-offset-slate-950 rounded-sm";
      li.append(a);
      ul.append(li);
    });

    colDiv.append(ul);
    mainGrid.append(colDiv);
  });

  // --- Sección de Copyright (Debajo del grid) ---
  const copyrightSection = document.createElement("div");
  copyrightSection.className =
    "mt-12 lg:mt-16 pt-8 border-t border-slate-700 dark:border-slate-800";

  const copy = document.createElement("p");
  copy.textContent = `© ${new Date().getFullYear()} Cerámicas JP — Todos los derechos reservados.`;
  copy.className = "text-center text-xs text-slate-500";

  copyrightSection.append(copy);

  // Ensamblado final
  container.append(mainGrid, copyrightSection);
  footer.append(container);

  return footer;
};
