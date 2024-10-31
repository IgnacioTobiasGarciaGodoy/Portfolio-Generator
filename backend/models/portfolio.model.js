import mongoose from "mongoose";

const TextSchema = new mongoose.Schema({
  text: { type: String, default: "Esto es el texto por default!" },
  isBold: { type: Boolean, default: false },
  size: { type: Number, default: 12 },
  color: { type: String, default: "black" },
  font: { type: String, default: "Arial" },
  isItalic: { type: Boolean, default: false },
});

const LinkSchema = new mongoose.Schema({
  text: { type: String, default: "esto es un link" },
  link: { type: String, default: "google.com" },
  isBold: { type: Boolean, default: false },
  size: { type: Number, default: 12 },
});

const DateSchema = new mongoose.Schema({
  from: { type: String, default: "20/12/2022" },
  to: { type: String, default: () => new Date().toLocaleDateString("es-ES") },
  isBold: { type: Boolean, default: false },
  size: { type: Number, default: 12 },
});

const ImageSchema = new mongoose.Schema({
  image: { type: String, default: "https://m.media-amazon.com/images/M/MV5BODQwNmI0MDctYzA5Yy00NmJkLWIxNGMtYzgyMDBjMTU0N2IyXkEyXkFqcGdeQXVyMjI4MjA5MzA@._V1_SY1000_SX677_AL_.jpg" },
});

//* Al usar timestamps agrega automáticamente dos campos a cada documento de la colección: 
//* createdAt: Registra la fecha y hora en que se creó el documento.
//* updatedAt: Registra la fecha y hora en que se actualizó por última vez el documento.

//* _id: true lo que hace es generar un _id para este subdocumento
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  name: { type: String },
  userName: { type: String, required: true, unique: true },
  lastLogin: {type: Date, default: Date.now},
  isVerified: {type: Boolean, default: false},
  resetPasswordToken: String,//?  Almacena un token que se genera cuando un usuario solicita restablecer su contraseña -> Se utiliza para verificar que el usuario tenga permiso para cambiar la contraseña.
  resetPasswordExperiesAt: Date,//? Define la fecha y hora en la que expira el resetPasswordToken -> Esto asegura que el enlace para restablecer la contraseña solo sea válido por un período de tiempo limitado.
  verificationToken: String,//? Almacena un token que se genera cuando un usuario se registra -> Este token se envía al correo electrónico del usuario para verificar su dirección de correo y activar su cuenta.
  verificationTokenExpiresAt: Date,//? Define la fecha y hora en la que expira el verificationToken. -> Asegura que el token de verificación solo sea válido por un tiempo limitado.
},{timestamps: true}, { _id: true }) 

const PortfolioSchema = new mongoose.Schema({
  user: { type: userSchema, default: () => ({})},
  aboutMe: {
    bodyText: { type: TextSchema, default: () => ({}) },
  },
  certificates: [
    {
      name: { type: String, default: "" },
      image: { type: ImageSchema, default: () => ({}) },
      description: { type: TextSchema, default: () => ({}) },
    },
  ],
  contact: {
    mail: { type: TextSchema, default: () => ({}) },
    linkedin: { type: LinkSchema, default: () => ({}) },
    github: { type: LinkSchema, default: () => ({}) },
    location: { type: TextSchema, default: () => ({}) },
  },
  education: [
    {
      name: { type: String, default: "" },
      description: { type: String, default: "" },
      date: { type: DateSchema, default: () => ({}) },
    },
  ],
  experience: [
    {
      name: { type: String, default: "" },
      description: { type: String, default: "" },
      date: { type: DateSchema, default: () => ({}) },
    },
  ],
  presentation: {
    name: { type: String, default: "" },
    text: { type: TextSchema, default: () => ({}) },
    image: { type: ImageSchema, default: () => ({}) },
  },
  projects: [
    {
      name: { type: String, default: "" },
      description: { type: String, default: "" },
      image: { type: ImageSchema, default: () => ({}) },
    },
  ],
  technologies: [
    {
      name: { type: String, default: "" },
      image: { type: ImageSchema, default: () => ({}) },
    },
  ],
});

const Portfolio = mongoose.model("Portfolio", PortfolioSchema, "portfolio");

export default Portfolio;