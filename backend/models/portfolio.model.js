import mongoose from "mongoose";

const urlRegex = /^https?:\/\/.+/i;
const yearOrPresent = (v) => v === "Presente" || /^\d{4}$/.test(v);

const PresentationSectionSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  role: { type: String, trim: true },
  photoUrl: { type: String, trim: true, validate: { validator: v => !v || urlRegex.test(v), message: "photoUrl inválida" } },
  githubUrl: { type: String, trim: true, lowercase: true, validate: { validator: v => !v || urlRegex.test(v), message: "githubUrl inválida" } },
  linkedinUrl: { type: String, trim: true, lowercase: true, validate: { validator: v => !v || urlRegex.test(v), message: "linkedinUrl inválida" } },
}, { _id: false });

const AboutMeSectionSchema = new mongoose.Schema({
  text: { type: String, required: true, trim: true }, // Obligatorio
}, { _id: false });

const CareerItemSchema = new mongoose.Schema({
  kind: { type: String, enum: ["experience", "education"], required: true },
  organization: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },                       
  startYear: {
    type: String,
    required: true,
    validate: { validator: yearOrPresent, message: "startYear debe ser 'Presente' o YYYY" },
  },
  endYear: {
    type: String,
    required: true,
    validate: { validator: yearOrPresent, message: "endYear debe ser 'Presente' o YYYY" },
  },
  description: { type: String, required: true, trim: true },
}, { _id: true });

const ProjectItemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  demoUrl: { type: String, trim: true, validate: { validator: v => !v || urlRegex.test(v), message: "demoUrl inválida" } },
  githubUrl: { type: String, trim: true, lowercase: true, validate: { validator: v => !v || urlRegex.test(v), message: "githubUrl inválida" } },
  technologies: { type: [String], default: [], validate: { validator: arr => Array.isArray(arr) && arr.every(s => typeof s === "string"), message: "technologies debe ser array de strings" } },
  imageUrl: { type: String, trim: true },
}, { _id: true });

const SkillsSectionSchema = new mongoose.Schema({
  skills: {
    type: [String],
    default: [],
    validate: { validator: arr => Array.isArray(arr) && arr.every(s => typeof s === "string"), message: "skills debe ser array de strings" }
  }
}, { _id: false });

const PortfolioSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },

  presentationSection: {
    type: PresentationSectionSchema,
    required: true,
    default: () => ({ fullName: "Nombre y Apellido" })
  },

  aboutMeSection: {
    type: AboutMeSectionSchema,
    required: true,
    default: () => ({ text: "Breve descripción sobre mí." })
  },

 careerSection: {
    items: { type: [CareerItemSchema], default: [] },
  },

  projectSection: {
    projects: { type: [ProjectItemSchema], default: [] }
  },

  skillsSection: {
    type: SkillsSectionSchema,
    default: () => ({ skills: [] })
  }

}, { timestamps: true });

const Portfolio = mongoose.model("Portfolio", PortfolioSchema, "portfolio");

export const presentation = { section: "presentationSection" };
export const aboutMe = { section: "aboutMeSection" };
export const career = { section: "careerSection", subSection: "items" };
export const project = { section: "projectSection", subSection: "projects" };
export const skills  = { section: "skillsSection", subSection: "skills" };

export default Portfolio;