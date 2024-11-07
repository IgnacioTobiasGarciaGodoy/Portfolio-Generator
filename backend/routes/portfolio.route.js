import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { authorizeOwner } from "../middleware/authorizeOwner.js";
import { 
  getAboutMe,
  editAboutMe,
  getAllCertificates,
  editCertificatesSection,
  addCertificate,
  updateCertificate,
  deleteCertificate,
  sendContactSectionEmail,
  getContact,
  editContactSection,
  getAllEducation,
  editEducationSection,
  addEducation, 
  updateEducation,
  deleteEducation,
  getAllExperience,
  addExperience,
  updateExperience,
  editExperienceSection,
  deleteExperience,
  getPresentation,
  editPresentationSection,
  getAllProjects,
  editProjectsSection,
  addProject,
  updateProject,
  deleteProject,
  getSelectedTechnologies,
  editTechnologiesSection,
  addTechnology,
  deleteTechnology
 } from "../controllers/portfolio.controller.js";

const router = express.Router();

// About Me
router.get("/:userName/aboutme", getAboutMe);
router.put("/:userName/edit/aboutMe", verifyToken, authorizeOwner, editAboutMe);

// Certificates
router.get("/:userName/certificates", getAllCertificates);
router.put("/:userName/edit/certificatessection", verifyToken, authorizeOwner, editCertificatesSection);
router.post("/:userName/add/certificate", verifyToken, authorizeOwner, addCertificate);
router.put("/:userName/update/certificates/:id", verifyToken, authorizeOwner, updateCertificate);
router.delete("/:userName/delete/certificate/:id", verifyToken, authorizeOwner, deleteCertificate);

// Contact
router.post("/:userName/send-email", sendContactSectionEmail);
router.get("/:userName/get-contact-info", getContact);
router.put("/:userName/edit/contact", verifyToken, authorizeOwner, editContactSection);

// Education
router.get("/:userName/education", getAllEducation);
router.put("/:userName/edit/educationsection", verifyToken, authorizeOwner, editEducationSection);
router.post("/:userName/add/education", verifyToken, authorizeOwner, addEducation);
router.put("/:userName/update/education/:id", verifyToken, authorizeOwner, updateEducation);
router.delete("/:userName/delete/education/:id", verifyToken, authorizeOwner, deleteEducation);

// Experience
router.get("/:userName/experience", getAllExperience);
router.put("/:userName/edit/experiencesection", verifyToken, authorizeOwner, editExperienceSection);
router.post("/:userName/add/experience", verifyToken, authorizeOwner, addExperience);
router.put("/:userName/update/experience/:id", verifyToken, authorizeOwner, updateExperience);
router.delete("/:userName/delete/experience/:id", verifyToken, authorizeOwner, deleteExperience);

// Presentation
router.get("/:userName/presentation", getPresentation);
router.put("/:userName/edit/presentation", verifyToken, authorizeOwner, editPresentationSection);

// Projects
router.get("/:userName/projects", getAllProjects);
router.put("/:userName/edit/projectssection", verifyToken, authorizeOwner, editProjectsSection);
router.post("/:userName/add/project", verifyToken, authorizeOwner, addProject);
router.put("/:userName/update/project/:id", verifyToken, authorizeOwner, updateProject);
router.delete("/:userName/delete/project/:id", verifyToken, authorizeOwner, deleteProject);

// Techonologies
router.get("/:userName/technologies", getSelectedTechnologies);
router.put("/:userName/edit/technologiessection", verifyToken, authorizeOwner, editTechnologiesSection);
router.post("/:userName/add/technology", verifyToken, authorizeOwner, addTechnology);
router.delete("/:userName/delete/technology/:id", verifyToken, authorizeOwner, deleteTechnology);

export default router;