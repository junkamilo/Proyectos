import {
  fixImgUrl,
  formatCurrency,
} from "../../helpers/helpersComprasYPedidos/fixImgUrl";
import { postEstadosPedidoServices } from "../../services/Pedidos/PedidoServices";
import { SendButton } from "./SendButton";


export const OrderCard = (pedido) => {
  const card = document.createElement("div");
  card.className =
    "relative overflow-hidden rounded-2xl p-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-white/50 dark:border-slate-700 shadow-xl shadow-purple-900/5 hover:shadow-purple-900/10 transition-shadow duration-300";

  // --- 1. HEADER ---
  const headerHtml = `
    <div class="p-6 pb-4 flex justify-between items-start border-b border-slate-100 dark:border-slate-700/50">
      <div class="flex items-center gap-4">
        <img src="${fixImgUrl(
          pedido.usuario.avatar
        )}" class="w-12 h-12 rounded-full object-cover border-2 border-purple-100 dark:border-slate-600">
        <div>
          <h4 class="text-base font-bold text-slate-800 dark:text-white leading-tight">${
            pedido.usuario.nombre
          }</h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">${
            pedido.id
          } • ${pedido.fecha}</p>
        </div>
      </div>
      ${getBadgeHtml(pedido.estado)}
    </div>
  `;

  // --- 2. BODY ---
  const productsHtml =
    pedido.productos && pedido.productos.length > 0
      ? pedido.productos
          .map(
            (prod) => `
        <li class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="relative">
              <img src="${fixImgUrl(
                prod.img
              )}" class="w-10 h-10 rounded-lg object-cover border border-slate-200 dark:border-slate-600">
              <span class="absolute -top-2 -right-2 bg-slate-800 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-800">${
                prod.cantidad
              }</span>
            </div>
            <div>
              <p class="text-sm font-semibold text-slate-800 dark:text-slate-200">${
                prod.nombre
              }</p>
              <p class="text-xs text-slate-500">Unidad: ${formatCurrency(
                prod.precio
              )}</p>
            </div>
          </div>
          <span class="text-sm font-bold text-slate-700 dark:text-slate-300">${formatCurrency(
            prod.precio * prod.cantidad
          )}</span>
        </li>
      `
          )
          .join("")
      : '<li class="text-slate-400 text-sm italic">Sin detalles</li>';

  const bodyHtml = `
    <div class="p-6 flex flex-col gap-6">
      <div class="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/30 p-3 rounded-lg">
        <svg class="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
        <span>${pedido.direccion}</span>
      </div>
      <ul class="space-y-3">${productsHtml}</ul>
    </div>
  `;

  // --- 3. FOOTER ---
  const footerHtml = `
    <div class="p-4 bg-slate-50 dark:bg-slate-700/50 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
      <div>
        <span class="text-xs text-slate-500 uppercase font-bold">Total Pedido</span>
        <p class="text-xl font-extrabold text-slate-900 dark:text-white">${formatCurrency(
          pedido.total
        )}</p>
      </div>
      <div class="js-actions flex gap-2"></div> 
    </div>
  `;

  card.innerHTML = headerHtml + bodyHtml + footerHtml;

  // --- 5. LÓGICA DEL BOTÓN (INTEGRADA) ---
  const actionsContainer = card.querySelector(".js-actions");

  if (pedido.estado === "pagado" || pedido.estado === "activo" || pedido.estado === "reclamado") {
    // Pasamos una función ASYNC al callback del botón
    const btnEnviar = SendButton(async (e) => {
      const btn = e.currentTarget; // Referencia al botón para cambiar texto

      // 1. Feedback visual (Deshabilitar y cambiar texto)
      const originalText = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = `<span class="animate-pulse">Enviando...</span>`;
      btn.classList.add("opacity-75", "cursor-not-allowed");

      // 2. Llamar al servicio
      const response = await postEstadosPedidoServices(pedido.id);

      // 3. Manejar respuesta
      if (response.status === "success") {
        alert(`✅ ¡El pedido ${pedido.id} ha sido marcado como ENVIADO!`);
        window.location.reload(); // Recargar para ver el cambio de estado
      } else {
        alert(`❌ Error: ${response.message}`);
        // Revertir estado del botón si falló
        btn.disabled = false;
        btn.innerHTML = originalText;
        btn.classList.remove("opacity-75", "cursor-not-allowed");
      }
    });

    actionsContainer.append(btnEnviar);
  }

  return card;
};

// Helper interno para el Badge
const getBadgeHtml = (estado) => {
  let colorClass = "bg-slate-100 text-slate-600";
  if (estado === "activo" || estado === "pagado")
    colorClass = "bg-amber-100 text-amber-700 border border-amber-200";
  if (estado === "enviado")
    colorClass = "bg-blue-100 text-blue-700 border border-blue-200";
  if (estado === "recibido")
    colorClass = "bg-emerald-100 text-emerald-700 border border-emerald-200";
  if (estado === "cancelado")
    colorClass = "bg-rose-100 text-rose-700 border border-rose-200";

  return `<span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${colorClass}">${estado}</span>`;
};
