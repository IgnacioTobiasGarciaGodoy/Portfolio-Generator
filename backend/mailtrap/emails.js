import { mailtrapClient, sender } from "./mailtrap.config.js"
import {VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE} from "./emailTemplates.js"

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{email}]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Verifica tu correo',
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })

        console.log("El email de verificacion fue enviado correctamente ", response)
    } catch (error) {
        console.log("Error enviando el mail de verificacion: ", error);
        throw new Error("Error enviando el mail de verificacion: ", error);
    }
}

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{email}]
        
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Bienvenido/a a Portfolio Generator!',
            html: WELCOME_EMAIL_TEMPLATE.replace("{userName}", name),
            category: "Email Verification"
        })

        console.log("El email de bienvenida fue enviado correctamente ", response)
    } catch (error) {
        console.log("Error enviando el mail de bienvenida: ", error);
        throw new Error("Error enviando el mail de bienvenida: ", error);
    }
}

export const sendPasswordResetEmail = async (email, resetUrl) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Reestablece tu contraseña',
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
            category: "Password Reset"
        })

        console.log("El email de restablecimiento de contraseña fue enviado correctamente ", response)
    } catch (error) {
        throw new Error(`Error sending password reset email: ${error}`);
    }
}

export const sendResetPasswordSuccess = async (email) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Contraseña restablecida',
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset"
        })

        console.log("El email de que el restablecimiento de contraseña fue exitoso fue enviado correctamente ", response)
    } catch (error) {
        throw new Error(`Error sending password reset email: ${error}`);
    }
}