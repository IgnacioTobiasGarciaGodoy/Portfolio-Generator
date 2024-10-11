import express from "express";
import { getPortfoliobyId } from "../data/portfolio.js";

const router = express.Router();

router.get("/:userId", async (req, res) => {
    const userId = req.params.userId;
    const portfolio = await getPortfoliobyId(userId);
    res.json(portfolio);
});

export default router;