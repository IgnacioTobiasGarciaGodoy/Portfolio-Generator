import bcryptjs from "bcryptjs"
import crypto from "crypto";
import User from "../models/user.model.js";
import Portfolio from "../models/portfolio.model.js";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js"
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetPasswordSuccess } from "../nodemailer/emails.js"

export const signup = async (req, res) => {
  const { email, password, userName, name } = req.body;

  try {
    if (!email || !password || !userName || !name) {
      throw new Error("Todos los campos son requeridos");
    }

    // Buscar en USERS (no en Portfolio)
    const exists = await User.findOne({ $or: [{ email }, { userName }] });
    if (exists) {
      const message = exists.email === email
        ? "El email ya está en uso."
        : "El nombre de usuario ya está en uso.";
      return res.status(400).json({ success: false, message });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 999999).toString();

    // 1) Crear usuario
    const user = await User.create({
      email,
      password: hashedPassword,
      userName,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 15 * 60 * 1000,
    });

    // 2) Crear portfolio mínimo referenciando al user
    const portfolio = await Portfolio.create({
      user: user._id,
      presentationSection: { fullName: name },
      aboutMeSection: { text: "Breve descripción sobre mí." },
    });

    // 3) Cookie/JWT: usa el _id del USER (no newPortfolio.user._id)
    generateTokenAndSetCookie(res, String(user._id));

    // 4) Email verificación
    sendVerificationEmail(user.email, verificationToken);

    //TODO delete
    console.log("Nuevo usuario creado:", JSON.stringify(user, null, 2));

    return res.status(201).json({
      success: true,
      message: "Usuario registrado exitosamente.",
      user: {
        _id: user._id,
        email: user.email,
        userName: user.userName,
        name: user.name,
        isVerified: user.isVerified,
      },
      portfolioId: portfolio._id,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    // Buscar en USERS
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Código inválido o vencido" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.userName);

    res.status(200).json({
      success: true,
      message: "Usuario verificado exitosamente.",
      user: {
        _id: user._id,
        email: user.email,
        userName: user.userName,
        name: user.name,
        isVerified: user.isVerified,
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Buscar en USERS
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "Credenciales inválidas: Email" });

    const ok = await bcryptjs.compare(password, user.password);
    if (!ok) return res.status(400).json({ success: false, message: "Credenciales inválidas: Contraseña" });

    generateTokenAndSetCookie(res, user._id);

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Usuario logeado exitosamente.",
      user: {
        _id: user._id,
        email: user.email,
        userName: user.userName,
        name: user.name,
        isVerified: user.isVerified,
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const logout = async (_req, res) => {
  res.clearCookie("authToken");
  res.status(200).json({ success: true, message: "Sesión cerrada exitosamente" });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    // Buscar en USERS
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "Email no encontrado" });

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 60 * 60 * 1000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExperiesAt = resetTokenExpiresAt;
    await user.save();

    await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

    res.status(200).json({ success: true, message: "Email para restablecer contraseña enviado" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    // Buscar en USERS
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExperiesAt: { $gt: Date.now() }
    });
    if (!user) return res.status(400).json({ success: false, message: "Token inválido o vencido" });

    const hashed = await bcryptjs.hash(password, 10);
    user.password = hashed;
    user.resetPasswordToken = undefined;
    user.resetPasswordExperiesAt = undefined;
    await user.save();

    sendResetPasswordSuccess(user.email);

    res.status(200).json({ success: true, message: "Contraseña restablecida correctamente" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    // req.userId viene del middleware verifyToken
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: "Usuario no encontrado" });

    // Opcional: traer el portfolio básico
    const portfolio = await Portfolio.findOne({ user: user._id }).select("_id user");

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        email: user.email,
        userName: user.userName,
        name: user.name,
        isVerified: user.isVerified,
      },
      portfolioId: portfolio?._id || null
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};