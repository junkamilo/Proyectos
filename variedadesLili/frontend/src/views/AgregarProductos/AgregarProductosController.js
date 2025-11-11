import formulario from "../../components/AgregarProducto/form";

export const AgregarProductosController =  () => {
  const content = document.querySelector(".containerForm");
  const formularioProducs = formulario();

  content.append(formularioProducs);
  return content
}
