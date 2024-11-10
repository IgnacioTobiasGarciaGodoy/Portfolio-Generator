import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://localhost:4000/portfolio";
axios.defaults.withCredentials = true;

export const usePortfolioStore = create(set => ({
  aboutMeSection: null,
  certificateSection: null,
  contactSection: null,
  educationSection: null,
  experienceSection: null,
  presentationSection: null,
  projectSection: null,
  technologySection: null,
  isLoading: false,
  error: null,

  //* Funciones para PresentationSection
  fetchPresentationSection: async userName => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `${API_URL}/${userName}/presentation`
      );
      set({
        presentationSection: response.data.presentationSection,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Error obteniendo la presentación",
        isLoading: false,
      });
    }
  },

  editPresentationSection: async (userName, presentationSection) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      formData.append('presentationSection', JSON.stringify(presentationSection));
  
      await axios.put(`${API_URL}/${userName}/edit/presentation`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      set({
        presentationSection,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Error editando Presentation",
        isLoading: false,
      });
    }
  },

  //* Funciones para AboutMeSection
  fetchAboutMeSection: async userName => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `${API_URL}/${userName}/aboutme`
      );
      set({
        aboutMeSection: response.data.aboutMeSection,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Error obteniendo About Me",
        isLoading: false,
      });
    }
  },

  editAboutMeSection: async (userName, aboutMeSection) => {
    set({ isLoading: true, error: null });
    try {
      await axios.put(`${API_URL}/${userName}/edit/aboutMe`, {
        aboutMeSection,
      });
      set({
        aboutMeSection,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message || "Error editando About Me",
        isLoading: false,
      });
    }
  },

  //* Funciones para CertificateSection
  fetchCertificateSection: async userName => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `${API_URL}/${userName}/certificates`
      );
      set({
        certificateSection: response.data.certificateSection,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Error obteniendo certificados",
        isLoading: false,
      });
    }
  },

  editCertificatesSection: async (userName, certificatesSection) => {
    set({ isLoading: true, error: null });
    try {
      await axios.put(
        `${API_URL}/${userName}/edit/certificatessection`,
        { certificatesSection }
      );
      set({
        certificateSection: certificatesSection, // Actualiza el estado con el objeto enviado
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Error editando Certificados",
        isLoading: false,
      });
    }
  },

  addCertificate: async (userName, certificate) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${API_URL}/${userName}/add/certificate`,
        { certificate }
      );
      set(state => ({
        certificateSection: {
          ...state.certificateSection,
          certificates: [
            ...state.certificateSection.certificates,
            response.data.certificate,
          ],
        },
        isLoading: false,
      }));
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Error al agregar certificado",
        isLoading: false,
      });
    }
  },

  deleteCertificate: async (userName, certificateId) => {
    try {
      await axios.delete(
        `${API_URL}/${userName}/delete/certificate/${certificateId}`
      );
      // Actualiza el estado después de eliminar la experiencia
      // Reemplazamos el array de experiences por una nueva lista sin esa experiencia
      set(state => ({
        certificateSection: {
          ...state.certificateSection,
          certificates: state.certificateSection.certificates.filter(
            cert => cert._id !== certificateId
          ),
        },
      }));
    } catch (error) {
      console.error("Error al eliminar la experiencia:", error);
    }
  },

  editCertificate: async (userName, certificateId, updatedData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(
        `${API_URL}/${userName}/update/certificates/${certificateId}`,
        updatedData
      );
      set(state => ({
        certificateSection: {
          ...state.certificateSection,
          certificates: state.certificateSection.certificates.map(cert =>
            cert._id === certificateId ? { ...cert, ...updatedData } : cert
          ),
        },
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error editando certificado",
        isLoading: false,
      });
    }
  },  

  //* Funciones para ContactSection
  fetchContactSection: async userName => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `${API_URL}/${userName}/get-contact-info`
      );
      set({
        contactSection: response.data.contactSection,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Error obteniendo información de contacto",
        isLoading: false,
      });
    }
  },

  editContactSection: async (userName, contactData) => {
    set({ isLoading: true, error: null });
    try {
      await axios.put(`${API_URL}/${userName}/edit/contact`, {
        contactSection: contactData,
      });
      set(state => ({
        contactSection: contactData,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error:
          error.response?.data?.message || "Error al editar contacto",
        isLoading: false,
      });
    }
  },

  sendContactMessage: async (userName, formData, userEmail) => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/${userName}/send-email`, {
        formData,
        userEmail,
      });
      set(state => ({ isLoading: false }));
      toast.success("Mensaje enviado correctamente");
    } catch (error) {
      toast.error("Lo lamento! No he podido enviar el email");
      console.error("Error al enviar el mensaje:", error.message);
      set({ error: error.message });
    }
  },  

  //* Funciones para EducationSection
  fetchEducationSection: async userName => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `${API_URL}/${userName}/education`
      );
      set({
        educationSection: response.data.educationSection,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Error obteniendo educación",
        isLoading: false,
      });
    }
  },

  editEducationSection: async (userName, educationSection) => {
    set({ isLoading: true, error: null });
    try {
      await axios.put(
        `${API_URL}/${userName}/edit/educationsection`,
        { educationSection }
      );
      set({
        educationSection,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message || "Error editando Educación",
        isLoading: false,
      });
    }
  },

  addEducation: async (userName, education) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${API_URL}/${userName}/add/education`,
        { education }
      );
      set(state => ({
        educationSection: {
          ...state.educationSection,
          educations: [
            ...state.educationSection.educations,
            response.data.education,
          ],
        },
        isLoading: false,
      }));
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Error al agregar educación",
        isLoading: false,
      });
    }
  },

  deleteEducation: async (userName, educationId) => {
    try {
      await axios.delete(
        `${API_URL}/${userName}/delete/education/${educationId}`
      );
      // Actualiza el estado después de eliminar la experiencia
      // Reemplazamos el array de experiences por una nueva lista sin esa experiencia
      set(state => ({
        educationSection: {
          ...state.educationSection,
          educations: state.educationSection.educations.filter(
            edu => edu._id !== educationId
          ),
        },
      }));
    } catch (error) {
      console.error("Error al eliminar la experiencia:", error);
    }
  },

  editEducation: async (userName, educationId, updatedData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(
        `${API_URL}/${userName}/update/education/${educationId}`,
        updatedData
      );
      set(state => ({
        educationSection: {
          ...state.educationSection,
          educations: state.educationSection.educations.map(edu =>
            edu._id === educationId ? { ...edu, ...updatedData } : edu
          ),
        },
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al editar la educación",
        isLoading: false,
      });
    }
  },
  
  //* Funciones para ExperienceSection
  fetchExperienceSection: async userName => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `${API_URL}/${userName}/experience`
      );
      set({
        experienceSection: response.data.experienceSection,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Error obteniendo experiencia",
        isLoading: false,
      });
    }
  },

  editExperienceSection: async (userName, experienceSection) => {
    set({ isLoading: true, error: null });
    try {
      await axios.put(
        `${API_URL}/${userName}/edit/experiencesection`,
        { experienceSection }
      );
      set({
        experienceSection, // Actualiza el estado con el objeto enviado
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Error editando Experience",
        isLoading: false,
      });
    }
  },

  addExperience: async (userName, experience) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${API_URL}/${userName}/add/experience`,
        { experience }
      );
      set(state => ({
        experienceSection: {
          ...state.experienceSection,
          experiences: [
            ...state.experienceSection.experiences,
            response.data.experience,
          ],
        },
        isLoading: false,
      }));
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Error al agregar experiencia",
        isLoading: false,
      });
    }
  },

  deleteExperience: async (userName, experienceId) => {
    try {
      await axios.delete(
        `${API_URL}/${userName}/delete/experience/${experienceId}`
      );
      // Actualiza el estado después de eliminar la experiencia
      // Reemplazamos el array de experiences por una nueva lista sin esa experiencia
      set(state => ({
        experienceSection: {
          ...state.experienceSection,
          experiences: state.experienceSection.experiences.filter(
            exp => exp._id !== experienceId
          ),
        },
      }));
    } catch (error) {
      console.error("Error al eliminar la experiencia:", error);
    }
  },

  editExperience: async (userName, experienceId, updatedData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(
        `${API_URL}/${userName}/update/experience/${experienceId}`,
        updatedData
      );
      set(state => ({
        experienceSection: {
          ...state.experienceSection,
          experiences: state.experienceSection.experiences.map(exp =>
            exp._id === experienceId
              ? { ...exp, ...updatedData }
              : exp
          ),
        },
        isLoading: false,
      }));
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Error editando experiencia",
        isLoading: false,
      });
    }
  },

  //* Funciones para ProjectSection
  fetchProjectSection: async userName => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `${API_URL}/${userName}/projects`
      );
      set({
        projectSection: response.data.projectSection,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Error obteniendo proyectos",
        isLoading: false,
      });
    }
  },

  editProjectsSection: async (userName, projectsSection) => {
    set({ isLoading: true, error: null });
    try {
      await axios.put(`${API_URL}/${userName}/edit/projectsection`, {
        projectsSection,
      });
      set({
        projectSection: projectsSection, // Actualiza el estado con el objeto enviado
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message || "Error editando Projects",
        isLoading: false,
      });
    }
  },

  addProject: async (userName, project) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${API_URL}/${userName}/add/project`,
        { project }
      );
      set(state => ({
        projectSection: {
          ...state.projectSection,
          projects: [
            ...state.projectSection.projects,
            response.data.project,
          ],
        },
        isLoading: false,
      }));
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Error al agregar proyecto",
        isLoading: false,
      });
    }
  },

  deleteProject: async (userName, projectId) => {
    try {
      await axios.delete(
        `${API_URL}/${userName}/delete/project/${projectId}`
      );
      // Actualiza el estado después de eliminar la experiencia
      // Reemplazamos el array de experiences por una nueva lista sin esa experiencia
      set(state => ({
        projectSection: {
          ...state.projectSection,
          projects: state.projectSection.projects.filter(
            cert => cert._id !== projectId
          ),
        },
      }));
    } catch (error) {
      console.error("Error al eliminar la experiencia:", error);
    }
  },

  editProject: async (userName, projectId, updatedData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(
        `${API_URL}/${userName}/update/project/${projectId}`,
        updatedData
      );

      set(state => ({
        projectSection: {
          ...state.projectSection,
          projects: state.projectSection.projects.map(proj =>
            proj._id === projectId
              ? { ...proj, ...updatedData }
              : proj
          ),
        },
        isLoading: false,
      }));
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Error al editar el proyecto",
        isLoading: false,
      });
    }
  },

  //* Funciones para TechnologySection
  fetchTechnologySection: async userName => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `${API_URL}/${userName}/technologies`
      );
      set({
        technologySection: response.data.technologySection,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Error obteniendo tecnologías",
        isLoading: false,
      });
    }
  },

  editTechnologiesSection: async (userName, technologiesSection) => {
    set({ isLoading: true, error: null });
    try {
      await axios.put(
        `${API_URL}/${userName}/edit/technologiessection`,
        { technologiesSection }
      );
      set({
        technologySection: technologiesSection, // Actualiza el estado con el objeto enviado
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Error editando Technologies",
        isLoading: false,
      });
    }
  },

  addTechnology: async (userName, technology) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${API_URL}/${userName}/add/technology`,
        { technology }
      );
      set(state => ({
        technologySection: {
          ...state.technologySection,
          technologies: [
            ...state.technologySection.technologies,
            response.data.technology,
          ],
        },
        isLoading: false,
      }));
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Error al agregar tecnología",
        isLoading: false,
      });
    }
  },

  deleteTechnology: async (userName, technologyId) => {
    try {
      await axios.delete(
        `${API_URL}/${userName}/delete/technology/${technologyId}`
      );
      // Actualiza el estado después de eliminar la experiencia
      // Reemplazamos el array de experiences por una nueva lista sin esa experiencia
      set(state => ({
        technologySection: {
          ...state.technologySection,
          technologies: state.technologySection.technologies.filter(
            tech => tech._id !== technologyId
          ),
        },
      }));
    } catch (error) {
      console.error("Error al eliminar la experiencia:", error);
    }
  },
}));
