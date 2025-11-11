import express from "express";
import { verifyToken } from "../middlewares/auth/tokenMiddleware.js";
import { verifyRefreshToken } from "../middlewares/auth/verifyRefreshToken.js";
import { ControllerAdminUsuario } from "../controllers/ControllerAdminUsuario.js";

const router = express.Router();

//ruta para iniciar sesion
router.post("/login", ControllerAdminUsuario.login);

export default router;