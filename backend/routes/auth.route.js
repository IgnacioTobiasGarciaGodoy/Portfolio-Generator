import express from "express";

import { signup , login, logout, verifyEmail, forgotPassword, resetPassword, checkAuth } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router();

//* Esta ruta se usa para comprobar si el usuario está autenticado -> Solo permite el acceso si el token es válido.
//* Se utiliza para proteger rutas de acceso no autorizado, asegurando que solo los usuarios autenticados puedan acceder a ellas.
router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword)
router.post("/reset-password/:token", resetPassword)

export default router;