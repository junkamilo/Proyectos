import bcrypt from "bcryptjs"; 
import jwt from "jsonwebtoken"; 
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
      // 1. Buscar usuario
      const cliente = await Cliente.findByEmail(email);

      if (!cliente) {
        return { error: true, code: 401, message: "Credenciales incorrectas" };
      }

      // 2. Comparar contraseñas
      const passwordValid = await bcrypt.compare(contrasena, cliente.contrasena);

      if (!passwordValid) {
        return { error: true, code: 401, message: "Credenciales incorrectas" };
      }

      // 3. Generar Access Token
      const accessToken = jwt.sign(
        {
          id: cliente.id_cliente,
          email: cliente.email,
          rol: "cliente",
        },
        process.env.ACCESS_TOKEN_SECRET || "access_secret_seguro", // LLAVE A
        { expiresIn: "1h" }
      );

      // 4. Generar Refresh Token
      const refreshToken = jwt.sign(
        { id: cliente.id_cliente },
        process.env.REFRESH_TOKEN_SECRET || "refresh_secret_seguro",
        { expiresIn: "7d" }
      );

      // Limpiar respuesta
      delete cliente.contrasena;
      const { contrasena: _, ...clienteSinPass } = cliente;

      return {
        error: false,
        code: 200,
        message: "Inicio de sesión exitoso",
        data: {
          ...clienteSinPass,
          token: accessToken,
          refreshToken,
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

      // 1. Validar email
      const existingUser = await Cliente.findByEmail(email);
      if (existingUser) {
        return {
          error: true,
          code: 400,
          message: "El correo electrónico ya está registrado",
        };
      }

      // 2. Crear cliente (Asumimos que el modelo encripta, si no, hazlo aquí)
      // data.contrasena = await bcrypt.hash(data.contrasena, 10); // Descomenta si el modelo no encripta
      const newCliente = await Cliente.create(data);

      // 3. Generar Token (Auto-Login)
      // CORREGIDO: Usamos ACCESS_TOKEN_SECRET para que coincida con el login
      const token = jwt.sign(
        { id: newCliente.id_cliente, email: newCliente.email, rol: "cliente" },
        process.env.ACCESS_TOKEN_SECRET || "access_secret_seguro", // LLAVE A (Igual que login)
        { expiresIn: "1h" } // Coherencia: 1 hora igual que login
      );

      return {
        error: false,
        code: 201,
        message: "Cliente registrado exitosamente",
        data: {
          ...newCliente,
          token, 
        },
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

      // MEJORA DE SEGURIDAD:
      // Si el usuario está actualizando su contraseña, debemos encriptarla de nuevo
      if (data.contrasena) {
        data.contrasena = await bcrypt.hash(data.contrasena, 10);
      }

      const result = await Cliente.updateById(id, data);

      // Eliminamos la contraseña de la respuesta por seguridad
      const { contrasena, ...datosActualizados } = data;

      return {
        error: false,
        code: 200,
        message: "Datos del cliente actualizados",
        data: { id_cliente: id, ...datosActualizados },
      };
    } catch (error) {
      console.error("[ServiceCliente:updateClient] Error:", error);
      return { error: true, code: 500, message: "Error interno del servidor" };
    }
  }
}
