import getProductos from "../services/getProductos";

const Productos = async () => {
  // Traemos los datos
  const dataProductos = await getProductos();
  const Productos = dataProductos.productos; // más claro imposible

  // Contenedor principal
  const contenedor = document.createElement("div");
  contenedor.classList.add("lista-productos");

  Productos.forEach((prod) => {
    const card = document.createElement("div");
    card.classList.add("producto-card");

    const nombre = document.createElement("h3");
    nombre.textContent = prod.Nombre;

    const tamano = document.createElement("p");
    tamano.textContent = `Tamaño: ${prod.Tamaño}`;

    const precio = document.createElement("p");
    precio.textContent = `Precio: $${prod.Precio}`;

    const cantidad = document.createElement("p");
    cantidad.textContent = `Cantidad: ${prod.Cantidad}`;

    card.append(nombre, tamano, precio, cantidad);
    contenedor.appendChild(card);
  });

  return contenedor;
};

export default Productos;
