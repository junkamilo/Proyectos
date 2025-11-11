import { AdminUsuario } from "../models/AdminUsuario.js";
import bcrypt from "bcryptjs"; //para encriptar contraseñas
import jwt from "jsonwebtoken"; //para generar y verificar tokens

export class ServiceAdminUsuario {
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
}
