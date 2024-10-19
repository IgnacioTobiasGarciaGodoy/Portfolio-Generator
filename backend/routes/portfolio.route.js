import express from "express";
import { createPortfolio, getPortfolioByName } from "../controllers/portfolio.controller.js";

const router = express.Router();

// Ruta para crear un nuevo portafolio
router.post("/create", createPortfolio);

// Ruta para obtener un portafolio por nombre de usuario
router.get("/:name", getPortfolioByName);

export default router;
