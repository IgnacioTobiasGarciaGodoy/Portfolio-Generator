import transporter from './nodemailer.config.js';
import { VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from './emailTemplates.js';

export const sendVerificationEmail = async (email, verificationToken) => {
  const mailOptions = {
    from: '"Portfolio Generator" <portfoliogenerator.ort@gmail.com>',
    to: email,
    subject: 'Verifica tu correo',
    html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken)
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("El email de verificación fue enviado correctamente: ", info.response);
  } catch (error) {
    console.log("Error enviando el mail de verificación: ", error);
    throw new Error("Error enviando el mail de verificación.");
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const mailOptions = {
    from: '"Portfolio Generator" <tu-email@gmail.com>',
    to: email,
    subject: 'Bienvenido/a a Portfolio Generator!',
    html: WELCOME_EMAIL_TEMPLATE.replace("{userName}", name)
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("El email de bienvenida fue enviado correctamente: ", info.response);
  } catch (error) {
    console.log("Error enviando el mail de bienvenida: ", error);
    throw new Error("Error enviando el mail de bienvenida.");
  }
};

export const sendPasswordResetEmail = async (email, resetUrl) => {
  const mailOptions = {
    from: '"Portfolio Generator" <portfoliogenerator.ort@gmail.com>',
    to: email,
    subject: 'Reestablece tu contraseña',
    html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl)
  }

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("El email de reestablecimiento de contraseña fue enviado correctamente: ", info.response);
  } catch (error) {
    console.log("Error enviando el mail de reestablecimiento de contraseña", error)
    throw new Error("Error enviando el mail de reestablecimiento de contraseña");
  }
}

export const sendResetPasswordSuccess = async (email) => {
  const mailOptions = {
    from: '"Portfolio Generator" <portfoliogenerator.ort@gmail.com>',
    to: email,
    subject: 'Contraseña reestablecida',
    html: PASSWORD_RESET_SUCCESS_TEMPLATE
  }

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("El email de reestablecimiento de contraseña exitoso fue enviado correctamente: ", info.response);
  } catch (error) {
    console.log("Error enviando el email de reestablecimiento de contraseña exitoso")
    throw new Error("Error enviando el email de reestablecimiento de contraseña exitoso");
  }
}

export const sendContactEmail = async (name, email, subject, message, userEmail) => {
  const mailOptions = {
    from: '"Portfolio Generator" <portfoliogenerator.ort@gmail.com>',
    to: userEmail,
    subject: subject,
    html: 
      `
        <h2>Correo de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `
  }

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("El email de contacto fue enviado correctamente: ", info.response);
  } catch (error) {
    console.log("Error enviando el mail de contacto", error)
    throw new Error("Error enviando el mail de contacto");
  }
}