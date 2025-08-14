import React, { useState, useEffect } from "react";
import { usePortfolioStore } from "../store/portfolioStore";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const EditAboutMePage = () => {
  const { userName } = useParams();
  const { aboutMeSection, editSection, fetchSection } = usePortfolioStore();
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  // Inicializa el formulario con los datos existentes o valores por defecto
  const [sectionTitle, setSectionTitle] = useState({
    text: aboutMeSection?.sectionTitle?.text || "About Me",
    isBold: aboutMeSection?.sectionTitle?.isBold || true,
    size: aboutMeSection?.sectionTitle?.size || 22,
    color: aboutMeSection?.sectionTitle?.color || "black",
    font: aboutMeSection?.sectionTitle?.font || "Arial",
    isItalic: aboutMeSection?.sectionTitle?.isItalic || false,
  });

  const [bodyText, setBodyText] = useState({
    text: aboutMeSection?.bodyText?.text || "Cambio",
    isBold: aboutMeSection?.bodyText?.isBold || false,
    size: aboutMeSection?.bodyText?.size || 12,
    color: aboutMeSection?.bodyText?.color || "black",
    font: aboutMeSection?.bodyText?.font || "Arial",
    isItalic: aboutMeSection?.bodyText?.isItalic || false,
  });

  useEffect(() => {
    if (!aboutMeSection) {
      fetchSection(userName, "aboutMeSection", "/aboutme");
    }
  }, [userName]);

  useEffect(() => {
    // Si el usuario está autenticado y el userName en la URL no coincide, redirige
    if (isAuthenticated && user?.userName !== userName) {
      navigate(`/portfolio/${userName}`);
    }
  }, [isAuthenticated, user, userName, navigate]);

  const handleSave = async () => {
    const updatedAboutMeSection = {
      sectionTitle,
      bodyText,
    };
    await editSection(userName, "aboutMeSection", updatedAboutMeSection, "edit/aboutMe");
    navigate(`/portfolio/${userName}`);
  };

  const handleCancel = async e => {
    e.preventDefault();
    navigate(`/portfolio/${userName}`);
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-3xl text-white font-bold mb-6">Editar "Acerca de mí"</h1>
      
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
      
      {/* Campo de BodyText */}
      <div className="mb-6">
        <label className="block text-gray-300 mb-2">Texto</label>
        <textarea
          value={bodyText.text}
          onChange={(e) => setBodyText({ ...bodyText, text: e.target.value })}
          className="w-full px-4 py-3 border border-gray-600 rounded bg-gray-900 text-white"
          rows="6"
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

export default EditAboutMePage;
