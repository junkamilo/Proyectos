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
import "./css/form.css";


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

  const container = document.createElement("div");
  container.className =
    "w-full max-w-3xl mx-auto " +
    "p-6 sm:p-10 " + 
    "mt-8 sm:mt-12 " + 
    "bg-white/90 dark:bg-slate-800/95 backdrop-blur-sm " + 
    "shadow-2xl shadow-purple-900/5 dark:shadow-black/50 " + 
    "rounded-2xl border border-white/50 dark:border-slate-700 " + 
    "animate-fade-in-up";

  // --- Título ---
  const title = document.createElement("h2");
  title.textContent = "Registrar Producto";
  title.className =
    "text-3xl md:text-4xl font-extrabold text-center mb-8 md:mb-12 " + 
    "bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent " +
    "tracking-tight";

  // --- Formulario (Layout Grid) ---
  const form = document.createElement("form");
  form.className =
    "grid grid-cols-1 md:grid-cols-2 " + "gap-6 md:gap-x-8 md:gap-y-8";
  // --- Ensamblaje Final ---
  // El orden ahora es importante para el grid
  form.append(
    groupNombre,
    groupUrl.container,
    groupDescripcion,
    groupCantidad,
    groupPrecio,
    groupTamano,
    groupEstado,
    groupCategoria,
    groupMaterial,
    button
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
