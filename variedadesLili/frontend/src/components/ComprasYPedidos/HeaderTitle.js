export const HeaderTitle = () => {
  const titleGrupo = document.createElement("div");
  const title = document.createElement("h2");
  title.textContent = "Seguimiento de Pedidos";
  title.className =
    "text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent";

  const subtitle = document.createElement("p");
  subtitle.textContent = "Gestiona los envíos y el estado de las compras.";
  subtitle.className = "text-sm text-slate-500 dark:text-slate-400 font-medium";

  titleGrupo.append(title, subtitle);

  return titleGrupo
};

