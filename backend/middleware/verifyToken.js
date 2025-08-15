import jwt from "jsonwebtoken";
import User from "../models/user.model.js"; // <-- en vez de Portfolio

export const verifyToken = async (req, res, next) => {
  const token = req.cookies?.authToken;
  if (!token) {
    return res.status(401).json({ success: false, message: "No Autorizado - No se proveyó un token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.userId) {
      return res.status(401).json({ success: false, message: "Token inválido" });
    }

    const user = await User.findById(decoded.userId).select("_id");
    if (!user) {
      return res.status(401).json({ success: false, message: "No Autorizado - Usuario no encontrado" });
    }

    req.userId = String(decoded.userId); // guardá como string para comparaciones
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Token no válido o expirado" });
  }
};