import Portfolio from "../models/Portfolio.js"

export default async function getPortfolioById(userName) {
    try {
        const portfolio = await Portfolio.findOne({ 'user.userName': userName });
        return portfolio;
    } catch (err) {
        console.error("Error al obtener el portafolio:", err.message);
        throw err;
    }
}