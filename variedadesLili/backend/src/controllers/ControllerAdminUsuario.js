import { ResponseProvider } from "../providers/ResponseProvider.js";
import { ServiceAdminUsuario } from "../services/ServiceAdminUsuario.js";

export class ControllerAdminUsuario {
  //treamos todos los usuarios
  static getAllUsers = async (req, res) => {
    try {
      const response = await ServiceAdminUsuario.getAllUsers();
      if (response.error)
        return ResponseProvider.error(res, response.message, response.code);
      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      console.error("[ControllerAdminUsuario:getAllUsers] Error:", error);
      return ResponseProvider.error(res, "Error interno del servidor", 500);
    }
  };

  //obtenemos un usuario por su id
  static getUser = async (req, res) => {
    const { id } = req.params;

    try {
      const response = await ServiceAdminUsuario.getUserById(id);

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
      console.error("[ControllerAdminUsuario:getUser] Error:", error);
      return ResponseProvider.error(res, "Error interno del servidor", 500);
    }
  };

  //login
  static login = async (req, res) => {
    const { identifier, contrasena } = req.body;

    try {
      const response = await ServiceAdminUsuario.login(identifier, contrasena);

      if (response.error) {
        // Solo usamos 500 si es realmente un error interno
        const statusCode =
          response.code && response.code >= 400 && response.code < 500
            ? response.code
            : 500;

        console.warn("[login] Error de login:", response.message);

        return ResponseProvider.error(res, response.message, statusCode);
      }

      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code || 200
      );
    } catch (error) {
      console.error("[login] Error inesperado en el servidor:", error);
      return ResponseProvider.error(res, "Error interno del servidor", 500);
    }
  };

  //crear usuario
  static register = async (req, res) => {
    const { nombre, username, email, contrasena, rol } = req.body;
    const url_foto_perfil = req.file
      ? `/uploads/usuarios/${req.file.filename}`
      : null;

    try {
      const response = await ServiceAdminUsuario.register({
        nombre,
        username,
        email,
        contrasena,
        rol,
        url_foto_perfil,
      });

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
      console.error("[register] Error:", error);
      return ResponseProvider.error(res, "Error en el servidor", 500);
    }
  };

  //eliminamos usuario por id
  static deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
      const response = await ServiceAdminUsuario.deleteUser(id);

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
      console.error("[ControllerAdminUsuario:deleteUser] Error:", error);
      return ResponseProvider.error(res, "Error interno del servidor", 500);
    }
  };

  //editamos usuarios
  static updateUser = async (req, res) => {
    const { id } = req.params;
    const { nombre, username, email, rol } = req.body;
    const url_foto_perfil = req.file
      ? `/uploads/usuarios/${req.file.filename}`
      : req.body.url_foto_perfil;

    try {
      const response = await ServiceAdminUsuario.updateUser(id, {
        nombre,
        username,
        email,
        rol,
        url_foto_perfil,
      });

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
      console.error("[ControllerAdminUsuario:updateUser] Error:", error);
      return ResponseProvider.error(res, "Error interno del servidor", 500);
    }
  };
}
