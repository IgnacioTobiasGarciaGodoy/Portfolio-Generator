import mongoose from "mongoose";

const TextSchema = new mongoose.Schema({
	text: { type: String, default: "Esto es el texto por default!" },
	isBlack: { type: Boolean, default: true },
	size: { type: Number, default: 12 },
});

const LinkSchema = new mongoose.Schema({
	text: { type: String, default: "esto es un link" },
	link: { type: String, default: "google.com" },
	isBlack: { type: Boolean, default: true },
	size: { type: Number, default: 12 },
});

const DateSchema = new mongoose.Schema({
	from: { type: String, default: "20/12/2022" },
	to: { type: String, default: "present" },
	isBlack: { type: Boolean, default: true },
	size: { type: Number, default: 12 },
});

const ImageSchema = new mongoose.Schema({
	image: { type: String, default: "Default Image" },
});

const PortfolioSchema = new mongoose.Schema({
	user: {
		userName: { type: String, required: true, unique: true},
		email: { type: String, required: true, unique: true},
		hashPassword: { type: String, required: true, },
	},
	aboutMe: {
		titleText: { type: TextSchema, default: () => ({}) },
		bodyText: { type: TextSchema, default: () => ({}) }
	},
	certificates: [{
		name: { type: String, default: "" },
    image: { type: ImageSchema, default: () => ({}) },
		description: { type: TextSchema, default: () => ({}) }
	}],
	contact: {
		mail: { type: TextSchema, default: () => ({}) },
		linkedin: { type: LinkSchema, default: () => ({}) },
		github: { type: LinkSchema, default: () => ({}) },
		location: { type: TextSchema, default: () => ({}) }
	},
	education: [{
		name: { type: String, default: "" },
		description: { type: String, default: "" },
    date: { type: DateSchema, default: () => ({})}
	}],
	experience: [{
		name: { type: String, default: "" },
		description: { type: String, default: "" },
    date: { type: DateSchema, default: () => ({})}
	}],
	presentation: {
		name: { type: String, default: "" },
		text: { type: TextSchema, default: () => ({}) },
		image: { type: ImageSchema, default: () => ({}) },
	},
	projects: [{
		name: { type: String, default: "" },
		description: { type: String, default: "" },
    image: { type: ImageSchema, default: () => ({}) },
	}],
	technologies: [{
		name: { type: String, default: "" },
		image: { type: ImageSchema, default: () => ({}) },
	}]
});

const Portfolio = mongoose.model("Portfolio", PortfolioSchema, 'portfolio');

export default Portfolio;