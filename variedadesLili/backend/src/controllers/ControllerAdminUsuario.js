
import { ResponseProvider } from "../providers/responseProvider.js";
import { ServiceAdminUsuario } from "../services/ServiceAdminUsuario.js";

export class ControllerAdminUsuario {
  static login = async (req, res) => {
    const { identifier, contrasena } = req.body;

    try {
      const response = await ServiceAdminUsuario.login(identifier, contrasena);

      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      return ResponseProvider.error(res, "Error en el servidor", 500);
    }
  };
}
