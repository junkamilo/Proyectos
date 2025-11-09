import './style.css';


import contentName from "./components/IniciarSesion/contentName";
import formLogin from "./components/IniciarSesion/formLogin";
import header from './components/header/header';
import main from './components/menuPrincipal/main';

const app = document.getElementById("app");

//const Name = contentName();
//const formlogin = formLogin();
const headerMain = header();
const contentMain = main();

app.append(headerMain,contentMain);