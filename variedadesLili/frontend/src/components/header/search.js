import "./css/search.css";

const search = () => {
  const container = document.createElement("div");
  // Se mantiene 'searchContainer' por si usas selectores JS específicos
  container.className = "searchContainer search-container";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Buscar alcancías...";
  input.className = "search-input";

  const button = document.createElement("button");
  button.type = "button";
  button.className = "search-btn";
  button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>`;
  button.setAttribute("aria-label", "Buscar");

  container.append(input, button);
  return container;
};

export default search;
