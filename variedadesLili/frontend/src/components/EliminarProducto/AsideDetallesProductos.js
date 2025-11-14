export const AsideDetallesProductos = () => {
  const productDetailSection = document.createElement("aside");
  productDetailSection.className =
    "w-full md:w-1/3 p-6 bg-white shadow-xl rounded-xl border border-slate-200 sticky top-24 h-fit md:max-h-[calc(100vh-100px)] overflow-y-auto hidden flex-col animate-fade-in-right";
  // animate-fade-in-right: Sugerencia de clase para animación suave (configurar en tailwind.config o css)

  const detailHeader = document.createElement("div");
  detailHeader.className = "flex justify-between items-center mb-4";

  const detailTitle = document.createElement("h3");
  detailTitle.textContent = "Detalles";
  detailTitle.className = "text-xl font-bold text-slate-800";

  // Botón cerrar superior (para móvil es muy útil)
  const closeIconBtn = document.createElement("button");
  closeIconBtn.innerHTML = `&times;`;
  closeIconBtn.className =
    "text-2xl text-slate-400 hover:text-slate-600 leading-none";
  closeIconBtn.addEventListener("click", () =>
    productDetailSection.classList.add("hidden")
  );

  detailHeader.append(detailTitle, closeIconBtn);

  const detailContent = document.createElement("div");
  detailContent.className = "flex flex-col gap-4";

  productDetailSection.append(detailHeader, detailContent);

  return {
    productDetailSection,
    detailContent
  };
};
