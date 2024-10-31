import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { 
  getAboutMe,
  editAboutMe,
  getAllCertificates,
  addCertificate,
  updateCertificate,
  deleteCertificate,
  sendContactSectionEmail,
  getContact,
  editContact,
  getAllEducation,
  addEducation, 
  updateEducation,
  deleteEducation,
  getAllExperience,
  addExperience,
  updateExperience,
  deleteExperience,
  getPresentation,
  editPresentation,
  getAllProjects,
  addProject,
  updateProject,
  deleteProject,
  getSelectedTechnologies,
  addTechnology,
  removeTechnology
 } from "../controllers/portfolio.controller.js";

const router = express.Router();

// About Me
router.get("/:userName/aboutme", getAboutMe);
router.put("/:userName/edit/aboutMe", verifyToken, editAboutMe);

// Certificates
router.get("/:userName/certificates", getAllCertificates);
router.post("/edit/certificates", addCertificate);
router.put("/edit/certificates/:id", updateCertificate);
router.delete("/edit/certificates/:id", deleteCertificate);

// Contact
router.post("/:userName/send-email", sendContactSectionEmail);
router.get("/:userName/get-contact-info", getContact);
router.put("/:userName/edit/contact", verifyToken, editContact);

// Education
router.get("/:userName/education", getAllEducation);
router.post("/edit/education", addEducation);
router.put("/edit/education/:id", updateEducation);
router.delete("/edit/education/:id", deleteEducation);

// Experience
router.get("/:userName/experience", getAllExperience);
router.post("/edit/experience", addExperience);
router.put("/edit/experience/:id", updateExperience);
router.delete("/edit/experience/:id", deleteExperience);

// Presentation
router.get("/:userName/presentation", getPresentation);
router.put("/edit/presentation", editPresentation);

// Projects
router.get("/:userName/projects", getAllProjects);
router.post("/edit/projects", addProject);
router.put("/edit/projects/:id", updateProject);
router.delete("/edit/projects/:id", deleteProject);

// Techonologies
router.get("/:userName/technologies", getSelectedTechnologies);
router.post("/edit/technologies", addTechnology);
router.delete("/edit/technologies/:id", removeTechnology);

export default router;