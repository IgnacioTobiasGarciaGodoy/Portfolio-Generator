import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv"

dotenv.config();

//TODO: Me tira error cuando intento llevarlo al .env
const TOKEN = "49d371b4203159a2294cf3ed38542044";

export const mailtrapClient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Portfolio Generator",
};