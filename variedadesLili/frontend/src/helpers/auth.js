//validamos que el usuario esta autenticado
export const estaAutenticado = () => {
  return !!localStorage.getItem("accessToken");
};