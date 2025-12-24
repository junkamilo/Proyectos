import express from "express";
import { ControllerCarrito } from "../controllers/ControllerCarShopping.js";


const router = express.Router();

// 1. Agregar producto (POST /api/Cart/add)
// Body: { id_cliente, id_producto, cantidad }
router.post("/add", ControllerCarrito.AddToCart);

// 2. Ver carrito de un cliente (GET /api/Cart/:id)
// Ejemplo: /api/Cart/10
router.get("/:id", ControllerCarrito.GetCartByClient);

// 3. Actualizar cantidad (PUT /api/Cart/update)
// Body: { id_cliente, id_producto, cantidad }
router.put("/update", ControllerCarrito.UpdateQuantity);

// 4. Eliminar un producto específico (DELETE /api/Cart/:id_cliente/:id_producto)
// Ejemplo: /api/Cart/10/5 (Eliminar producto 5 del cliente 10)
router.delete("/:id_cliente/:id_producto", ControllerCarrito.RemoveItem);

// 5. Vaciar carrito completo (DELETE /api/Cart/clear/:id)
// Ejemplo: /api/Cart/clear/10
router.delete("/clear/:id", ControllerCarrito.ClearCart);

export default router;