import React, { useState, useEffect } from "react";
import { usePortfolioStore } from "../store/portfolioStore";
import { useAuthStore } from "../store/authStore";
import { useParams, useNavigate } from "react-router-dom";

const EditProjectsPage = () => {
  const { userName } = useParams();
  const { projectSection, editSection, fetchSection } = usePortfolioStore();
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const [sectionTitle, setSectionTitle] = useState({
    text: projectSection?.sectionTitle?.text || "Mis Proyectos",
    isBold: projectSection?.sectionTitle?.isBold || true,
    size: projectSection?.sectionTitle?.size || 22,
    color: projectSection?.sectionTitle?.color || "black",
    font: projectSection?.sectionTitle?.font || "Arial",
    isItalic: projectSection?.sectionTitle?.isItalic || false,
  });

  useEffect(() => {
    if (!projectSection) {
      fetchSection(userName, "projectSection", "/projects");
    }
  }, [userName, fetchSection, projectSection]);

  useEffect(() => {
    // Si el usuario está autenticado y el userName en la URL no coincide, redirige
    if (isAuthenticated && user?.userName !== userName) {
      navigate(`/portfolio/${userName}`);
    }
  }, [isAuthenticated, user, userName, navigate]);

  const handleSave = async () => {
    const updatedProjectsSection = {
      sectionTitle,
    };
    await editSection(userName, "projectSection" ,updatedProjectsSection, "edit/projectsection");
    navigate(`/portfolio/${userName}`);
  };

  const handleCancel = async e => {
    e.preventDefault();
    navigate(`/portfolio/${userName}`);
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-3xl text-white font-bold mb-6">Editar "Mis Proyectos"</h1>
      
      {/* Campo de Título */}
      <div className="mb-6">
        <label className="block text-gray-300 mb-2">Título</label>
        <input
          type="text"
          value={sectionTitle.text}
          onChange={(e) => setSectionTitle({ ...sectionTitle, text: e.target.value })}
          className="w-full px-4 py-3 border border-gray-600 rounded bg-gray-900 text-white"
        />
      </div>
      
      
      <button
        onClick={handleSave}
        className="w-full mt-4 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 font-semibold"
      >
        Guardar Cambios
      </button>
      <button
        onClick={handleCancel}
        className="w-full mt-4 bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 font-semibold"
      >
        Cancelar
      </button>
    </div>
  );
};

export default EditProjectsPage;