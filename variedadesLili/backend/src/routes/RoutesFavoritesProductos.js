import express from "express";
// Asegúrate de poner .js si usas ES Modules
import { ControllerFavoritos } from "../controllers/ControllerFavoritos.js"; 

const router = express.Router();

// Definir el endpoint: GET /api/favoritos/:id
router.get("/:id", ControllerFavoritos.GetWishlist);

router.post("/:id", ControllerFavoritos.AddFavorite);


export default router;