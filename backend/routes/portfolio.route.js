import express from "express";
import multer from "multer";
import { verifyToken } from "../middleware/verifyToken.js";
import { authorizeOwner } from "../middleware/authorizeOwner.js";
import {
	getPresentation,
	editPresentationSection,

	getAboutMe,
	editAboutMe,

	getAllExperience,
	editExperienceSection,
	addExperience,
	editExperience,
	deleteExperience,

	getAllProjects,
	editProjectSection,
	addProject,
	editProject,
	deleteProject,

	getAllEducation,
	editEducationSection,
	addEducation,
	editEducation,
	deleteEducation,

	getAllCertificates,
	editCertificatesSection,
	addCertificate,
	editCertificate,
	deleteCertificate,

	getSelectedTechnologies,
	editTechnologiesSection,
	addTechnology,
	editTechnology,
	deleteTechnology,

	sendContactSectionEmail,
	getContact,
	editContactSection
} from "../controllers/portfolio.controller.js";

import {
	presentationImage,
	addProjectImage,
	editProjectImage,
} from '../middleware/images.js';

const router = express.Router();
const defaultMulter = multer()

// Presentation
router.get("/:userName/presentation", getPresentation);
router.put("/:userName/edit/presentation", verifyToken, authorizeOwner, presentationImage.single('image'), editPresentationSection);

// About Me
router.get("/:userName/aboutme", getAboutMe);
router.put("/:userName/edit/aboutMe", verifyToken, authorizeOwner, defaultMulter.none(), editAboutMe);

// Experience
router.get("/:userName/experience", getAllExperience);
router.put("/:userName/edit/experiencesection", verifyToken, authorizeOwner, defaultMulter.none(), editExperienceSection);
router.post("/:userName/add/experience", verifyToken, authorizeOwner, defaultMulter.none(), addExperience);
router.put("/:userName/edit/experience/:id", verifyToken, authorizeOwner, defaultMulter.none(), editExperience);
router.delete("/:userName/delete/experience/:id", verifyToken, authorizeOwner, deleteExperience);

// Projects
router.get("/:userName/projects", getAllProjects);
router.put("/:userName/edit/projectsection", verifyToken, authorizeOwner, defaultMulter.none(), editProjectSection);
router.post("/:userName/add/project", verifyToken, authorizeOwner, addProjectImage.single('image'), addProject);
router.put("/:userName/edit/project/:id", verifyToken, authorizeOwner, editProjectImage.single('image'), editProject);
router.delete("/:userName/delete/project/:id", verifyToken, authorizeOwner, deleteProject);

// Education
router.get("/:userName/education", getAllEducation);
router.put("/:userName/edit/educationsection", verifyToken, authorizeOwner, defaultMulter.none(), editEducationSection);
router.post("/:userName/add/education", verifyToken, authorizeOwner, defaultMulter.none(), addEducation);
router.put("/:userName/edit/education/:id", verifyToken, authorizeOwner, defaultMulter.none(), editEducation);
router.delete("/:userName/delete/education/:id", verifyToken, authorizeOwner, deleteEducation);

// Certificates
router.get("/:userName/certificates", getAllCertificates);
router.put("/:userName/edit/certificatessection", verifyToken, authorizeOwner, editCertificatesSection);
router.post("/:userName/add/certificate", verifyToken, authorizeOwner, addCertificate);
router.put("/:userName/edit/certificates/:id", verifyToken, authorizeOwner, editCertificate);
router.delete("/:userName/delete/certificate/:id", verifyToken, authorizeOwner, deleteCertificate);

// Techonologies
router.get("/:userName/technologies", getSelectedTechnologies);
router.put("/:userName/edit/technologiessection", verifyToken, authorizeOwner, editTechnologiesSection);
router.post("/:userName/add/technology", verifyToken, authorizeOwner, addTechnology);
router.put("/:userName/edit/technology/:id", verifyToken, authorizeOwner, editTechnology);
router.delete("/:userName/delete/technology/:id", verifyToken, authorizeOwner, deleteTechnology);

// Contact
router.post("/:userName/send-email", sendContactSectionEmail);
router.get("/:userName/get-contact-info", getContact);
router.put("/:userName/edit/contact", verifyToken, authorizeOwner, editContactSection);

export default router;