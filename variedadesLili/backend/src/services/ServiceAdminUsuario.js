import { AdminUsuario } from "../models/AdminUsuario.js";
import bcrypt from "bcryptjs"; //para encriptar contraseñas
import jwt from "jsonwebtoken"; //para generar y verificar tokens

export class ServiceAdminUsuario {
  //traemos todos los usuarios
  static async getAllUsers() {
    try {
      const usuarios = await AdminUsuario.findAll();
      return {
        error: false,
        code: 200,
        message: "Usuarios obtenidos",
        data: usuarios,
      };
    } catch (error) {
      console.error("[ServiceAdminUsuario:getAllUsers]", error);
      return { error: true, code: 500, message: "Error interno del servidor" };
    }
  }

  //usuario por el username y contrasena
  static async login(identifier, contrasena) {
    try {
      console.log("[login] Buscando usuario:", identifier);
      //instanciamos email y el username del usuario
      const user = await AdminUsuario.findByLoginIdentifier(identifier);

      if (!user) {
        return {
          error: true,
          code: 401,
          message: "Credenciales incorrectas",
        };
      }

      const passwordValid = await bcrypt.compare(contrasena, user.contrasena);

      if (!passwordValid) {
        return {
          error: true,
          code: 401,
          message: "Credenciales incorrectas",
        };
      }

      // Generar Access Token
      const accessToken = jwt.sign(
        {
          id: user.id_usuario,
          email: user.email,
          rol: user.rol,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      // Generar Refresh Token
      const refreshToken = jwt.sign(
        { id: user.id_usuario },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );

      await AdminUsuario.updateRefreshToken(user.id_usuario, refreshToken);

      return {
        error: false,
        code: 200,
        message: "Inicio de sesión exitoso",
        data: {
          accessToken,
          refreshToken,
          usuario: {
            id: user.id_usuario,
            nombre: user.nombre,
            username: user.username,
            email: user.email,
            rol: user.rol,
            foto: user.url_foto_perfil,
          },
        },
      };
    } catch (error) {
      console.error("[login] Error interno:", error);
      return {
        error: true,
        code: 500,
        message: "Error interno en el servidor",
      };
    }
  }

  //crear usuario
  static async register({
    nombre,
    username,
    email,
    contrasena,
    rol,
    url_foto_perfil, // ya es la ruta generada por multer si hubo foto
  }) {
    try {
      // Validar si el usuario o email ya existe
      const existingUser =
        (await AdminUsuario.findByLoginIdentifier(username)) ||
        (await AdminUsuario.findByLoginIdentifier(email));

      if (existingUser) {
        return {
          error: true,
          code: 400,
          message: "El usuario o email ya existe",
        };
      }

      // Hashear contraseña
      const hashedPassword = await bcrypt.hash(contrasena, 10);

      // Crear usuario
      const user = await AdminUsuario.create({
        nombre,
        username,
        email,
        contrasena: hashedPassword,
        rol,
        url_foto_perfil, // aquí puede ser null si no subieron foto
      });

      return {
        error: false,
        code: 201,
        message: "Usuario creado",
        data: user,
      };
    } catch (error) {
      console.error("[register] Error:", error);
      return {
        error: true,
        code: 500,
        message: "Error interno del servidor",
      };
    }
  }

  //eliminamos usuario por id
  static async deleteUser(id) {
    try {
      const result = await AdminUsuario.deleteById(id);

      if (result.affectedRows === 0) {
        return { error: true, code: 404, message: "Usuario no encontrado" };
      }

      return {
        error: false,
        code: 200,
        message: "Usuario eliminado",
        data: { id },
      };
    } catch (error) {
      console.error("[ServiceAdminUsuario:deleteUser] Error:", error);
      return { error: true, code: 500, message: "Error interno del servidor" };
    }
  }

  //editamos usuarios
  static async updateUser(id, data) {
    try {
      const existingUser = await AdminUsuario.findById(id);
      if (!existingUser) {
        return { error: true, code: 404, message: "Usuario no encontrado" };
      }

      const result = await AdminUsuario.updateById(id, data);

      return {
        error: false,
        code: 200,
        message: "Usuario actualizado",
        data: { id, ...data },
      };
    } catch (error) {
      console.error("[ServiceAdminUsuario:updateUser] Error:", error);
      return { error: true, code: 500, message: "Error interno del servidor" };
    }
  }
}
