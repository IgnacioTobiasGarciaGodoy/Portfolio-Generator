import User from "../models/user.model.js";
import Portfolio from "../models/portfolio.model.js";

export const authorizeOwner = async (req, res, next) => {
  const { userId } = req;             // seteado por verifyToken
  const { userName } = req.params;    // viene de la ruta

  try {
    // 1) Buscar el usuario por userName (en la colección User)
    //    Si guardás userName en lowercase, normalizá acá también.
    const user = await User.findOne({ userName }).select("_id userName").lean();
    if (!user) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }

    // 2) ¿El user autenticado es el dueño?
    if (user._id.toString() !== String(userId)) {
      return res.status(403).json({ success: false, message: "No autorizado" });
    }

    // 3) (Opcional) asegurarse de que exista el portfolio del usuario
    const portfolio = await Portfolio.findOne({ user: user._id }).select("_id").lean();
    if (!portfolio) {
      return res.status(404).json({ success: false, message: "Portafolio no encontrado" });
    }

    // (Opcional) dejar a mano para controladores
    req.targetUserId = user._id;
    req.portfolioId = portfolio._id;

    next();
  } catch (error) {
    res.status(500).json({ success: false, message: "Error de servidor" });
  }
};