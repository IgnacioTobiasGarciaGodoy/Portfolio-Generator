import Portfolio from "../models/portfolio.model.js";
import { sendContactEmail } from "../nodemailer/emails.js";

//* About Me
export const getAboutMe = async (req, res) => {
  const { userName } = req.params;

  try {
    const userPortfolio = await Portfolio.findOne({
      "user.userName": userName,
    });

    if (!userPortfolio) {
      return res.status(404).json({
        success: false,
        message: "Portafolio no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      aboutMeSection: userPortfolio.aboutMeSection,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const editAboutMe = async (req, res) => {
  const { aboutMeSection } = req.body;
  const { userName } = req.params;

  try {
    const userPortfolio = await Portfolio.findOne({
      "user.userName": userName,
    });

    if (!userPortfolio) {
      return res
        .status(404)
        .json({ success: false, message: "Portfolio no encontrado" });
    }

    //TODO Validate data
    userPortfolio.aboutMeSection = aboutMeSection;
    await userPortfolio.save();

    res.status(200).json({
      success: true,
      message: "Seccion 'About Me' actualizada exitosamente",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//* Certificates
export const getAllCertificates = async (req, res) => {
  const { userName } = req.params;

  try {
    const userPortfolio = await Portfolio.findOne({
      "user.userName": userName,
    });

    if (!userPortfolio) {
      return res.status(404).json({
        success: false,
        message: "Portafolio no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      certificates: userPortfolio.certificates,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addCertificate = async (req, res) => {
  const { name, image, description } = req.body;
  const { userName } = req.params;

  try {
    const userPortfolio = await Portfolio.findOne({
      "user.userName": userName,
    });
    if (!userPortfolio) {
      return res.status(404).json({
        success: false,
        message: "Portafolio no encontrado",
      });
    }
    userPortfolio.certificates.push({ name, image, description });
    await userPortfolio.save();

    res.status(200).json({
      success: true,
      message: "Certificado añadido.",
      certificates: userPortfolio.certificates,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCertificate = async (req, res) => {
  const { id } = req.params;
  const { name, image, description } = req.body;
  const { userName } = req.params;

  try {
    const userPortfolio = await Portfolio.findOneAndUpdate(
      { "user.userName": userName, "certificates._id": id },
      { $set: { "certificates.$": { name, image, description } } },
      { new: true }
    );
    //! Tener en cuenta que cuando se actualiza, el ID del certificado cambia!

    res.status(200).json({
      success: true,
      message: "Certificado actualizado.",
      certificates: userPortfolio.certificates,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCertificate = async (req, res) => {
  const { id } = req.params;
  const { userName } = req.params;

  try {
    // Buscar el portafolio del usuario y eliminar el certificado usando `$pull`
    const userPortfolio = await Portfolio.findOneAndUpdate(
      { "user.userName": userName }, // Encontrar por el ID del usuario
      { $pull: { certificates: { _id: id } } }, // Eliminar el certificado por su id
      { new: true } // Retornar el documento actualizado
    );

    if (!userPortfolio) {
      return res.status(404).json({
        success: false,
        message: "Portafolio no encontrado.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Certificado eliminado.",
      certificates: userPortfolio.certificates,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
}

export const getContact = async (req, res) => {
  const { userName } = req.params;

  try {
    const userPortfolio = await Portfolio.findOne({
      "user.userName": userName,
    });

    if (!userPortfolio) {
      return res.status(404).json({
        success: false,
        message: "Portafolio no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      contact: userPortfolio.contact,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const editContact = async (req, res) => {
  const { mail, linkedin, github, location } = req.body;
  const { userName } = req.params;

  try {
    const userPortfolio = await Portfolio.findOne({
      "user.userName": userName,
    });
    if (!userPortfolio) {
      return res.status(404).json({
        success: false,
        message: "Portafolio no encontrado",
      });
    }

    userPortfolio.contact.mail = mail || userPortfolio.contact.mail;
    
    userPortfolio.contact.linkedin = linkedin || userPortfolio.contact.linkedin;
    
    userPortfolio.contact.github = github || userPortfolio.contact.github;
    
    userPortfolio.contact.location = location || userPortfolio.contact.location;

    await userPortfolio.save();

    res.status(200).json({
      success: true,
      message: "Información de contacto actualizada.",
      contact: userPortfolio.contact,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//* Education
export const getAllEducation = async (req, res) => {
  const { userName } = req.params;

  try {
    const userPortfolio = await Portfolio.findOne({
      "user.userName": userName,
    });

    if (!userPortfolio) {
      return res.status(404).json({
        success: false,
        message: "Portafolio no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      education: userPortfolio.education,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addEducation = async (req, res) => {
  const { name, description, date } = req.body;
  const { userName } = req.params;

  try {
    const userPortfolio = await Portfolio.findOne({
      "user.userName": userName,
    });
    if (!userPortfolio) {
      return res.status(404).json({
        success: false,
        message: "Portafolio no encontrado",
      });
    }

    userPortfolio.education.push({ name, description, date });
    await userPortfolio.save();

    res.status(200).json({
      success: true,
      message: "Educación añadida.",
      education: userPortfolio.education,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateEducation = async (req, res) => {
  const { id } = req.params;
  const { name, description, date } = req.body;
  const { userName } = req.params;

  try {
    const userPortfolio = await Portfolio.findOneAndUpdate(
      { "user.userName": userName, "education._id": id },
      {
        $set: {
          "education.$.name": name,
          "education.$.description": description,
          "education.$.date": date,
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Educación actualizada.",
      education: userPortfolio.education,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteEducation = async (req, res) => {
  const { id } = req.params;
  const { userName } = req.params;

  try {
    const userPortfolio = await Portfolio.findOneAndUpdate(
      { "user.userName": userName },
      { $pull: { education: { _id: id } } },
      { new: true }
    );

    if (!userPortfolio) {
      return res.status(404).json({
        success: false,
        message: "Portafolio no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      message: "Educación eliminada.",
      education: userPortfolio.education,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//* Experience
export const getAllExperience = async (req, res) => {
  const { userName } = req.params;

  try {
    const userPortfolio = await Portfolio.findOne({
      "user.userName": userName,
    });

    if (!userPortfolio) {
      return res.status(404).json({
        success: false,
        message: "Portafolio no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      experience: userPortfolio.experience,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addExperience = async (req, res) => {
  const { name, description, date } = req.body;
  const { userName } = req.params;

  try {
    const userPortfolio = await Portfolio.findOne({
      "user.userName": userName,
    });
    if (!userPortfolio) {
      return res.status(404).json({
        success: false,
        message: "Portafolio no encontrado",
      });
    }

    userPortfolio.experience.push({ name, description, date });
    await userPortfolio.save();

    res.status(200).json({
      success: true,
      message: "Experiencia añadida.",
      experience: userPortfolio.experience,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateExperience = async (req, res) => {
  const { id } = req.params;
  const { name, description, date } = req.body;
  const { userName } = req.params;

  try {
    const userPortfolio = await Portfolio.findOneAndUpdate(
      { "user.userName": userName, "experience._id": id },
      {
        $set: {
          "experience.$.name": name,
          "experience.$.description": description,
          "experience.$.date": date,
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Experiencia actualizada.",
      experience: userPortfolio.experience,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteExperience = async (req, res) => {
  const { id } = req.params;
  const { userName } = req.params;

  try {
    const userPortfolio = await Portfolio.findOneAndUpdate(
      { "user.userName": userName },
      { $pull: { experience: { _id: id } } },
      { new: true }
    );

    if (!userPortfolio) {
      return res.status(404).json({
        success: false,
        message: "Portafolio no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      message: "Experiencia eliminada.",
      experience: userPortfolio.experience,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//* Presentation
export const getPresentation = async (req, res) => {
  const { userName } = req.params;

  try {
    const userPortfolio = await Portfolio.findOne({
      "user.userName": userName,
    });

    if (!userPortfolio) {
      return res.status(404).json({
        success: false,
        message: "Portafolio no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      presentation: userPortfolio.presentation,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const editPresentation = async (req, res) => {
  const { userName } = req.params;
  const { name, text, image } = req.body;

  try {
    const userPortfolio = await Portfolio.findOne({
      "user.userName": userName,
    });

    if (!userPortfolio) {
      return res.status(404).json({
        success: false,
        message: "Portafolio no encontrado",
      });
    }

    if (name) userPortfolio.presentation.name = name;
    if (text) {
      userPortfolio.presentation.text = {
        text: text.text,
        isBold: text.isBold,
        size: text.size,
        color: text.color,
        font: text.font,
        isItalic: text.isItalic,
      };
    }
    if (image) {
      userPortfolio.presentation.image = {
        image: image.image,
      };
    }

    await userPortfolio.save();

    res.status(200).json({
      success: true,
      message: "Presentación actualizada.",
      presentation: userPortfolio.presentation,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//* Projects
export const getAllProjects = async (req, res) => {
  const { userName } = req.params;

  try {
    const userPortfolio = await Portfolio.findOne({
      "user.userName": userName,
    });

    if (!userPortfolio) {
      return res.status(404).json({
        success: false,
        message: "Portafolio no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      projects: userPortfolio.projects,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addProject = async (req, res) => {
  const { name, description, image, link } = req.body;
  const { userName } = req.params;

  try {
    const userPortfolio = await Portfolio.findOne({
      "user.userName": userName,
    });
    if (!userPortfolio) {
      return res.status(404).json({
        success: false,
        message: "Portafolio no encontrado",
      });
    }

    userPortfolio.projects.push({ name, description, image, link });
    await userPortfolio.save();

    res.status(200).json({
      success: true,
      message: "Proyecto añadido.",
      projects: userPortfolio.projects,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, description, image } = req.body;
  const { userName } = req.params;

  try {
    const userPortfolio = await Portfolio.findOneAndUpdate(
      { "user.userName": userName, "projects._id": id },
      {
        $set: {
          "projects.$.name": name,
          "projects.$.description": description,
          "projects.$.image": image,
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Proyecto actualizado.",
      projects: userPortfolio.projects,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  const { userName } = req.params;

  try {
    const userPortfolio = await Portfolio.findOneAndUpdate(
      { "user.userName": userName },
      { $pull: { projects: { _id: id } } },
      { new: true }
    );

    if (!userPortfolio) {
      return res.status(404).json({
        success: false,
        message: "Portafolio no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      message: "Proyecto eliminado.",
      projects: userPortfolio.projects,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//* Technologies
export const getSelectedTechnologies = async (req, res) => {
  const { userName } = req.params;

  try {
    const userPortfolio = await Portfolio.findOne({
      "user.userName": userName,
    });

    if (!userPortfolio) {
      return res.status(404).json({
        success: false,
        message: "Portafolio no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      technologies: userPortfolio.technologies,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addTechnology = async (req, res) => {
  const { name } = req.body;
  const { userName } = req.params;

  try {
    const userPortfolio = await Portfolio.findOne({
      "user.userName": userName,
    });

    if (!userPortfolio) {
      return res.status(404).json({
        success: false,
        message: "Portafolio no encontrado",
      });
    }

    if (userPortfolio.technologies.some(tech => tech.name === name)) {
      return res.status(400).json({
        success: false,
        message: "La tecnología ya está seleccionada.",
      });
    }

    userPortfolio.technologies.push({ name });
    await userPortfolio.save();

    res.status(200).json({
      success: true,
      message: "Tecnología añadida.",
      technologies: userPortfolio.technologies,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeTechnology = async (req, res) => {
  const { name } = req.body;
  const { userName } = req.params;

  try {
    const userPortfolio = await Portfolio.findOneAndUpdate(
      { "user.userName": userName },
      { $pull: { technologies: { name } } },
      { new: true }
    );

    if (!userPortfolio) {
      return res.status(404).json({
        success: false,
        message: "Portafolio no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tecnología eliminada.",
      technologies: userPortfolio.technologies,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
