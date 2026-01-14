import express from "express";
import { uploadCliente, uploadUsuario } from "../middlewares/auth/uploadUsuario.js";
import { ControllerCliente } from "../controllers/ControllerClientes.js";
import { uploadPerfil } from "../middlewares/multer/uploadMiddleware.js";

const router = express.Router();

// Registrar un nuevo cliente (Soporta subida de imagen)
router.post("/register", uploadCliente.single("url_foto_perfil"), ControllerCliente.register);

// Iniciar sesión
router.post("/login", ControllerCliente.login);

// Obtener todos los clientes
router.get("/all", ControllerCliente.getAllClients);

// Obtener un cliente específico por ID
router.get("/:id", ControllerCliente.getClient);

// Actualizar información del cliente (Soporta actualizar imagen)
router.put("/:id", uploadCliente.single("url_foto_perfil"), ControllerCliente.updateClient);

// Eliminar cliente
router.delete("/:id", ControllerCliente.deleteClient);

router.patch("/perfil/:id", ControllerCliente.UpdateProfile);

router.post("/perfil/foto/:id", uploadPerfil.single("foto"), ControllerCliente.UploadPhoto);

export default router;