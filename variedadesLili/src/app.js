import formulario from "./components/form";

const app = document.getElementById("app");

//instanciamos el formulario
const form = await formulario();

//lo pegamos a su elemento padre
app.append(form);