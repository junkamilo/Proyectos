export const EnlaceOlvideContrasena = () => {
  const forgotLink = document.createElement("a");
  forgotLink.href = "#";
  forgotLink.textContent = "¿Olvidaste tu contraseña?";
  forgotLink.className =
    "text-sm text-center text-slate-400 hover:text-purple-600 hover:underline mt-2 transition-colors";

    return forgotLink;
};
