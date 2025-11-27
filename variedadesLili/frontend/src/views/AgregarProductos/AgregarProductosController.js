import formulario from "../../components/AgregarProducto/form";
import { addForm } from "../../helpers/helpersAgregarProducto/addForm";

export const AgregarProductosController =  () => {
  const content = document.querySelector(".containerForm");
  const { container, form, groups } = formulario();

  content.append(container);

  addForm(form, groups);

  return content
}
