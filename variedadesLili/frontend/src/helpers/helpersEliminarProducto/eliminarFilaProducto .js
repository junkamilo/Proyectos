export const eliminarFilaProducto = (idProducto) => {
  const fila = document.querySelector(`tr[data-product-id="${idProducto}"]`);
  if (fila) fila.remove();
};
