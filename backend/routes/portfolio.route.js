import express from "express";
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
	updateExperience,
	deleteExperience,

	getAllEducation,
	editEducationSection,
	addEducation,
	updateEducation,
	deleteEducation,

	getAllCertificates,
	editCertificatesSection,
	addCertificate,
	updateCertificate,
	deleteCertificate,

	getSelectedTechnologies,
	editTechnologiesSection,
	addTechnology,
	deleteTechnology,

	getAllProjects,
	editProjectsSection,
	addProject,
	updateProject,
	deleteProject,

	sendContactSectionEmail,
	getContact,
	editContactSection,
} from "../controllers/portfolio.controller.js";

import
	presentationImage
from '../middleware/images.js';


const router = express.Router();

// Presentation
router.get("/:userName/presentation", getPresentation);
router.put("/:userName/edit/presentation", verifyToken, authorizeOwner, presentationImage.single('image'), editPresentationSection);

// About Me
router.get("/:userName/aboutme", getAboutMe);
router.put("/:userName/edit/aboutMe", verifyToken, authorizeOwner, editAboutMe);

// Experience
router.get("/:userName/experience", getAllExperience);
router.put("/:userName/edit/experiencesection", verifyToken, authorizeOwner, editExperienceSection);
router.post("/:userName/add/experience", verifyToken, authorizeOwner, addExperience);
router.put("/:userName/update/experience/:id", verifyToken, authorizeOwner, updateExperience);
router.delete("/:userName/delete/experience/:id", verifyToken, authorizeOwner, deleteExperience);

// Projects
router.get("/:userName/projects", getAllProjects);
router.put("/:userName/edit/projectssection", verifyToken, authorizeOwner, editProjectsSection);
router.post("/:userName/add/project", verifyToken, authorizeOwner, addProject);
router.put("/:userName/update/project/:id", verifyToken, authorizeOwner, updateProject);
router.delete("/:userName/delete/project/:id", verifyToken, authorizeOwner, deleteProject);

// Education
router.get("/:userName/education", getAllEducation);
router.put("/:userName/edit/educationsection", verifyToken, authorizeOwner, editEducationSection);
router.post("/:userName/add/education", verifyToken, authorizeOwner, addEducation);
router.put("/:userName/update/education/:id", verifyToken, authorizeOwner, updateEducation);
router.delete("/:userName/delete/education/:id", verifyToken, authorizeOwner, deleteEducation);

// Certificates
router.get("/:userName/certificates", getAllCertificates);
router.put("/:userName/edit/certificatessection", verifyToken, authorizeOwner, editCertificatesSection);
router.post("/:userName/add/certificate", verifyToken, authorizeOwner, addCertificate);
router.put("/:userName/update/certificates/:id", verifyToken, authorizeOwner, updateCertificate);
router.delete("/:userName/delete/certificate/:id", verifyToken, authorizeOwner, deleteCertificate);

// Techonologies
router.get("/:userName/technologies", getSelectedTechnologies);
router.put("/:userName/edit/technologiessection", verifyToken, authorizeOwner, editTechnologiesSection);
router.post("/:userName/add/technology", verifyToken, authorizeOwner, addTechnology);
router.delete("/:userName/delete/technology/:id", verifyToken, authorizeOwner, deleteTechnology);

// Contact
router.post("/:userName/send-email", sendContactSectionEmail);
router.get("/:userName/get-contact-info", getContact);
router.put("/:userName/edit/contact", verifyToken, authorizeOwner, editContactSection);

export default router;