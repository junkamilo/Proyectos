import './style.css';


import contentName from "./components/IniciarSesion/contentName";
import formLogin from "./components/IniciarSesion/formLogin";

const app = document.getElementById("app");

const Name = contentName();
const formlogin = formLogin();

app.append(Name,formlogin);