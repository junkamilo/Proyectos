import { ResponseProvider } from "../../providers/ResponseProvider";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return ResponseProvider.unauthorized(
      res,
      "Acceso denegado. Token no proporcionado"
    );
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return ResponseProvider.unauthorized(res, "Token inválido");
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return ResponseProvider.unauthorized(res, "El token ha expirado");
    }

    if (error.name === "JsonWebTokenError") {
      return ResponseProvider.unauthorized(res, "Token inválido");
    }

    return ResponseProvider.error(res, error);
  }
}
