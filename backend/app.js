import "dotenv/config";
import express from "express";
import connectDB from "./data/conn.js";
import portfolioRouter from "./routes/portfolio.js"

const PORT = process.env.PORT;
const app = express();

connectDB();

app.use(express.json());
app.use("/portfolio", portfolioRouter);

app.listen(PORT, () => {
  console.log("Web server in the port:", PORT);
});