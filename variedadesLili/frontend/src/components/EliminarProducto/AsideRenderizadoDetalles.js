export const AsideRenderizadoDetalles = (product , aside) => {
  const { detailContent, productDetailSection } = aside;

    detailContent.innerHTML = "";
    productDetailSection.classList.remove("hidden");
    productDetailSection.classList.add("flex"); // Usamos flex para manejar el layout interno

    // Imagen Grande
    const imgContainer = document.createElement("div");
    imgContainer.className = "relative group";

    const detailImg = document.createElement("img");
    detailImg.src =
      product.imagen || "https://via.placeholder.com/300x200?text=No+Img";
    detailImg.alt = product.nombre;
    detailImg.className =
      "w-full h-56 object-cover rounded-lg border border-slate-200 shadow-sm bg-white";

    // Etiqueta de estado sobre la imagen
    const statusLabel = document.createElement("span");
    statusLabel.textContent = product.estado;
    let labelColor = "bg-gray-800";
    if (product.estado === "Activo") labelColor = "bg-green-600";
    if (product.estado === "Agotado") labelColor = "bg-red-600";

    statusLabel.className = `absolute top-2 right-2 text-white text-xs font-bold px-2 py-1 rounded shadow-sm ${labelColor}`;

    imgContainer.append(detailImg, statusLabel);
    detailContent.append(imgContainer);

    // Grilla de datos
    const detailList = document.createElement("dl");
    detailList.className =
      "grid grid-cols-2 gap-x-4 gap-y-3 text-sm border-b border-slate-100 pb-4";

    const addDetailItem = (label, value, isFull = false) => {
      const div = document.createElement("div");
      if (isFull) div.className = "col-span-2";

      const dt = document.createElement("dt");
      dt.textContent = label;
      dt.className = "text-xs text-slate-500 uppercase font-bold tracking-wide";

      const dd = document.createElement("dd");
      dd.textContent = value;
      dd.className = "text-slate-800 font-medium mt-0.5";

      div.append(dt, dd);
      detailList.append(div);
    };

    addDetailItem("Nombre", product.nombre, true);
    addDetailItem("ID", `#${product.id}`);
    addDetailItem("Precio", `$${Number(product.precio).toLocaleString()}`);
    addDetailItem("Categoría", product.tipo);
    addDetailItem("Stock", product.cantidad);
    addDetailItem("Tamaño", product.tamaño);
    addDetailItem("Material", product.material);

    detailContent.append(detailList);

    // Descripción
    const fullDesc = document.createElement("div");
    fullDesc.className = "mt-2";
    const descTitle = document.createElement("h4");
    descTitle.textContent = "Descripción";
    descTitle.className = "text-xs text-slate-500 uppercase font-bold mb-1";
    const descText = document.createElement("p");
    descText.textContent = product.descripcion;
    descText.className = "text-sm text-slate-700 leading-relaxed";
    fullDesc.append(descTitle, descText);
    detailContent.append(fullDesc);

    // Botones Footer
    const detailActions = document.createElement("div");
    detailActions.className = "flex gap-3 mt-6 pt-4 border-t border-slate-200";

    const deleteDetailButton = document.createElement("button");
    deleteDetailButton.textContent = "Eliminar";
    deleteDetailButton.className =
      "flex-1 py-2 rounded-md bg-white border border-red-200 text-red-600 font-medium hover:bg-red-50 transition-colors";

    detailActions.append(deleteDetailButton);
    detailContent.append(detailActions);

    return detailContent;
};
