import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:4000/portfolio";
axios.defaults.withCredentials = true;

export const usePortfolioStore = create((set) => ({
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
  fetchPresentationSection: async (userName) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/${userName}/presentation`);
      set({
        presentationSection: response.data.presentationSection,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error obteniendo la presentación",
        isLoading: false,
      });
    }
  },

  editPresentationSection: async (userName, presentationSection) => {
    set({ isLoading: true, error: null });
    try {
      await axios.put(`${API_URL}/${userName}/edit/presentation`, { presentationSection });
      set({
        presentationSection,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error editando Presentation",
        isLoading: false,
      });
    }
  },

  //* Funciones para AboutMeSection
  fetchAboutMeSection: async (userName) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/${userName}/aboutme`);
      set({ aboutMeSection: response.data.aboutMeSection, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error obteniendo About Me",
        isLoading: false,
      });
    }
  },

  editAboutMeSection: async (userName, aboutMeSection) => {
    set({ isLoading: true, error: null });
    try {
      await axios.put(`${API_URL}/${userName}/edit/aboutMe`, { aboutMeSection });
      set({
        aboutMeSection,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error editando About Me",
        isLoading: false,
      });
    }
  },

  //* Funciones para CertificateSection
  fetchCertificateSection: async (userName) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/${userName}/certificates`);
      set({
        certificateSection: response.data.certificateSection,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error obteniendo certificados",
        isLoading: false,
      });
    }
  },

  editCertificatesSection: async (userName, certificatesSection) => {
    set({ isLoading: true, error: null });
    try {
      await axios.put(`${API_URL}/${userName}/edit/certificatessection`, { certificatesSection });
      set({
        certificateSection: certificatesSection, // Actualiza el estado con el objeto enviado
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error editando Certificados",
        isLoading: false,
      });
    }
  },

  addCertificate: async (userName, certificate) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/${userName}/add/certificate`, { certificate });
      set((state) => ({
        certificateSection: {
          ...state.certificateSection,
          certificates: [...state.certificateSection.certificates, response.data.certificate],
        },
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al agregar certificado",
        isLoading: false,
      });
    }
  },  

  //* Funciones para ContactSection
  fetchContactSection: async (userName) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/${userName}/get-contact-info`);
      set({ contactSection: response.data.contactSection, isLoading: false });
    } catch (error) {
      set({
        error:
          error.response?.data?.message || "Error obteniendo información de contacto",
        isLoading: false,
      });
    }
  },

  editContactSection: async (userName, contactData) => {
    set({ isLoading: true, error: null });
    try {
      await axios.put(`${API_URL}/${userName}/edit/contact`, { contactSection: contactData });
      set((state) => ({
        contactSection: contactData,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al editar contacto",
        isLoading: false,
      });
    }
  },  

  //* Funciones para EducationSection
  fetchEducationSection: async (userName) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/${userName}/education`);
      set({ educationSection: response.data.educationSection, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error obteniendo educación",
        isLoading: false,
      });
    }
  },

  editEducationSection: async (userName, educationSection) => {
    set({ isLoading: true, error: null });
    try {
      await axios.put(`${API_URL}/${userName}/edit/educationsection`, { educationSection });
      set({
        educationSection,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error editando Educación",
        isLoading: false,
      });
    }
  },

  addEducation: async (userName, education) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/${userName}/add/education`, { education });
      set((state) => ({
        educationSection: {
          ...state.educationSection,
          educations: [...state.educationSection.educations, response.data.education],
        },
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al agregar educación",
        isLoading: false,
      });
    }
  },    

  //* Funciones para ExperienceSection
  fetchExperienceSection: async (userName) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/${userName}/experience`);
      set({ experienceSection: response.data.experienceSection, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error obteniendo experiencia",
        isLoading: false,
      });
    }
  },

  editExperienceSection: async (userName, experienceSection) => {
    set({ isLoading: true, error: null });
    try {
      await axios.put(`${API_URL}/${userName}/edit/experiencesection`, { experienceSection });
      set({
        experienceSection, // Actualiza el estado con el objeto enviado
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error editando Experience",
        isLoading: false,
      });
    }
  },

  addExperience: async (userName, experience) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/${userName}/add/experience`, { experience });
      set((state) => ({
        experienceSection: {
          ...state.experienceSection,
          experiences: [...state.experienceSection.experiences, response.data.experience],
        },
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al agregar experiencia",
        isLoading: false,
      });
    }
  },  

  //* Funciones para ProjectSection
  fetchProjectSection: async (userName) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/${userName}/projects`);
      set({
        projectSection: response.data.projectSection,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error obteniendo proyectos",
        isLoading: false,
      });
    }
  },

  editProjectsSection: async (userName, projectsSection) => {
    set({ isLoading: true, error: null });
    try {
      await axios.put(`${API_URL}/${userName}/edit/projectssection`, { projectsSection });
      set({
        projectSection: projectsSection, // Actualiza el estado con el objeto enviado
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error editando Projects",
        isLoading: false,
      });
    }
  },

  addProject: async (userName, project) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/${userName}/add/project`, { project });
      set((state) => ({
        projectSection: {
          ...state.projectSection,
          projects: [...state.projectSection.projects, response.data.project],
        },
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al agregar proyecto",
        isLoading: false,
      });
    }
  },    

  //* Funciones para TechnologySection
  fetchTechnologySection: async (userName) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/${userName}/technologies`);
      set({
        technologySection: response.data.technologySection,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error obteniendo tecnologías",
        isLoading: false,
      });
    }
  },

  editTechnologiesSection: async (userName, technologiesSection) => {
    set({ isLoading: true, error: null });
    try {
      await axios.put(`${API_URL}/${userName}/edit/technologiessection`, { technologiesSection });
      set({
        technologySection: technologiesSection, // Actualiza el estado con el objeto enviado
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error editando Technologies",
        isLoading: false,
      });
    }
  },

  addTechnology: async (userName, technology) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/${userName}/add/technology`, { technology });
      set((state) => ({
        technologySection: {
          ...state.technologySection,
          technologies: [...state.technologySection.technologies, response.data.technology],
        },
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al agregar tecnología",
        isLoading: false,
      });
    }
  },  
}));
