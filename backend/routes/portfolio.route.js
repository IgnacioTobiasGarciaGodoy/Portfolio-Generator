import express from "express";
import multer from "multer";
import { verifyToken } from "../middleware/verifyToken.js";
import { authorizeOwner } from "../middleware/authorizeOwner.js";
import {
	editPresentationSection,
	editAboutMe,
	editProjectSection,
	addProject,
	editProject,
	getSection,
	deleteSectionItem,
	addCareerItem,
	editCareerItem,
	addSkill,
	deleteSkill
} from "../controllers/portfolio.controller.js";

import {
	presentationImage,
	addProjectImage,
	editProjectImage,
} from '../middleware/images.js';

import {
  presentation,
  aboutMe,
  career,
  project,
  skills,
} from "../models/portfolio.model.js";

const router = express.Router();
const defaultMulter = multer()

// Presentation
router.get("/:userName/presentation", (req, res) => getSection(req, res, presentation.section));
router.put("/:userName/edit/presentation", verifyToken, authorizeOwner, presentationImage.single("image"), editPresentationSection);

// About Me
router.get("/:userName/aboutme", (req, res) => getSection(req, res, aboutMe.section));
router.put("/:userName/edit/aboutme", verifyToken, authorizeOwner, defaultMulter.none(), editAboutMe);

// Career
router.get("/:userName/career", (req, res) => getSection(req, res, career.section));
router.post("/:userName/add/career", verifyToken, authorizeOwner, defaultMulter.none(), addCareerItem);
router.put("/:userName/edit/career/:id", verifyToken, authorizeOwner, defaultMulter.none(), editCareerItem);
router.delete("/:userName/delete/career/:id", verifyToken, authorizeOwner, (req, res) => deleteSectionItem(req, res, career.section, career.subSection));

// Projects
router.get("/:userName/projects", (req, res) => getSection(req, res, project.section));
router.put("/:userName/edit/projectsection", verifyToken, authorizeOwner, defaultMulter.none(), editProjectSection);
router.post("/:userName/add/project", verifyToken, authorizeOwner, addProjectImage.single("image"), addProject);
router.put("/:userName/edit/project/:id", verifyToken, authorizeOwner, editProjectImage.single("image"), editProject);
router.delete("/:userName/delete/project/:id", verifyToken, authorizeOwner, (req, res) => deleteSectionItem(req, res, project.section, project.subSection));

// Skills
router.get("/:userName/skills", (req, res) => getSection(req, res, skills.section));
router.post("/:userName/add/skill", verifyToken, authorizeOwner, defaultMulter.none(), addSkill);
router.delete("/:userName/delete/skill", verifyToken, authorizeOwner, defaultMulter.none(), deleteSkill);

export default router;