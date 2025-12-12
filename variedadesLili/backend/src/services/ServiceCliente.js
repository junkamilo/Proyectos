
import bcrypt from "bcryptjs"; //para encriptar contraseñas
import jwt from "jsonwebtoken"; //para generar y verificar tokens
import { Cliente } from "../models/Cliente.js";

export class ServiceCliente {
  
  // --- OBTENER TODOS LOS CLIENTES ---
  static async getAllClients() {
    try {
      const clientes = await Cliente.findAll();
      return {
        error: false,
        code: 200,
        message: "Lista de clientes obtenida exitosamente",
        data: clientes,
      };
    } catch (error) {
      console.error("[ServiceCliente:getAllClients] Error:", error);
      return { error: true, code: 500, message: "Error interno del servidor" };
    }
  }

  // --- OBTENER CLIENTE POR ID ---
  static async getClientById(id) {
    try {
      const cliente = await Cliente.findById(id);

      if (!cliente) {
        return {
          error: true,
          code: 404,
          message: "Cliente no encontrado",
        };
      }

      // Los datos sensibles ya se filtraron en el modelo (findById), 
      // pero por seguridad extra verificamos que no viaje la contraseña.
      delete cliente.contrasena;

      return {
        error: false,
        code: 200,
        message: "Cliente encontrado",
        data: cliente,
      };
    } catch (error) {
      console.error("[ServiceCliente:getClientById] Error:", error);
      return { error: true, code: 500, message: "Error interno del servidor" };
    }
  }

  // --- LOGIN DE CLIENTE ---
  static async login(email, contrasena) {
    try {
      // 1. Buscar usuario por email
      const cliente = await Cliente.findByEmail(email);

      if (!cliente) {
        return {
          error: true,
          code: 401,
          message: "Credenciales incorrectas",
        };
      }

      // 2. Comparar contraseñas
      const passwordValid = await bcrypt.compare(contrasena, cliente.contrasena);

      if (!passwordValid) {
        return {
          error: true,
          code: 401,
          message: "Credenciales incorrectas",
        };
      }

      // 3. Generar Access Token
      const accessToken = jwt.sign(
        {
          id: cliente.id_cliente,
          email: cliente.email,
          rol: "cliente", // Asignamos rol fijo o lo sacamos de la BD si existiera
        },
        process.env.ACCESS_TOKEN_SECRET || "access_secret", // Fallback por seguridad
        { expiresIn: "1h" }
      );

      // 4. Generar Refresh Token
      const refreshToken = jwt.sign(
        { id: cliente.id_cliente },
        process.env.REFRESH_TOKEN_SECRET || "refresh_secret",
        { expiresIn: "7d" }
      );

      // NOTA: Tu tabla 'Clientes' no tiene columna refreshToken, por eso no lo guardamos en BD.
      // Si la agregas después: await Cliente.updateRefreshToken(cliente.id_cliente, refreshToken);

      // Eliminamos datos sensibles antes de responder
      delete cliente.contrasena;

      return {
        error: false,
        code: 200,
        message: "Inicio de sesión exitoso",
        data: {
          accessToken,
          refreshToken,
          cliente,
        },
      };
    } catch (error) {
      console.error("[ServiceCliente:login] Error:", error);
      return { error: true, code: 500, message: "Error interno del servidor" };
    }
  }

  // --- REGISTRAR CLIENTE ---
  static async register(data) {
    try {
      const { email } = data;

      // 1. Validar si el email ya existe
      const existingUser = await Cliente.findByEmail(email);
      if (existingUser) {
        return {
          error: true,
          code: 400,
          message: "El correo electrónico ya está registrado",
        };
      }

      // 2. Crear cliente
      // NOTA: Pasamos la contraseña plana porque el modelo Cliente.create ya la encripta.
      const newCliente = await Cliente.create(data);

      return {
        error: false,
        code: 201,
        message: "Cliente registrado exitosamente",
        data: newCliente,
      };
    } catch (error) {
      console.error("[ServiceCliente:register] Error:", error);
      return { error: true, code: 500, message: "Error al registrar el cliente" };
    }
  }

  // --- ELIMINAR CLIENTE ---
  static async deleteClient(id) {
    try {
      const result = await Cliente.deleteById(id);

      if (result.affectedRows === 0) {
        return { error: true, code: 404, message: "Cliente no encontrado" };
      }

      return {
        error: false,
        code: 200,
        message: "Cliente eliminado correctamente",
        data: { id },
      };
    } catch (error) {
      console.error("[ServiceCliente:deleteClient] Error:", error);
      return { error: true, code: 500, message: "Error interno del servidor" };
    }
  }

  // --- ACTUALIZAR CLIENTE ---
  static async updateClient(id, data) {
    try {
      // Verificar existencia
      const existingClient = await Cliente.findById(id);
      if (!existingClient) {
        return { error: true, code: 404, message: "Cliente no encontrado" };
      }

      const result = await Cliente.updateById(id, data);

      return {
        error: false,
        code: 200,
        message: "Datos del cliente actualizados",
        data: { id_cliente: id, ...data },
      };
    } catch (error) {
      console.error("[ServiceCliente:updateClient] Error:", error);
      return { error: true, code: 500, message: "Error interno del servidor" };
    }
  }
}