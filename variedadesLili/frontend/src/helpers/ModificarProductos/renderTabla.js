export const actualizarFilaProducto = (productoActualizado) => {
  const fila = document.querySelector(
    `tr[data-product-id="${productoActualizado.id_producto}"]`
  );

  if (!fila) return;

  // Celda 1: Imagen + nombre + desc
  const img = fila.querySelector("img");
  const nombre = fila.querySelector("td:nth-child(1) p.font-semibold");
  const desc = fila.querySelector("td:nth-child(1) p.text-xs");

  img.src = productoActualizado.imagen;
  nombre.textContent = productoActualizado.nombre;
  desc.textContent = productoActualizado.descripcion;

  // Celda 2: ID (normalmente igual)
  fila.children[1].textContent = `#${productoActualizado.id_producto}`;

  // Celda 3: Precio
  fila.children[2].textContent =
    `$${Number(productoActualizado.precio).toLocaleString()}`;

  // Celda 4: Cantidad
  fila.children[3].textContent = productoActualizado.cantidad;

  // Celda 5: Tamaño
  fila.children[4].textContent = productoActualizado.tamano;

  // Celda 6: Categoría
  fila.children[5].textContent = productoActualizado.categoria;

  // Celda 7: Material
  fila.children[6].textContent = productoActualizado.material;

  // Celda 8: Estado badge
  const badge = fila.children[7].querySelector("span");
  badge.textContent = productoActualizado.estado;
};
