import Portfolio from "../models/portfolio.model.js";
import fs from "fs";
import path from 'path';

class PortfolioError extends Error {
	constructor(status, message) {
		super(message);
		this.status = status;
	}
}

const findPortfolioByUserName = async (userName) => {
	const userPortfolio = await Portfolio.findOne({ "user.userName": userName });
	if (!userPortfolio) {
		throw new PortfolioError(404, "Portafolio no encontrado");
	}
	return userPortfolio;
}

//* Presentation
export const getPresentation = async (req, res) => {
	const { userName } = req.params;
	try {
		const userPortfolio = await findPortfolioByUserName(userName);
		res.status(200).json({ presentationSection: userPortfolio.presentationSection });
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message });
	}
};

export const editPresentationSection = async (req, res) => {
	const { userName } = req.params;

	try {
		const userPortfolio = await findPortfolioByUserName(userName);

		const presentationSection = JSON.parse(req.body.presentationSection);

		userPortfolio.presentationSection.name = presentationSection.name;
		userPortfolio.presentationSection.rol = presentationSection.rol;
		userPortfolio.presentationSection.image.url = req.imagePath;

		await userPortfolio.save();

		res.status(200).json({ message: "Sección 'Presentation' actualizada exitosamente" });
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message });
	}
};

//* About Me
export const getAboutMe = async (req, res) => {
	const { userName } = req.params;
	try {
		const userPortfolio = await findPortfolioByUserName(userName);
		res.status(200).json({ aboutMeSection: userPortfolio.aboutMeSection });
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message });
	}
};

export const editAboutMe = async (req, res) => {
	const { userName } = req.params;

	try {
		const userPortfolio = await findPortfolioByUserName(userName);

		const aboutMeSection = JSON.parse(req.body.aboutMeSection);

		userPortfolio.aboutMeSection.sectionTitle.text = aboutMeSection.sectionTitle.text;
		userPortfolio.aboutMeSection.bodyText.text = aboutMeSection.bodyText.text;

		await userPortfolio.save();

		res.status(200).json({
			message: "Sección 'About Me' actualizada exitosamente"
		});
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message });
	}
};

//* Experience
export const getAllExperience = async (req, res) => {
	const { userName } = req.params;
	try {
		const userPortfolio = await findPortfolioByUserName(userName);
		res.status(200).json({ experienceSection: userPortfolio.experienceSection });
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message });
	}
};

export const editExperienceSection = async (req, res) => {
	const { userName } = req.params;

	try {
		const userPortfolio = await findPortfolioByUserName(userName);

		const experienceSection = JSON.parse(req.body.experienceSection);
		userPortfolio.experienceSection.sectionTitle.text = experienceSection.sectionTitle.text;

		await userPortfolio.save();

		res.status(200).json({ message: "Sección 'Experience' actualizada exitosamente" });
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message });
	}
};

export const addExperience = async (req, res) => {
	const { userName } = req.params;

	try {
		const userPortfolio = await findPortfolioByUserName(userName);

		const experienceSection = JSON.parse(req.body.experienceSection);

		userPortfolio.experienceSection.experiences.push({
			workName: { text: experienceSection.experience.workName.text },
			description: { text: experienceSection.experience.description.text },
			date: { from: experienceSection.experience.date.from, to: experienceSection.experience.date.to }
		});

		await userPortfolio.save();

		res.status(201).json({
			message: "Experiencia agregada exitosamente",
		});
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message });
	}
};

export const editExperience = async (req, res) => {
	const { id } = req.params;
	const { userName } = req.params;
	try {
		const userPortfolio = await Portfolio.findOne({ "user.userName": userName });
		const experience = userPortfolio.experienceSection.experiences.id(id);
		if (!experience) {
			return res.status(404).json({ message: "Experiencia no encontrada" });
		}

		const experienceSection = JSON.parse(req.body.experienceSection);

		experience.workName.text = experienceSection.experience.workName.text || experience.workName.text;
		experience.description.text = experienceSection.experience.description.text || experience.description.text;
		experience.date = { from: experienceSection.experience.date.from, to: experienceSection.experience.date.to } || experience.date;

		await userPortfolio.save();
		res.status(200).json({ message: "Experiencia actualizada exitosamente" });
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message });
	}
};

export const deleteExperience = async (req, res) => {
	const { id } = req.params;
	const { userName } = req.params;
	try {
		const userPortfolio = await Portfolio.findOneAndUpdate(
			{ "user.userName": userName },
			{ $pull: { "experienceSection.experiences": { _id: id } } },
			{ new: true }
		);
		if (!userPortfolio) {
			return res.status(404).json({ message: "Portafolio no encontrado" });
		}
		res.status(200).json({ message: "Experiencia eliminada", experienceSection: userPortfolio.experienceSection });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

//* Projects
export const getAllProjects = async (req, res) => {
	const { userName } = req.params;
	try {
		const userPortfolio = await findPortfolioByUserName(userName);
		res.status(200).json({ projectSection: userPortfolio.projectSection });
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message });
	}
};

export const editProjectSection = async (req, res) => {
	const { userName } = req.params;

	try {
		const userPortfolio = await findPortfolioByUserName(userName);

		const projectSection = JSON.parse(req.body.projectSection);
		userPortfolio.projectSection.sectionTitle.text = projectSection.sectionTitle.text;

		await userPortfolio.save();

		res.status(200).json({ message: "Sección 'Projects' actualizada exitosamente" });
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message });
	}
};

export const addProject = async (req, res) => {
	const { userName } = req.params;

	try {
		const userPortfolio = await findPortfolioByUserName(userName);

		const projectSection = JSON.parse(req.body.projectSection);

		userPortfolio.projectSection.projects.push({
			name: projectSection.name,
			description: projectSection.description,
			demoLink: projectSection.demoLink,
			gitHubLink: projectSection.gitHubLink,
		});

		await userPortfolio.save();

		const project = userPortfolio.projectSection.projects[userPortfolio.projectSection.projects.length - 1];
		const projectId = project._id;

		const ext = path.extname(req.imagePath)
		const dir = path.dirname(req.imagePath);
		const newPath = `${dir}/${userName}-${projectId}${ext}`;
		fs.rename(req.imagePath, newPath, err => {
			if (err) {
				return res.status(500).json({ message: 'Error renaming image', error: err });
			}
			project.image.url = newPath;
			userPortfolio.save()
				.then(() => {
					res.status(200).json({
						message: 'Projecto agregado exitosamente',
					});
				})
				.catch(err => {
					res.status(500).json({ message: 'Error agregando proyecto', error: err });
				});;
		})
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message });
	}
};

export const editProject = async (req, res) => {
	const { id } = req.params;
	const { name, description, image, demoLink, gitHubLink } = req.body;
	const { userName } = req.params;
	try {
		const userPortfolio = await Portfolio.findOne({ "user.userName": userName });
		const project = userPortfolio.projectSection.projects.id(id);
		if (!project) {
			return res.status(404).json({ message: "Proyecto no encontrado" });
		}
		project.name = name || project.name;
		project.description = description || project.description;
		project.image = image || project.image;
		project.demoLink = demoLink || project.demoLink;
		project.gitHubLink = gitHubLink || project.gitHubLink;
		await userPortfolio.save();
		res.status(200).json({ message: "Proyecto actualizado", projectSection: userPortfolio.projectSection });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const deleteProject = async (req, res) => {
	const { id } = req.params;
	const { userName } = req.params;
	try {
		const userPortfolio = await Portfolio.findOneAndUpdate(
			{ "user.userName": userName },
			{ $pull: { "projectSection.projects": { _id: id } } },
			{ new: true }
		);
		if (!userPortfolio) {
			return res.status(404).json({ message: "Portafolio no encontrado" });
		}
		res.status(200).json({ message: "Proyecto eliminado", projectSection: userPortfolio.projectSection });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

//* Education
export const getAllEducation = async (req, res) => {
	const { userName } = req.params;
	try {
		const userPortfolio = await findPortfolioByUserName(userName);
		res.status(200).json({ educationSection: userPortfolio.educationSection });
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message });
	}
};

export const editEducationSection = async (req, res) => {
	const { educationSection } = req.body;
	const { userName } = req.params;

	try {
		const userPortfolio = await findPortfolioByUserName(userName);

		userPortfolio.educationSection.sectionTitle = educationSection.sectionTitle;

		await userPortfolio.save();

		res.status(200).json({ message: "Sección 'Educación' actualizada exitosamente", });
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message });
	}
};

export const addEducation = async (req, res) => {
	const { education } = req.body;
	const { userName } = req.params;

	try {
		const userPortfolio = await findPortfolioByUserName(userName);

		userPortfolio.educationSection.educations.push({
			name: education.name,
			description: education.description,
			date: education.date,
		});

		await userPortfolio.save();

		res.status(201).json({ message: "Educación agregada exitosamente" });
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message });
	}
};

export const editEducation = async (req, res) => {
	const { id } = req.params;
	const { name, description, date } = req.body;
	const { userName } = req.params;
	try {
		const userPortfolio = await Portfolio.findOne({
			"user.userName": userName,
		});
		const education = userPortfolio.educationSection.educations.id(id);
		if (!education) {
			return res.status(404).json({ message: "Educación no encontrada" });
		}
		education.name = name || education.name;
		education.description = description || education.description;
		education.date = date || education.date;
		await userPortfolio.save();
		res.status(200).json({
			message: "Educación actualizada",
			educationSection: userPortfolio.educationSection,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const deleteEducation = async (req, res) => {
	const { id } = req.params;
	const { userName } = req.params;
	try {
		const userPortfolio = await Portfolio.findOneAndUpdate(
			{ "user.userName": userName },
			{ $pull: { "educationSection.educations": { _id: id } } },
			{ new: true }
		);
		if (!userPortfolio) {
			return res.status(404).json({ message: "Portafolio no encontrado" });
		}
		res.status(200).json({ message: "Educación eliminada" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

//* Certificates
export const getAllCertificates = async (req, res) => {
	const { userName } = req.params;
	try {
		const userPortfolio = await findPortfolioByUserName(userName);
		res.status(200).json({ certificateSection: userPortfolio.certificateSection });
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message });
	}
};

export const editCertificatesSection = async (req, res) => {
	const { certificatesSection } = req.body;
	const { userName } = req.params;

	try {
		const userPortfolio = await findPortfolioByUserName(userName);

		userPortfolio.certificateSection.sectionTitle = certificatesSection.sectionTitle;

		await userPortfolio.save();

		res.status(200).json({ message: "Sección 'Certificados' actualizada exitosamente" });
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message });
	}
};

export const addCertificate = async (req, res) => {
	const { certificate } = req.body;
	const { userName } = req.params;

	try {
		const userPortfolio = await findPortfolioByUserName(userName);

		userPortfolio.certificateSection.certificates.push({
			name: certificate.name,
			image: certificate.image,
			description: certificate.description,
		});

		await userPortfolio.save();

		res.status(201).json({ message: "Certificado agregado exitosamente" });
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message });
	}
};

export const editCertificate = async (req, res) => {
	const { id } = req.params;
	const { name, image, description } = req.body;
	const { userName } = req.params;
	try {
		const userPortfolio = await Portfolio.findOne({
			"user.userName": userName,
		});
		const certificate =
			userPortfolio.certificateSection.certificates.id(id);
		if (!certificate) {
			return res.status(404).json({ message: "Certificado no encontrado" });
		}
		certificate.name = name || certificate.name;
		certificate.image = image || certificate.image;
		certificate.description = description || certificate.description;
		await userPortfolio.save();
		res.status(200).json({
			message: "Certificado actualizado",
			certificateSection: userPortfolio.certificateSection,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const deleteCertificate = async (req, res) => {
	const { id } = req.params;
	const { userName } = req.params;
	try {
		const userPortfolio = await Portfolio.findOneAndUpdate(
			{ "user.userName": userName },
			{ $pull: { "certificateSection.certificates": { _id: id } } },
			{ new: true }
		);
		if (!userPortfolio) {
			return res.status(404).json({ message: "Portafolio no encontrado" });
		}
		res.status(200).json({
			message: "Certificado eliminado",
			certificateSection: userPortfolio.certificateSection,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

//* Technologies
export const getSelectedTechnologies = async (req, res) => {
	const { userName } = req.params;
	try {
		const userPortfolio = await findPortfolioByUserName(userName);
		res.status(200).json({ technologySection: userPortfolio.technologySection });
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message });
	}
};

export const editTechnologiesSection = async (req, res) => {
	const { technologiesSection } = req.body;
	const { userName } = req.params;

	try {
		const userPortfolio = await findPortfolioByUserName(userName);

		userPortfolio.technologySection.sectionTitle = technologiesSection.sectionTitle;

		await userPortfolio.save();

		res.status(200).json({ message: "Sección 'Technologies' actualizada exitosamente" });
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message });
	}
};

export const addTechnology = async (req, res) => {
	const { technology } = req.body;
	const { userName } = req.params;

	try {
		const userPortfolio = await findPortfolioByUserName(userName);

		userPortfolio.technologySection.technologies.push({
			name: technology.name,
			image: technology.image,
		});

		await userPortfolio.save();

		res.status(201).json({ message: "Tecnología agregada exitosamente" });
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message });
	}
};

export const editTechnology = async (req, res) => {
}

export const deleteTechnology = async (req, res) => {
	const { id } = req.params;
	const { userName } = req.params;
	try {
		const userPortfolio = await Portfolio.findOneAndUpdate(
			{ "user.userName": userName },
			{ $pull: { "technologySection.technologies": { _id: id } } },
			{ new: true }
		);
		if (!userPortfolio) {
			return res.status(404).json({ message: "Portafolio no encontrado" });
		}
		res.status(200).json({ message: "Tecnología eliminada", technologySection: userPortfolio.technologySection });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

//* Contact
export const sendContactSectionEmail = async (req, res) => {
	const { name, email, subject, message, userEmail } = req.body;
	try {
		sendContactEmail(name, email, subject, message, userEmail);
		res.status(200).json({ message: "Email de contacto enviado exitosamente" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getContact = async (req, res) => {
	const { userName } = req.params;
	try {
		const userPortfolio = await findPortfolioByUserName(userName);
		res.status(200).json({ contactSection: userPortfolio.contactSection });
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message });
	}
};

export const editContactSection = async (req, res) => {
	const { contactSection } = req.body;
	const { userName } = req.params;

	try {
		const userPortfolio = await findPortfolioByUserName(userName);

		userPortfolio.contactSection = contactSection;
		await userPortfolio.save();

		res.status(200).json({ message: "Información de contacto actualizada exitosamente" });
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message });
	}
};
