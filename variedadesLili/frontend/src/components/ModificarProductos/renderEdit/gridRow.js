import { createInputGroup } from "./createInputGroup";
import { createSelectGroup } from "./createSelectedGroup";
// 1. Recibimos 'product' como parámetro
export const gridRows = (product) => {
  const gridRow = document.createElement("div");
  gridRow.className = "grid grid-cols-1 sm:grid-cols-2 gap-5";

  // Creamos los grupos
  const priceGroup = createInputGroup("Precio", product.precio, "number");
  const stockGroup = createInputGroup("Stock", product.cantidad, "number");

  const categoriaGroup = createSelectGroup(
    "Categoría",
    ["alcancia", "materos", "abono", "plantas"],
    product.categoria
  );

  const materialGroup = createSelectGroup(
    "Material",
    ["cerámica", "plástico", "madera", "metal", "tierra", "natural"],
    product.material
  );

  const sizeGroup = createSelectGroup(
    "Tamaño",
    ["pequeño", "mediano", "grande"],
    product.tamano ?? product.tamaño
  );

  const estadoGroup = createSelectGroup(
    "Estado",
    ["Activo", "Agotado", "Inactivo"],
    product.estado
      ? product.estado[0].toUpperCase() + product.estado.slice(1).toLowerCase()
      : "Activo"
  );

  // Agregamos al DOM
  gridRow.append(
    priceGroup.div,
    stockGroup.div,
    categoriaGroup.div,
    materialGroup.div,
    sizeGroup.div,
    estadoGroup.div
  );

  // 2. Retornamos el DIV (para pintar) y los GRUPOS (para leer los datos en el submit)
  return {
    div: gridRow,
    inputs: {
      priceGroup,
      stockGroup,
      categoriaGroup,
      materialGroup,
      sizeGroup,
      estadoGroup,
    },
  };
};
