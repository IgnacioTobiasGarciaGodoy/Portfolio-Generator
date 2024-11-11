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
  fetchSection: async (userName, sectionName, endpoint) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/${userName}${endpoint}`);
      set({
        [sectionName]: response.data[sectionName],
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error obteniendo la presentación"
      });
    } finally {
      set({
        isLoading: false
      })
    }
  },

  editSection: async (userName, section, data, endpoint) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      formData.append(section, JSON.stringify(data));

      await axios.put(`${API_URL}/${userName}/${endpoint}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      set({
        data
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || `Error editando ${section}`
      });
    } finally {
      set({
        isLoading: false
      });
    }
  },

  editItem: async (userName, sectionId, endpointPath, editedData, sectionName, objectName) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      formData.append(sectionName, JSON.stringify({ [objectName]: editedData }));

      await axios.put(
        `${API_URL}/${userName}${endpointPath}/${sectionId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    } catch (error) {
      set({
        error: error.response?.data?.message || `Error editando ${sectionName}`
      });
    } finally {
      set({ isLoading: false });
    }
  },

  addItem: async (userName, endpointPath, itemData, sectionName, objectName) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      formData.append(sectionName, JSON.stringify({ [objectName]: itemData }));

      await axios.post(`${API_URL}/${userName}${endpointPath}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || `Error agregando item ${sectionName}`
      });
    } finally {
      set({ isLoading: false })
    }
  },

  //* Funciones para CertificateSection
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

  //* Funciones para ContactSection
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

  //* Funciones para ExperienceSection
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

  //* Funciones para ProjectSection
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

  //* Funciones para TechnologySection
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
