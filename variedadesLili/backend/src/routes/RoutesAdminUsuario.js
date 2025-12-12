import express from "express";
import { ControllerAdminUsuario } from "../controllers/ControllerAdminUsuario.js";
import { uploadUsuario } from "../middlewares/auth/uploadUsuario.js";

const router = express.Router();

// Ruta para registrar usuario
router.post("/register",uploadUsuario.single("url_foto_perfil"),ControllerAdminUsuario.register);

// ✅ CORRECTO: Primero las rutas estáticas (específicas)
router.get("/all", ControllerAdminUsuario.getAllUsers);

// ✅ LUEGO: Las rutas dinámicas (que atrapan variables)
router.get("/:id", ControllerAdminUsuario.getUser);

// Ruta para iniciar sesión
router.post("/login", ControllerAdminUsuario.login);

// Eliminamos usuario por id
router.delete("/:id", ControllerAdminUsuario.deleteUser);

// Actualizar usuario
router.put("/:id",uploadUsuario.single("url_foto_perfil"),ControllerAdminUsuario.updateUser);

export default router;
