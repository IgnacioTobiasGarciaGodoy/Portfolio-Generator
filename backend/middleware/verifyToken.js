import jwt from "jsonwebtoken";

import Portfolio from "../models/portfolio.model.js";

export const verifyToken = async (req, res, next) => {
  //* Verifica si hay un token de autenticación en las cookies
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(401).json({ success: false, message: "No Autorizado - No se proveyo un token" });
  }

  try {
    //* Usamos jwt.verify para comprobar si el token es válido y no ha expirado. 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //* Utilizamos el ID decodificado del token para buscar al usuario en la colección Portfolio
    const userPortfolio = await Portfolio.findOne({ 'user._id': decoded.userId });

    if (!userPortfolio) {
      return res.status(401).json({ success: false, message: "No Autorizado - Usuario no encontrado" });
    }

    //* Verifica si el nombre de usuario en la URL coincide con el del token decodificado
    if (userPortfolio.user.userName !== req.params.userName) {
      return res.status(403).json({ success: false, message: "No Autorizado - No tienes permiso para editar estos datos" });
    }

    //* Si se encuentra al usuario, adjuntamos el ID al objeto req para que las siguientes funciones puedan acceder a él.
    req.userId = decoded.userId;

    //* Continuar con la ejecución de la ruta
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Token no válido" });
  }
};
