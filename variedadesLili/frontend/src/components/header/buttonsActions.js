export const ButtonIniciarSeccion = () => {
  const button = document.createElement("button");
  button.textContent = "Iniciar Sesión";
  button.className ="hidden md:block bg-pink-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 shadow-md hover:bg-pink-700 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2";

  return button;
};
export const ButtonCerraSeccion = () => {
  const button = document.createElement("button");
  button.textContent = "Cerrar Sesión";
  button.className ="hidden md:block bg-red-50 text-red-700 font-medium py-2 px-4 rounded-md transition-all duration-300 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2";

  return button;
};
