import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://localhost:4000/portfolio";
axios.defaults.withCredentials = true;

export const usePortfolioStore = create(set => ({
  presentationSection: null,
  aboutMeSection: null,
  careerSection: null,
  projectSection: null,
  skillsSection: null,

  isLoading: false,
  error: null,

  _setLoading: (v) => set({ isLoading: v }),
  _setError: (msg) => set({ error: msg }),

  fetchSection: async (userName, sectionName, endpoint) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.get(`${API_URL}/${userName}${endpoint}`);
      set({ [sectionName]: data[sectionName] });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error obteniendo la sección",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  editSection: async (userName, section, data, endpoint, image) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      formData.append(section, JSON.stringify(data));

      if (image instanceof File) {
        formData.append('image', image);
      }

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

  editItem: async (userName, itemId, endpointPath, editedData, sectionName, collectionKey) => {
    set({ isLoading: true, error: null });
    try {
      let body;
      let config = {};

      if (editedData?.image instanceof File) {
        const formData = new FormData();
        formData.append(sectionName, JSON.stringify({ [collectionKey]: editedData }));
        formData.append("image", editedData.image);
        body = formData;
        config.headers = { "Content-Type": "multipart/form-data" };
      } else {
        body = { [sectionName]: { [collectionKey]: editedData } };
      }

      await axios.put(`${API_URL}/${userName}${endpointPath}/${itemId}`, body, config);
      toast.success("Item actualizado");

    } catch (error) {
      set({
        error: error.response?.data?.message || `Error editando ${sectionName}`,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  addItem: async (userName, endpointPath, itemData, sectionName, collectionKey) => {
    set({ isLoading: true, error: null });
    try {
      let body;
      let config = {};

      if (itemData?.image instanceof File) {
        const formData = new FormData();
        formData.append(sectionName, JSON.stringify({ [collectionKey]: itemData }));
        formData.append("image", itemData.image);
        body = formData;
        config.headers = { "Content-Type": "multipart/form-data" };
      } else {
        body = { [sectionName]: { [collectionKey]: itemData } };
      }

      await axios.post(`${API_URL}/${userName}${endpointPath}`, body, config);
      toast.success("Item agregado");

    } catch (error) {
      set({
        error: error.response?.data?.message || `Error agregando item en ${sectionName}`,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteItem: async (userName, itemId, endpointPath, sectionName, collectionKey) => {
    try {
      await axios.delete(`${API_URL}/${userName}${endpointPath}/${itemId}`);
      set((state) => {
        const section = state[sectionName];
        if (!section || !Array.isArray(section[collectionKey])) return {};
        return {
          [sectionName]: {
            ...section,
            [collectionKey]: section[collectionKey].filter((it) => it._id !== itemId),
          },
        };
      });
      toast.success("Item eliminado");
    } catch (error) {
      console.error(`Error al eliminar el item de ${sectionName}`, error);
      toast.error("No se pudo eliminar");
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

}));