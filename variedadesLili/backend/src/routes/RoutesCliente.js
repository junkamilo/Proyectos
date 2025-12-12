import express from "express";
import { uploadUsuario } from "../middlewares/auth/uploadUsuario.js";
import { ControllerCliente } from "../controllers/ControllerClientes.js";

const router = express.Router();

// Registrar un nuevo cliente (Soporta subida de imagen)
router.post("/register", uploadUsuario.single("url_foto_perfil"), ControllerCliente.register);

// Iniciar sesión
router.post("/login", ControllerCliente.login);

// Obtener todos los clientes
router.get("/all", ControllerCliente.getAllClients);


// --- RUTAS DINÁMICAS (Requieren ID, deben ir al final de los GETs) ---

// Obtener un cliente específico por ID
router.get("/:id", ControllerCliente.getClient);

// Actualizar información del cliente (Soporta actualizar imagen)
router.put("/:id", uploadUsuario.single("url_foto_perfil"), ControllerCliente.updateClient);

// Eliminar cliente
router.delete("/:id", ControllerCliente.deleteClient);

export default router;