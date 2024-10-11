import AboutMe from "../models/AboutMe.js"

export async function getAboutMeById(userId) {
    try {
        const aboutMe = await AboutMe.findOne({ userId: userId });
        return aboutMe;
    } catch (err) {
        console.error("Error al obtener el portafolio:", err.message);
        throw err;
    }
}