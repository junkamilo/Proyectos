import getEspecificaciones from "../services/getEspecificaciones";
import postProducto from "../services/postProductos";


const formulario = async () => {
  // Instancia de datos
  const dataEspecificaciones = await getEspecificaciones();
  const { Tamaño, Precio, Cantidad } = dataEspecificaciones;

  // Crear formulario
  const form = document.createElement("form");

  // Nombre
  const labelNombre = document.createElement("label");
  labelNombre.textContent = "Nombre del producto:";
  labelNombre.setAttribute("for", "nombre");

  const inputNombre = document.createElement("input");
  inputNombre.type = "text";
  inputNombre.id = "nombre";
  inputNombre.name = "nombre";
  inputNombre.required = true;

  // Tamaño
  const labelTamano = document.createElement("label");
  labelTamano.textContent = "Elige el tamaño del producto:";
  labelTamano.setAttribute("for", "tamanoProducto");

  const selectTamano = document.createElement("select");
  selectTamano.id = "tamanoProducto";

  Tamaño.forEach((t) => {
    const option = document.createElement("option");
    option.value = t;
    option.textContent = t;
    selectTamano.appendChild(option);
  });

  // Precio
  const labelPrecio = document.createElement("label");
  labelPrecio.textContent = "Precio:";
  labelPrecio.setAttribute("for", "precio");

  const selectPrecio = document.createElement("select");
  selectPrecio.id = "precio";

  Precio.forEach((p) => {
    const option = document.createElement("option");
    option.value = p;
    option.textContent = "$ " + p;
    selectPrecio.appendChild(option);
  });

  // Cantidad
  const labelCantidad = document.createElement("label");
  labelCantidad.textContent = "Cantidad:";
  labelCantidad.setAttribute("for", "cantidad");

  const selectCantidad = document.createElement("select");
  selectCantidad.id = "cantidad";

  Cantidad.forEach((c) => {
    const option = document.createElement("option");
    option.value = c;
    option.textContent = c;
    selectCantidad.appendChild(option);
  });

  // Botón
  const buttonSubmit = document.createElement("button");
  buttonSubmit.type = "submit";
  buttonSubmit.textContent = "Guardar producto";

  // Agregar todo al form
  form.append(
    labelNombre,
    inputNombre,
    labelTamano,
    selectTamano,
    labelPrecio,
    selectPrecio,
    labelCantidad,
    selectCantidad,
    buttonSubmit
  );

  // EVENTO SUBMIT: AQUÍ SE HACE EL POST
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
      const res = await postProducto(newProduct);
      console.log("Producto guardado:", res);

      alert("Producto guardado correctamente");

      form.reset(); // opcional
    } catch (error) {
      console.error(error);
      alert("Error al guardar el producto");
    }
  });

  return form;
};

export default formulario;
