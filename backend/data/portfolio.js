import { ObjectId } from "mongodb";
import getConnection from "./conn.js";
const DATABASE = "portfolio_generator";
const ABOUTME = "portfolio_aboutMe";

export async function getPortfoliobyId(userId) {
    const connectiondb = await getConnection();
    const aboutMe = await connectiondb
        .db(DATABASE)
        .collection(ABOUTME)
        .findOne({ userId: new ObjectId(userId) });

    const education = await connectiondb
        .db(DATABASE)
        .collection(ABOUTME)
        .findOne({ userId: new ObjectId(userId) });

    return {aboutMe: aboutMe, education: education};
}