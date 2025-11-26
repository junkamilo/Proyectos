import Swal from "sweetalert2";

const baseSwalConfig = {
  background: "#0f172a",
  buttonsStyling: false,
  color: "#f8fafc",
  customClass: {
    popup:
      "bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl p-6 sm:p-8",
    title: "text-slate-100 text-xl font-bold tracking-tight mt-2",
    htmlContainer: "text-slate-400 text-sm leading-relaxed",
    icon: "border-none mb-4",
    actions: "w-full mt-6 flex justify-center gap-3",
  },
};

//alertas de productos
export const ProductoAgregado = (data) => {
  Swal.fire({
    ...baseSwalConfig,
    title: "¡Producto Agregado!",
    text: data.message,
    icon: "success",
    iconColor: "#4ade80",
    confirmButtonText: "Genial",
    customClass: {
      ...baseSwalConfig.customClass,
      confirmButton:
        "w-full sm:w-auto px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-indigo-500/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/50",
    },
  });
};

export const ErrorProducto = (error) => {
  Swal.fire({
    ...baseSwalConfig,
    title: "Ocurrió un error",
    text: error.message,
    icon: "error",
    iconColor: "#f87171",
    confirmButtonText: "Entendido",
    customClass: {
      ...baseSwalConfig.customClass,
      confirmButton:
        "w-full sm:w-auto px-6 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-semibold transition-all duration-200 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500/50",
    },
  });
};

//alertas de login
export const LoginExitoso = (nombreUsuario) => {
  return Swal.fire({
    ...baseSwalConfig,
    title: `¡Hola, ${nombreUsuario}!`,
    text: "Credenciales verificadas. Ingresando...",
    icon: "success",
    iconColor: "#34d399",
    timer: 1500,
    timerProgressBar: true,
    showConfirmButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    customClass: {
      ...baseSwalConfig.customClass,
      timerProgressBar: "bg-gradient-to-r from-purple-500 to-pink-500 h-1",
      popup: `${baseSwalConfig.customClass.popup} border-l-4 border-l-purple-500`,
    },
  });
};

export const LoginError = (mensaje) => {
  Swal.fire({
    ...baseSwalConfig,
    title: "Acceso Denegado",
    text: mensaje || "Usuario o contraseña incorrectos.",
    icon: "error",
    iconColor: "#f43f5e", // Rose-500 (Rojo moderno)
    confirmButtonText: "Intentar de nuevo",
    customClass: {
      ...baseSwalConfig.customClass,
      confirmButton:
        "w-full sm:w-auto px-8 py-3 rounded-xl text-white font-bold shadow-lg " +
        "bg-gradient-to-r from-red-600 to-rose-600 " + // Gradiente de Error (Coherente con eliminar)
        "hover:from-red-700 hover:to-rose-700 " +
        "hover:shadow-red-500/30 hover:-translate-y-0.5 " +
        "focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-900 " +
        "transition-all duration-300",
    },
  });
};
