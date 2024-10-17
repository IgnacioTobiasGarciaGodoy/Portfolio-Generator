import express from "express";
import getPortfolioById from "../data/portfolio.js";
import Portfolio from "../models/Portfolio.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { 
        user,
        aboutMe, 
        certificates, 
        contact, 
        education, 
        experience, 
        presentation, 
        projects, 
        technologies 
    } = req.body;

    try {
        
        const existingPortfolio = await Portfolio.findOne({ 'user.userName': user.userName });
        if (existingPortfolio) {
            return res.status(400).json({ message: "El nombre de usuario ya está en uso." });
        }
        
        // Crear un nuevo portafolio con los datos recibidos
        const portfolio = new Portfolio({
            user: user || {},
            aboutMe: aboutMe || {},  // Si no se proveen datos, usar objeto vacío
            certificates: certificates || [],  // Si no se proveen, usar array vacío
            contact: contact || {},
            education: education || [],
            experience: experience || [],
            presentation: presentation || {},
            projects: projects || [],
            technologies: technologies || []
        });

        // Guardar el portafolio en la base de datos
        const savedPortfolio = await portfolio.save();
        res.status(201).json(savedPortfolio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get("/:userName", async (req, res) => {
    const userName = req.params.userName;
    const aboutMe = await getPortfolioById(userName);
    res.json(aboutMe);
});

export default router;