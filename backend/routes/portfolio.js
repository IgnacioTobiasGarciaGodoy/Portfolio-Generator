import express from "express";
import { getAboutMeById } from "../data/portfolio.js";
import AboutMe from "../models/AboutMe.js"

const router = express.Router();

router.post("/", async (req, res) => {
    const { userId, mainText, userImage, auxText } = req.body;

    try {
        const newAboutMe = new AboutMe({
            userId,
            mainText,
            userImage,
            auxText,
        });

        const savedAboutMe = await newAboutMe.save();
        res.status(201).json(savedAboutMe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    const userId = req.params.userId;
    const aboutMe = await getAboutMeById(userId);
    res.json(aboutMe);
});

export default router;