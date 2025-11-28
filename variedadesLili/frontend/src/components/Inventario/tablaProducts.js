import { mockDashboardData } from "./DashboardInventario";

export const tablaProducts = () => {
  const tableCard = document.createElement("div");
  tableCard.className =
    "lg:col-span-2 p-6 rounded-2xl " +
    "bg-white/80 dark:bg-slate-800/90 backdrop-blur-xl " +
    "border border-white/50 dark:border-slate-700 " +
    "shadow-xl shadow-purple-900/5";

  const tableHeader = document.createElement("h3");
  tableHeader.textContent = "Inventario Reciente";
  tableHeader.className =
    "text-lg font-bold text-slate-800 dark:text-white mb-6";

  const tableWrapper = document.createElement("div");
  tableWrapper.className = "overflow-x-auto custom-scrollbar"; // Scrollbar custom

  const table = document.createElement("table");
  table.className =
    "w-full text-left text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap";

  // Thead
  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr class="border-b border-slate-200 dark:border-slate-700">
      <th class="pb-3 font-bold uppercase text-xs text-slate-400">Producto</th>
      <th class="pb-3 font-bold uppercase text-xs text-slate-400">Categoría</th>
      <th class="pb-3 font-bold uppercase text-xs text-slate-400 text-right">Stock</th>
      <th class="pb-3 font-bold uppercase text-xs text-slate-400 text-right">Precio</th>
      <th class="pb-3 font-bold uppercase text-xs text-slate-400 text-center">Estado</th>
    </tr>
  `;
  table.append(thead);

  // Tbody
  const tbody = document.createElement("tbody");
  mockDashboardData.recentProducts.forEach((prod) => {
    const tr = document.createElement("tr");
    tr.className =
      "border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors";

    // Status Logic
    let statusClass = "bg-slate-100 text-slate-600";
    let statusText = "Inactivo";
    if (prod.status === "active") {
      statusClass = "bg-emerald-100 text-emerald-700";
      statusText = "Activo";
    }
    if (prod.status === "low") {
      statusClass = "bg-amber-100 text-amber-700";
      statusText = "Bajo";
    }
    if (prod.status === "out") {
      statusClass = "bg-rose-100 text-rose-700";
      statusText = "Agotado";
    }

    tr.innerHTML = `
      <td class="py-3 pr-4">
        <div class="flex items-center gap-3">
          <img src="${
            prod.img
          }" class="w-10 h-10 rounded-lg object-cover bg-slate-200" alt="">
          <span class="font-semibold text-slate-800 dark:text-slate-200">${
            prod.name
          }</span>
        </div>
      </td>
      <td class="py-3">${prod.category}</td>
      <td class="py-3 text-right font-mono">${prod.stock}</td>
      <td class="py-3 text-right font-bold">$${prod.price.toLocaleString()}</td>
      <td class="py-3 text-center">
        <span class="px-2 py-1 rounded-md text-xs font-bold uppercase ${statusClass}">${statusText}</span>
      </td>
    `;
    tbody.append(tr);
  });
  table.append(tbody);
  tableWrapper.append(table);
  tableCard.append(tableHeader, tableWrapper);

  return tableCard;
};
