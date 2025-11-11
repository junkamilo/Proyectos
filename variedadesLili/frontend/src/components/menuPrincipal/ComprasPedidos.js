const ComprasPedidos = () => {
  const card = document.createElement("div");
  // --- Clases de Tailwind Aplicadas (Card) ---
  // Estructura: 'flex flex-col' para alinear contenido, 'h-full' para que todas tengan la misma altura en la grid
  // Estilo: 'bg-white', 'rounded-xl', 'shadow-lg', 'border', 'p-6'
  // Interacción: 'transition-all', 'hover:shadow-xl', 'hover:-translate-y-1' (efecto de levantar)
  card.className =
    "cardAgregarProducto flex flex-col h-full bg-white rounded-xl shadow-lg border border-slate-200 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1";

  // Ícono
  const icon = document.createElement("div");
  // --- Clases de Tailwind Aplicadas (Icon Wrapper) ---
  // Estilo: Círculo de color (verde pálido), centrado
  icon.className =
    "cardIcon w-14 h-14 rounded-full flex items-center justify-center bg-green-100";

  const img = document.createElement("img");
  img.src = "./assets/agregar.png"; // Asumiendo que es un icono
  img.alt = "Compras y Pedidos";
  // Estilo: Control de tamaño del icono dentro del círculo
  img.className = "cardIconImg w-8 h-8 object-contain";
  icon.append(img);

  // Título
  const title = document.createElement("h3");
  title.textContent = "Compras y pedidos";
  // Estilo: 'mt-4' (margen superior), fuente y color
  title.className = "cardTitle mt-4 text-xl font-semibold text-slate-900";

  // Descripción
  const desc = document.createElement("p");
  desc.textContent = "Añade nuevos productos al inventario.";
  // Estilo: 'mt-1' (margen), 'flex-grow' (¡Importante! Empuja el botón al fondo)
  desc.className = "cardDesc mt-1 text-sm text-slate-600 flex-grow";

  // Botón
  const button = document.createElement("button");
  button.textContent = "Pedidos";
  button.className ="cardBtn mt-4 w-full py-2 px-4 rounded-md text-sm font-medium text-center transition-colors duration-200 bg-green-50 text-green-700 hover:bg-green-100";
  button.addEventListener("click",()=>{
    window.location.hash = "#Pedidos";
  });

  // Estructura
  card.append(icon, title, desc, button);

  return card;
};

export default ComprasPedidos;
