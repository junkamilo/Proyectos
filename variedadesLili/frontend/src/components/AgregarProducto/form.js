import { Button } from "./Button";
import { CantidadProductos } from "./CantidadProductos";
import { CategoriaProducto } from "./CategoriaProducto";
import { DescriptionProducto } from "./DescriptionProducto";
import { EstadoProducto } from "./EstadoProducto";
import { MaterialProducto } from "./MaterialProducto";
import { NameProductos } from "./NameProductos";
import { PrecioProducto } from "./PrecioProducto";
import { TamanoProducto } from "./TamanoProducto";
import { UrlPhotosProductos } from "./UrlPhotosProductos";

const formulario = () => {
  //instanciamos los componentes del formualrio
  const groupNombre = NameProductos();
  const groupUrl = UrlPhotosProductos();
  const groupDescripcion = DescriptionProducto();
  const groupCantidad = CantidadProductos();
  const groupPrecio = PrecioProducto();
  const groupTamano = TamanoProducto();
  const groupEstado = EstadoProducto();
  const groupCategoria = CategoriaProducto();
  const groupMaterial = MaterialProducto();
  const button = Button();

  // --- Contenedor Principal (Sin cambios) ---
  const container = document.createElement("div");
  container.className =
    "w-full max-w-2xl mx-auto p-6 sm:p-8 bg-white shadow-xl rounded-xl border border-slate-200 mt-10";

  // --- Título (Sin cambios) ---
  const title = document.createElement("h2");
  title.textContent = "Registrar Producto";
  title.className =
    "text-2xl md:text-3xl font-bold text-center text-slate-900 mb-8";

  // --- Formulario (¡Mejora de Layout!) ---
  // AHORA ES UN GRID: 1 columna en móvil, 2 en escritorio
  const form = document.createElement("form");
  form.className = "grid grid-cols-1 md:grid-cols-2 gap-6";
  // --- Ensamblaje Final ---
  // El orden ahora es importante para el grid
  form.append(
    groupNombre, // Fila 1 (Completa)
    groupUrl, // Fila 2 (Completa)
    groupDescripcion, // Fila 3 (Completa)
    groupCantidad, // Fila 4 (Izquierda)
    groupPrecio, // Fila 4 (Derecha)
    groupTamano, // Fila 5 (Izquierda)
    groupEstado, // Fila 5 (Derecha)
    groupCategoria, // Fila 6 (Izquierda)
    groupMaterial, // Fila 6 (Derecha)
    button // Fila 7 (Completa)
  );

  container.append(title, form);
  return {
    container,
    form,
    groups: {
      groupNombre,
      groupUrl,
      groupDescripcion,
      groupCantidad,
      groupPrecio,
      groupTamano,
      groupEstado,
      groupCategoria,
      groupMaterial,
    },
  };
};

export default formulario;
