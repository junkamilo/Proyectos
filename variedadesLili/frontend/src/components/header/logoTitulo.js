const logoTitulo = () => {
  const container = document.createElement("div");
  container.className = "logoTituloContainer";

  const title = document.createElement("h1");
  title.textContent = "Variedades Lili";
  title.className ="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-pink-600 to-amber-500 bg-clip-text text-transparent animate-gradient-shift cursor-pointer";

  container.append(title);
  return container;
};

export default logoTitulo;
