import { loginUser } from "../../services/authService";
import logoLogin from "./logoLogin";

const formLogin = () => {
  const container = document.createElement("div");
  container.className =
    "w-full max-w-md mx-auto p-6 sm:p-8 bg-white shadow-xl rounded-xl border border-slate-200 mt-10";

  const title = document.createElement("h2");
  title.textContent = "Iniciar Sesión";
  title.className =
    "text-2xl md:text-3xl font-bold text-center text-slate-900 mb-6";

  const logoLili = logoLogin();
  logoLili.classList.add("mb-6");

  const form = document.createElement("form");
  form.className = "flex flex-col gap-6";

  const userGroup = document.createElement("div");
  userGroup.className = "flex flex-col gap-2";

  const userLabel = document.createElement("label");
  userLabel.textContent = "Usuario";
  userLabel.setAttribute("for", "loginUser");
  userLabel.className = "text-slate-600 font-medium";

  const userInput = document.createElement("input");
  userInput.type = "text";
  userInput.id = "loginUser";
  userInput.placeholder = "ej: lili_ventas";
  userInput.className =
    "w-full border border-slate-300 rounded-md px-4 py-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent";

  userGroup.append(userLabel, userInput);

  // --- Grupo de Contraseña (Label + Input) ---
  const passGroup = document.createElement("div");
  passGroup.className = "flex flex-col gap-2";

  const passLabel = document.createElement("label");
  passLabel.textContent = "Contraseña";
  passLabel.setAttribute("for", "loginPass");
  passLabel.className = "text-slate-600 font-medium";

  const passInput = document.createElement("input");
  passInput.type = "password";
  passInput.id = "loginPass";
  passInput.placeholder = "••••••••";
  passInput.className =
    "w-full border border-slate-300 rounded-md px-4 py-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent";

  passGroup.append(passLabel, passInput);

  // --- Botón de Envío ---
  const btnSubmit = document.createElement("button");
  btnSubmit.type = "submit";
  btnSubmit.textContent = "Entrar";
  btnSubmit.className =
    "w-full bg-pink-600 text-white font-semibold py-3 px-4 rounded-md transition-all duration-300 shadow-md hover:bg-pink-700 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2";

  // --- Enlace "Olvidé contraseña" ---
  const forgotLink = document.createElement("a");
  forgotLink.href = "#";
  forgotLink.textContent = "¿Olvidaste tu contraseña?";
  forgotLink.className =
    "text-sm text-center text-pink-600 hover:underline mt-2";

  // Ensamblaje del formulario
  form.append(userGroup, passGroup, btnSubmit, forgotLink);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const identifier = document.getElementById("loginUser").value;
    const contrasena = document.getElementById("loginPass").value;

    try {
      const response = await loginUser(identifier, contrasena);
      console.log("Login exitoso", response);

      // Guardar token si quieres persistencia
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      alert(`Bienvenido ${response.data.usuario.nombre}`);
      // Redirigirimos al menú principal
      window.location.hash = "/";

    } catch (error) {
      alert(error.message || "Error al iniciar sesión");
    }
  });
  // Orden final: Título, Logo, Formulario
  container.append(title, logoLili, form);

  return container;
};

export default formLogin;
