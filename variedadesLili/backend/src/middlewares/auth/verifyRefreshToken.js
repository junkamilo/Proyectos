import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ResponseProvider } from "../../providers/ResponseProvider.js";


dotenv.config();

const refreshSecretKey = process.env.REFRESH_TOKEN_SECRET;

export function verifyRefreshToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return ResponseProvider.unauthorized(
      res,
      "Token de refresco no proporcionado"
    );
  }

  const refreshToken = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(refreshToken, refreshSecretKey);

    req.user = decoded;
    req.refreshToken = refreshToken;

    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return ResponseProvider.forbidden(
        res,
        "El token de refresco ha expirado"
      );
    }

    return ResponseProvider.forbidden(
      res,
      "Token de refresco inválido o no autorizado"
    );
  }
}
