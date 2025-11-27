import express from "express";
import { ControllerProductos } from "../controllers/ControllerProductos.js";
import { upload } from "../middlewares/multer/uploadMiddleware.js";

const router = express.Router();

// Obtener todos los productos
router.get("/productos", ControllerProductos.GetAllProductos);

// Crear un producto nuevo
router.post("/productos",upload.single("foto_producto"),ControllerProductos.AddProducto
);

// Actualizar un producto existente
router.put("/productos/:id",upload.single("foto_producto"),ControllerProductos.UpdateProducto
);

router.delete("/productos/:id", ControllerProductos.DeleteProducto);


export default router;
