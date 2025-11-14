import express from "express";
import { ControllerProductos } from "../controllers/ControllerProductos.js";
import { upload } from "../middlewares/multer/uploadMiddleware.js";

const router = express.Router();

// Middleware de Multer (el campo debe coincidir con el `name` del input file)
router.post("/productos", upload.single("foto_producto"), ControllerProductos.AddProducto);
//traemos todos los productos agregados
router.get("/GetAllproductos", ControllerProductos.GetAllProductos);

export default router;