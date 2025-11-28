import { mockDashboardData } from "./DashboardInventario";

export const cardsBarraPorcentage = () => {
    const catsCard = document.createElement("div");
  catsCard.className =
    "p-6 rounded-2xl " +
    "bg-white/80 dark:bg-slate-800/90 backdrop-blur-xl " +
    "border border-white/50 dark:border-slate-700 " +
    "shadow-xl shadow-purple-900/5 flex flex-col gap-6";

  const catsHeader = document.createElement("h3");
  catsHeader.textContent = "Top Categorías";
  catsHeader.className = "text-lg font-bold text-slate-800 dark:text-white";

  const catsList = document.createElement("div");
  catsList.className = "flex flex-col gap-5";

  mockDashboardData.topCategories.forEach((cat) => {
    const item = document.createElement("div");

    const info = document.createElement("div");
    info.className =
      "flex justify-between text-sm font-medium mb-2 text-slate-700 dark:text-slate-300";
    info.innerHTML = `<span>${cat.name}</span><span>${cat.percent}%</span>`;

    const barBg = document.createElement("div");
    barBg.className =
      "w-full h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden";

    const barFill = document.createElement("div");
    barFill.className = `h-full rounded-full ${cat.color} transition-all duration-1000 ease-out`;
    barFill.style.width = "0%";

    // Animación simple al montar
    setTimeout(() => {
      barFill.style.width = `${cat.percent}%`;
    }, 300);

    barBg.append(barFill);
    item.append(info, barBg);
    catsList.append(item);
  });

  catsCard.append(catsHeader, catsList);

  return catsCard;
}
