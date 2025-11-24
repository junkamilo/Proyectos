import express from "express";
import { ControllerAdminUsuario } from "../controllers/ControllerAdminUsuario.js";
import { uploadUsuario } from "../middlewares/auth/uploadUsuario.js";

const router = express.Router();

// Ruta para registrar usuario  
router.post(
  "/register",uploadUsuario.single("url_foto_perfil"),ControllerAdminUsuario.register
);

//treamos todos los usuarios
router.get("/all", ControllerAdminUsuario.getAllUsers);

//ruta para iniciar sesion
router.post("/login", ControllerAdminUsuario.login);

//eliminamos usuario por id
router.delete("/:id", ControllerAdminUsuario.deleteUser);

// Actualizar usuario (con foto opcional)
router.put("/:id", uploadUsuario.single("url_foto_perfil"), ControllerAdminUsuario.updateUser);

export default router;
