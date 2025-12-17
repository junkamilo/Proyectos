import { ResponseProvider } from "../providers/ResponseProvider.js";
import { ServiceCliente } from "../services/ServiceCliente.js";

export class ControllerCliente {
  // --- OBTENER TODOS LOS CLIENTES ---
  static getAllClients = async (req, res) => {
    try {
      const response = await ServiceCliente.getAllClients();

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
      console.error("[ControllerCliente:getAllClients] Error:", error);
      return ResponseProvider.error(res, "Error interno del servidor", 500);
    }
  };

  // --- OBTENER UN CLIENTE POR ID ---
  static getClient = async (req, res) => {
    const { id } = req.params;

    try {
      const response = await ServiceCliente.getClientById(id);

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
      console.error("[ControllerCliente:getClient] Error:", error);
      return ResponseProvider.error(res, "Error interno del servidor", 500);
    }
  };

  // --- LOGIN ---
  static login = async (req, res) => {
    const { email, contrasena } = req.body;

    try {
      // 2. Llamamos al servicio (Aquí ocurre la validación real)
      const response = await ServiceCliente.login(email, contrasena);

      // 3. Manejo de Errores (Credenciales inválidas, usuario no existe, etc.)
      if (response.error) {
        const statusCode = response.code || 500;
        console.warn("[login] Error de login:", response.message);
        return ResponseProvider.error(res, response.message, statusCode);
      }

      // 4. Éxito: Devolvemos el usuario + TOKEN
      return ResponseProvider.success(
        res,
        response.data, // Aquí adentro viene { ...usuario, token }
        response.message,
        response.code || 200
      );
    } catch (error) {
      console.error("[ControllerCliente:login] Error inesperado:", error);
      return ResponseProvider.error(res, "Error interno del servidor", 500);
    }
  };

  // --- REGISTRAR CLIENTE ---
  static register = async (req, res) => {
    // Extraemos los campos específicos de la tabla Clientes
    const {
      nombre_completo,
      email,
      contrasena,
      telefono,
      fecha_nacimiento,
      genero,
    } = req.body;

    // Manejo de la foto de perfil si se subió un archivo
    const url_foto_perfil = req.file
      ? `/uploads/clientes/${req.file.filename}` // Sugerencia: separar carpetas por tipo de usuario
      : null;

    try {
      const response = await ServiceCliente.register({
        nombre_completo,
        email,
        contrasena,
        telefono,
        fecha_nacimiento,
        genero,
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
      console.error("[ControllerCliente:register] Error:", error);
      return ResponseProvider.error(res, "Error en el servidor", 500);
    }
  };

  // --- ELIMINAR CLIENTE ---
  static deleteClient = async (req, res) => {
    const { id } = req.params;

    try {
      const response = await ServiceCliente.deleteClient(id);

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
      console.error("[ControllerCliente:deleteClient] Error:", error);
      return ResponseProvider.error(res, "Error interno del servidor", 500);
    }
  };

  // --- ACTUALIZAR CLIENTE ---
  static updateClient = async (req, res) => {
    const { id } = req.params;

    // Extraemos los datos editables
    const { nombre_completo, email, telefono, fecha_nacimiento, genero } =
      req.body;

    // Si suben una nueva foto, usamos esa ruta. Si no, usamos la que envíen en el body (o se mantiene la anterior en el servicio)
    const url_foto_perfil = req.file
      ? `/uploads/clientes/${req.file.filename}`
      : req.body.url_foto_perfil;

    try {
      const response = await ServiceCliente.updateClient(id, {
        nombre_completo,
        email,
        telefono,
        fecha_nacimiento,
        genero,
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
      console.error("[ControllerCliente:updateClient] Error:", error);
      return ResponseProvider.error(res, "Error interno del servidor", 500);
    }
  };
}
