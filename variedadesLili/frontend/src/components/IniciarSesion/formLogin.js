import logoLogin from "./logoLogin";

const formLogin = () => {
  const container = document.createElement("div");
  // --- Clases del Contenedor ---
  // Responsivo: w-full (móvil) max-w-md (escritorio)
  // Estética: bg-white, shadow-xl, rounded-xl, borde sutil (border-slate-200)
  // Espaciado: p-6 (móvil) sm:p-8 (escritorio), mt-10
  container.className =
    "w-full max-w-md mx-auto p-6 sm:p-8 bg-white shadow-xl rounded-xl border border-slate-200 mt-10";

  const title = document.createElement("h2");
  title.textContent = "Iniciar Sesión";
  // Texto de marca (más oscuro) y responsivo (text-2xl md:text-3xl)
  title.className =
    "text-2xl md:text-3xl font-bold text-center text-slate-900 mb-6";

  // Insertamos el logo (con su propia animación)
  const logoLili = logoLogin();
  logoLili.classList.add("mb-6"); // Añadimos espacio debajo del logo

  const form = document.createElement("form");
  // Aumentamos el espacio entre elementos a 'gap-6'
  form.className = "flex flex-col gap-6";

  // --- Grupo de Usuario (Label + Input) ---
  const userGroup = document.createElement("div");
  userGroup.className = "flex flex-col gap-2"; // Espacio entre label e input

  const userLabel = document.createElement("label");
  userLabel.textContent = "Usuario";
  userLabel.setAttribute("for", "loginUser");
  userLabel.className = "text-slate-600 font-medium"; // Color de texto secundario

  const userInput = document.createElement("input");
  userInput.type = "text";
  userInput.id = "loginUser";
  userInput.placeholder = "ej: lili_ventas";
  // --- Clases de Input ---
  // Estilo base: w-full, border, rounded-md, padding
  // Transición: transition-all duration-300
  // Focus (Interacción): se quita el outline, se añade un 'ring' del color primario (rosa)
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
  // Mismas clases que el input de usuario para consistencia
  passInput.className =
    "w-full border border-slate-300 rounded-md px-4 py-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent";

  passGroup.append(passLabel, passInput);

  // --- Botón de Envío ---
  const btnSubmit = document.createElement("button");
  btnSubmit.type = "submit";
  btnSubmit.textContent = "Entrar";
  // --- Clases del Botón (CTA) ---
  // Color primario: bg-pink-600
  // Texto: text-white font-semibold, padding 'py-3' (más grande)
  // Interacción (Hover): hover:bg-pink-700, hover:-translate-y-0.5 (efecto de "levantar")
  // Interacción (Focus): anill.o de accesibilidad rosa, offset para separarlo
  // Estética: rounded-md, shadow-md, transition-all
  btnSubmit.className =
    "w-full bg-pink-600 text-white font-semibold py-3 px-4 rounded-md transition-all duration-300 shadow-md hover:bg-pink-700 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2";

  // --- Enlace "Olvidé contraseña" ---
  const forgotLink = document.createElement("a");
  forgotLink.href = "#";
  forgotLink.textContent = "¿Olvidaste tu contraseña?";
  // Color primario para enlaces, centrado
  forgotLink.className =
    "text-sm text-center text-pink-600 hover:underline mt-2";

  // Ensamblaje del formulario
  form.append(userGroup, passGroup, btnSubmit, forgotLink);
  // Orden final: Título, Logo, Formulario
  container.append(title, logoLili, form);

  return container;
};

export default formLogin;
