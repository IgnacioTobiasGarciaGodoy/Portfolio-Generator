import Portfolio from "../models/portfolio.model.js";

// Controlador para crear un nuevo portafolio
export const createPortfolio = async (req, res) => {
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
        const existingPortfolio = await Portfolio.findOne({ 'user.name': user.name });
        //? Revisar logica (probablemente deje de tener sentido tener esto aca cuando este lo del logeo)
        if (existingPortfolio) {
            return res.status(400).json({ message: "El nombre de usuario ya está en uso." });
        }
        
        // Crear un nuevo portafolio con los datos recibidos
        const portfolio = new Portfolio({
            user: user || {},
            aboutMe: aboutMe || {},
            certificates: certificates || [],
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
};

// Controlador para obtener un portafolio por nombre de usuario
export const getPortfolioByName = async (req, res) => {
    const name = req.params.name;
    try {
        const aboutMe = await Portfolio.findOne({ 'user.name': name });
        if (!aboutMe) {
          return res.status(404).json({ message: "No se encontró el portafolio" });
        }
        res.json(aboutMe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
