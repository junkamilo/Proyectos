const formulario = () => {
  const dataEspecificaciones = {
    Tamaño: ["Pequeño", "Mediano", "Grande"],
    Precio: [10000, 20000, 30000],
    Cantidad: [1, 5, 10, 20],
  };
  // --- Fin de simulación ---
  const { Tamaño, Precio, Cantidad } = dataEspecificaciones;

  // --- Contenedor Principal (Estilo Tarjeta) ---
  const container = document.createElement("div");
  container.className =
    "w-full max-w-lg mx-auto p-6 sm:p-8 bg-white shadow-xl rounded-xl border border-slate-200 mt-10";

  // --- Título del Formulario ---
  const title = document.createElement("h2");
  title.textContent = "Agregar Nuevo Producto";
  title.className =
    "text-2xl md:text-3xl font-bold text-center text-slate-900 mb-8";

  // --- Formulario ---
  const form = document.createElement("form");
  // 'gap-6' espaciará cada grupo de campos
  form.className = "flex flex-col gap-6";

  // --- Grupo 1: Nombre ---
  const groupNombre = document.createElement("div");
  groupNombre.className = "flex flex-col gap-2"; // Espacio entre label e input

  const labelNombre = document.createElement("label");
  labelNombre.textContent = "Nombre del producto:";
  labelNombre.setAttribute("for", "nombre");
  labelNombre.className = "text-slate-600 font-medium";

  const inputNombre = document.createElement("input");
  inputNombre.type = "text";
  inputNombre.id = "nombre";
  inputNombre.name = "nombre";
  inputNombre.placeholder = "Ej: Cerdito Clásico Rosa";
  inputNombre.required = true;
  // Estilo de input coherente
  inputNombre.className =
    "w-full border border-slate-300 rounded-md px-4 py-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent";

  groupNombre.append(labelNombre, inputNombre);

  // --- Grupo 2: Tamaño ---
  const groupTamano = document.createElement("div");
  groupTamano.className = "flex flex-col gap-2";

  const labelTamano = document.createElement("label");
  labelTamano.textContent = "Elige el tamaño del producto:";
  labelTamano.setAttribute("for", "tamanoProducto");
  labelTamano.className = "text-slate-600 font-medium";

  const selectTamano = document.createElement("select");
  selectTamano.id = "tamanoProducto";
  // Estilo de select (igual al input)
  selectTamano.className =
    "w-full border border-slate-300 rounded-md px-4 py-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent";

  Tamaño.forEach((t) => {
    const option = document.createElement("option");
    option.value = t;
    option.textContent = t;
    selectTamano.appendChild(option);
  });

  groupTamano.append(labelTamano, selectTamano);

  // --- Wrapper de Grid (Precio y Cantidad) ---
  // Este div usará Grid para poner los campos uno al lado del otro en escritorio
  const gridWrapper = document.createElement("div");
  gridWrapper.className = "grid md:grid-cols-2 gap-6"; // 1 col en móvil, 2 en desktop

  // --- Grupo 3: Precio ---
  const groupPrecio = document.createElement("div");
  groupPrecio.className = "flex flex-col gap-2";

  const labelPrecio = document.createElement("label");
  labelPrecio.textContent = "Precio:";
  labelPrecio.setAttribute("for", "precio");
  labelPrecio.className = "text-slate-600 font-medium";

  const selectPrecio = document.createElement("select");
  selectPrecio.id = "precio";
  selectPrecio.className =
    "w-full border border-slate-300 rounded-md px-4 py-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent";

  Precio.forEach((p) => {
    const option = document.createElement("option");
    option.value = p;
    option.textContent = "$ " + p;
    selectPrecio.appendChild(option);
  });

  groupPrecio.append(labelPrecio, selectPrecio);

  // --- Grupo 4: Cantidad ---
  const groupCantidad = document.createElement("div");
  groupCantidad.className = "flex flex-col gap-2";

  const labelCantidad = document.createElement("label");
  labelCantidad.textContent = "Cantidad:";
  labelCantidad.setAttribute("for", "cantidad");
  labelCantidad.className = "text-slate-600 font-medium";

  const selectCantidad = document.createElement("select");
  selectCantidad.id = "cantidad";
  selectCantidad.className =
    "w-full border border-slate-300 rounded-md px-4 py-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent";

  Cantidad.forEach((c) => {
    const option = document.createElement("option");
    option.value = c;
    option.textContent = c;
    selectCantidad.appendChild(option);
  });

  groupCantidad.append(labelCantidad, selectCantidad);

  // Añadir los grupos al wrapper de grid
  gridWrapper.append(groupPrecio, groupCantidad);

  // --- Botón ---
  const buttonSubmit = document.createElement("button");
  buttonSubmit.type = "submit";
  buttonSubmit.textContent = "Guardar producto";
  // Estilo de Botón CTA (Acción Principal)
  buttonSubmit.className =
    "w-full bg-pink-600 text-white font-semibold py-3 px-4 rounded-md transition-all duration-300 shadow-md hover:bg-pink-700 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2";

  // --- Ensamblaje Final ---
  form.append(groupNombre, groupTamano, gridWrapper, buttonSubmit);
  container.append(title, form);

  // EVENTO SUBMIT (Sin cambios)
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const Nombre = inputNombre.value;
    const TamañoSel = selectTamano.value;
    const PrecioSel = Number(selectPrecio.value);
    const CantidadSel = Number(selectCantidad.value);

    const newProduct = {
      Nombre,
      Tamaño: TamañoSel,
      Precio: PrecioSel,
      Cantidad: CantidadSel,
    };

    try {
      // const res = await postProducto(newProduct);
      console.log("Producto a guardar:", newProduct);
      alert("Producto guardado correctamente");
      form.reset();
    } catch (error) {
      console.error(error);
      alert("Error al guardar el producto");
    }
  });

  // Retornamos el contenedor completo (la tarjeta)
  return container;
};

export default formulario;
