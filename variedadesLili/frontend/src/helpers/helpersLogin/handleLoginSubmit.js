import { loginUser } from "../../services/Users/authService";
import { LoginError, LoginExitoso } from "../alerts/alerts";

export const handleLoginSubmit = async (e, inputUserElement, inputPassElement) => {
  e.preventDefault();

  // Obtenemos los valores directamente de los elementos DOM pasados
  const identifier = inputUserElement.value;
  const contrasena = inputPassElement.value;

  try {
    const response = await loginUser(identifier, contrasena);
    console.log("Login exitoso", response);

    // Guardar tokens
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);

    localStorage.setItem("usuario", JSON.stringify(response.data.usuario));

    //Avisamos a toda la app que el estado de autenticación cambió
    window.dispatchEvent(new Event("auth-change"));

    // Feedback al usuario
    await LoginExitoso(response.data.usuario.nombre);
    
    // Redirección
    window.location.hash = "/";

  } catch (error) {
    // Manejo robusto del mensaje de error (Backend message vs Generic message)
    const mensaje = "Credenciales incorrectas";
    // Mostramos la alerta de error (No requiere await porque no redirigimos)
    LoginError(mensaje);
    console.error(error);
  }
};