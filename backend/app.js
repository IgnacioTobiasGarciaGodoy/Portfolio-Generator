import "dotenv/config";
import express from "express";
import portfolioRouter from "./routes/portfolio"

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use("/portfolio", portfolioRouter);

app.listen(PORT, () => {
  console.log("Web server in the port:", PORT);
});