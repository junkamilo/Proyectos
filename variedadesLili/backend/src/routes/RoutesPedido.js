import express from "express";
import { ControllerPedidos } from "../controllers/ControllerPedido.js";



const router = express.Router();

router.get("/dashboard_todos", ControllerPedidos.GetAllPedidos);

router.patch("/enviar/:id", ControllerPedidos.MarcarEnviado);

// Endpoint para finalizar compra: POST /api/pedidos/comprar
router.post("/comprar", ControllerPedidos.CrearPedido);

// Endpoint para ver historial: GET /api/pedidos/historial/:id_cliente
router.get("/historial/:id_cliente", ControllerPedidos.GetHistorial);

// GET: Ver productos dentro de un pedido específico (NUEVO)
router.get("/detalle/:id_pedido", ControllerPedidos.GetDetalle);

router.get("/:id", ControllerPedidos.GetOnePedido);

export default router;