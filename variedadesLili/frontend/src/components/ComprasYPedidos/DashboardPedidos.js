// --- MOCK DATA (Datos de Ejemplo) ---
const mockPedidos = [
  {
    id: "ORD-7829",
    fecha: "Hace 2 horas",
    estado: "activo", // activo, enviado, recibido, cancelado
    usuario: {
      nombre: "Ana María Polo",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      email: "ana.polo@email.com",
    },
    direccion: "Cra 45 # 12-34, Edificio Mónaco, Apto 502, Bogotá DC.",
    productos: [
      {
        nombre: "Alcancía Cerdito Floral",
        cantidad: 2,
        precio: 30000,
        img: "https://via.placeholder.com/50",
      },
      {
        nombre: "Maceta Geométrica",
        cantidad: 1,
        precio: 22000,
        img: "https://via.placeholder.com/50",
      },
    ],
    total: 82000,
  },
  {
    id: "ORD-7830",
    fecha: "Ayer",
    estado: "enviado",
    guia: "SERVI-9923811",
    usuario: {
      nombre: "Carlos Vives",
      avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
      email: "carlos@vives.com",
    },
    direccion: "Av. Santander # 88, Santa Marta.",
    productos: [
      {
        nombre: "Kit Pintura Cerámica",
        cantidad: 1,
        precio: 45000,
        img: "https://via.placeholder.com/50",
      },
    ],
    total: 45000,
  },
  {
    id: "ORD-7825",
    fecha: "20 Oct 2023",
    estado: "recibido",
    usuario: {
      nombre: "Luisa Fernanda W",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      email: "luisa@influencer.com",
    },
    direccion: "Calle 100 # 15-20, Medellín.",
    productos: [
      {
        nombre: "Matera Colgante",
        cantidad: 3,
        precio: 15000,
        img: "https://via.placeholder.com/50",
      },
      {
        nombre: "Suculenta Artificial",
        cantidad: 3,
        precio: 8000,
        img: "https://via.placeholder.com/50",
      },
    ],
    total: 69000,
  },
  {
    id: "ORD-7801",
    fecha: "15 Oct 2023",
    estado: "cancelado",
    motivo: "Pago rechazado por el banco",
    usuario: {
      nombre: "Pedro Pascal",
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026302d",
      email: "pedro@mando.com",
    },
    direccion: "Transversal 4 # 55-10, Cali.",
    productos: [
      {
        nombre: "Alcancía Personalizada",
        cantidad: 1,
        precio: 50000,
        img: "https://via.placeholder.com/50",
      },
    ],
    total: 50000,
  },
];

export const DashboardPedidos = () => {
  /* NOTAS DE DISEÑO (SPA COHERENCE - "Orders Dashboard"):
     - Tabs: Estilo píldora con el gradiente de marca para el activo.
     - Cards: Glassmorphism con bordes sutiles.
     - Tipografía: Clara jerarquía entre ID (técnico) y Nombre (humano).
  */

  const container = document.createElement("div");
  container.className =
    "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pb-20 animate-fade-in-up flex flex-col gap-8";

  // --- 1. HEADER & FILTROS ---
  const header = document.createElement("div");
  header.className = "flex flex-col gap-6";

  const titleGroup = document.createElement("div");
  const title = document.createElement("h2");
  title.textContent = "Seguimiento de Pedidos";
  title.className =
    "text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent";

  const subtitle = document.createElement("p");
  subtitle.textContent = "Gestiona los envíos y el estado de las compras.";
  subtitle.className = "text-sm text-slate-500 dark:text-slate-400 font-medium";

  titleGroup.append(title, subtitle);

  // --- TABS DE ESTADO ---
  const tabsContainer = document.createElement("div");
  tabsContainer.className =
    "flex flex-wrap gap-2 md:gap-4 p-1.5 bg-white/50 dark:bg-slate-800/50 rounded-2xl w-fit backdrop-blur-md border border-slate-200/50 dark:border-slate-700";

  const estados = [
    { id: "all", label: "Todos" },
    { id: "activo", label: "Pendientes" },
    { id: "enviado", label: "Enviados" },
    { id: "recibido", label: "Entregados" },
    { id: "cancelado", label: "Cancelados" },
  ];

  // Estado local simple para tabs (Clases visuales)
  let activeTab = "all";

  // Función para renderizar el contenido (definida más abajo)
  const renderOrdersList = (filter) => {
    // Lógica visual de cambio de tab
    tabsContainer.innerHTML = ""; // Limpiamos tabs para repintar estado
    estados.forEach((estado) => {
      const btn = document.createElement("button");
      btn.textContent = estado.label;

      // Estilos Dinámicos del Tab
      const isActive = estado.id === filter;
      const baseClass =
        "px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 focus:outline-none ";
      const activeClass =
        "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/30";
      const inactiveClass =
        "text-slate-500 hover:text-purple-600 hover:bg-white/80 dark:hover:bg-slate-700";

      btn.className = baseClass + (isActive ? activeClass : inactiveClass);

      btn.addEventListener("click", () => {
        renderOrdersList(estado.id); // Re-renderizar al click
      });
      tabsContainer.append(btn);
    });

    // Filtrar datos
    const filteredData =
      filter === "all"
        ? mockPedidos
        : mockPedidos.filter((p) => p.estado === filter);

    // Actualizar Grid de Pedidos
    ordersGrid.innerHTML = "";
    if (filteredData.length === 0) {
      ordersGrid.innerHTML = EmptyState();
    } else {
      filteredData.forEach((pedido) => {
        ordersGrid.append(createOrderCard(pedido));
      });
    }
  };

  header.append(titleGroup, tabsContainer);
  container.append(header);

  // --- 2. GRID DE PEDIDOS (Contenedor de Cards) ---
  const ordersGrid = document.createElement("div");
  ordersGrid.className = "grid grid-cols-1 lg:grid-cols-2 gap-6"; // 1 col móvil, 2 col desktop

  // --- HELPER: CREAR TARJETA DE PEDIDO ---
  const createOrderCard = (pedido) => {
    const card = document.createElement("div");
    card.className =
      "relative overflow-hidden rounded-2xl p-0 " +
      "bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl " +
      "border border-white/50 dark:border-slate-700 " +
      "shadow-xl shadow-purple-900/5 hover:shadow-purple-900/10 transition-shadow duration-300";

    // --- Header de la Card (Usuario y Estado) ---
    const cardHeader = document.createElement("div");
    cardHeader.className =
      "p-6 pb-4 flex justify-between items-start border-b border-slate-100 dark:border-slate-700/50";

    // Info Usuario
    const userInfo = document.createElement("div");
    userInfo.className = "flex items-center gap-4";

    const avatar = document.createElement("img");
    avatar.src = pedido.usuario.avatar;
    avatar.className =
      "w-12 h-12 rounded-full object-cover border-2 border-purple-100 dark:border-slate-600";

    const userText = document.createElement("div");
    userText.innerHTML = `
      <h4 class="text-base font-bold text-slate-800 dark:text-white leading-tight">${pedido.usuario.nombre}</h4>
      <p class="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">${pedido.id} • ${pedido.fecha}</p>
    `;
    userInfo.append(avatar, userText);

    // Badge de Estado
    const badge = document.createElement("span");
    badge.textContent =
      pedido.estado.charAt(0).toUpperCase() + pedido.estado.slice(1);

    let badgeClass = "bg-slate-100 text-slate-600";
    if (pedido.estado === "activo")
      badgeClass =
        "bg-amber-100 text-amber-700 border border-amber-200 animate-pulse";
    if (pedido.estado === "enviado")
      badgeClass = "bg-blue-100 text-blue-700 border border-blue-200";
    if (pedido.estado === "recibido")
      badgeClass = "bg-emerald-100 text-emerald-700 border border-emerald-200";
    if (pedido.estado === "cancelado")
      badgeClass = "bg-rose-100 text-rose-700 border border-rose-200";

    badge.className = `px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${badgeClass}`;

    cardHeader.append(userInfo, badge);

    // --- Cuerpo de la Card (Dirección y Productos) ---
    const cardBody = document.createElement("div");
    cardBody.className = "p-6 flex flex-col gap-6";

    // Dirección
    const addressBlock = document.createElement("div");
    addressBlock.className =
      "flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/30 p-3 rounded-lg";
    addressBlock.innerHTML = `
      <svg class="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
      <span>${pedido.direccion}</span>
    `;

    // Lista de Productos
    const productsList = document.createElement("ul");
    productsList.className = "space-y-3";

    pedido.productos.forEach((prod) => {
      const li = document.createElement("li");
      li.className = "flex items-center justify-between";
      li.innerHTML = `
        <div class="flex items-center gap-3">
          <div class="relative">
            <img src="${
              prod.img
            }" class="w-10 h-10 rounded-lg object-cover border border-slate-200 dark:border-slate-600">
            <span class="absolute -top-2 -right-2 bg-slate-800 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-800">${
              prod.cantidad
            }</span>
          </div>
          <div>
            <p class="text-sm font-semibold text-slate-800 dark:text-slate-200">${
              prod.nombre
            }</p>
            <p class="text-xs text-slate-500">Unidad: $${prod.precio.toLocaleString()}</p>
          </div>
        </div>
        <span class="text-sm font-bold text-slate-700 dark:text-slate-300">$${(
          prod.precio * prod.cantidad
        ).toLocaleString()}</span>
      `;
      productsList.append(li);
    });

    cardBody.append(addressBlock, productsList);

    // Info Extra (Guía o Motivo)
    if (pedido.estado === "enviado") {
      const trackingInfo = document.createElement("div");
      trackingInfo.className =
        "mx-6 mb-4 px-3 py-2 bg-blue-50 text-blue-700 text-xs font-mono rounded border border-blue-100 flex justify-between";
      trackingInfo.innerHTML = `<span>Guía:</span> <strong>${pedido.guia}</strong>`;
      card.append(trackingInfo);
    }
    if (pedido.estado === "cancelado") {
      const cancelInfo = document.createElement("div");
      cancelInfo.className =
        "mx-6 mb-4 px-3 py-2 bg-rose-50 text-rose-700 text-xs rounded border border-rose-100";
      cancelInfo.innerHTML = `<strong>Motivo:</strong> ${pedido.motivo}`;
      card.append(cancelInfo);
    }

    // --- Footer (Total y Acciones) ---
    const cardFooter = document.createElement("div");
    cardFooter.className =
      "p-4 bg-slate-50 dark:bg-slate-700/50 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center";

    const totalDisplay = document.createElement("div");
    totalDisplay.innerHTML = `
      <span class="text-xs text-slate-500 uppercase font-bold">Total Pedido</span>
      <p class="text-xl font-extrabold text-slate-900 dark:text-white">$${pedido.total.toLocaleString()}</p>
    `;

    const actionsDiv = document.createElement("div");

    // Botón Principal Dinámico
    const actionBtn = document.createElement("button");
    actionBtn.className =
      "px-4 py-2 rounded-lg text-sm font-bold text-white shadow-md transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-1";

    if (pedido.estado === "activo") {
      actionBtn.textContent = "Marcar Enviado";
      actionBtn.className +=
        " bg-gradient-to-r from-purple-600 to-pink-600 focus:ring-purple-500";
      // Aquí agregarías el addEventListener para cambiar estado
    } else if (pedido.estado === "enviado") {
      actionBtn.textContent = "Ver Guía";
      actionBtn.className +=
        " bg-slate-800 hover:bg-slate-700 focus:ring-slate-500";
    } else {
      actionBtn.style.display = "none"; // Ocultar si ya terminó
    }

    // Botón Detalles (Secundario)
    const detailsBtn = document.createElement("button");
    detailsBtn.innerHTML = `<svg class="w-5 h-5 text-slate-400 hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>`;
    detailsBtn.className =
      "p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 ml-2";

    actionsDiv.append(actionBtn, detailsBtn);
    cardFooter.append(totalDisplay, actionsDiv);

    card.append(cardHeader, cardBody, cardFooter);
    return card;
  };

  // Helper para Estado Vacío
  const EmptyState = () => {
    return `
      <div class="col-span-full flex flex-col items-center justify-center py-16 text-slate-400 opacity-60">
        <svg class="w-16 h-16 mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
        <p class="text-lg font-medium">No hay pedidos en esta sección.</p>
      </div>
    `;
  };

  container.append(ordersGrid);

  // Inicializar vista
  renderOrdersList("all");

  return container;
};
