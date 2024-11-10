import React, { useState, useEffect } from "react";
import { usePortfolioStore } from "../store/portfolioStore";
import { useAuthStore } from "../store/authStore";
import { useParams, useNavigate } from "react-router-dom";

const EditPresentationPage = () => {
  const { userName } = useParams();
  const { presentationSection, editSection, fetchPresentationSection } = usePortfolioStore();
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const [name, setName] = useState({
    text: presentationSection?.name?.text || "User Full Name",
    isBold: presentationSection?.name?.isBold || true,
    size: presentationSection?.name?.size || 22,
    color: presentationSection?.name?.color || "black",
    font: presentationSection?.name?.font || "Arial",
    isItalic: presentationSection?.name?.isItalic || false,
  });

  const [rol, setRol] = useState({
    text: presentationSection?.rol?.text || "I'm a developer!",
    isBold: presentationSection?.rol?.isBold || false,
    size: presentationSection?.rol?.size || 18,
    color: presentationSection?.rol?.color || "black",
    font: presentationSection?.rol?.font || "Arial",
    isItalic: presentationSection?.rol?.isItalic || false,
  });

  const [image, setImage] = useState({
    text: presentationSection?.image?.url || "/assets/default/presentation.jpg",
  });

  useEffect(() => {
    if (!presentationSection) {
      fetchPresentationSection(userName);
    }
  }, [userName, fetchPresentationSection, presentationSection]);

  useEffect(() => {
    // Si el usuario está autenticado y el userName en la URL no coincide, redirige
    if (isAuthenticated && user?.userName !== userName) {
      navigate(`/portfolio/${userName}`);
    }
  }, [isAuthenticated, user, userName, navigate]);

  const handleSave = async () => {
    const updatedPresentationSection = {
      name,
      rol,
      image,
    };
    await editSection(userName, "presentationSection", updatedPresentationSection, "edit/presentation");
    navigate(`/portfolio/${userName}`);
  };

  const handleCancel = async e => {
    e.preventDefault();
    navigate(`/portfolio/${userName}`);
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-3xl text-white font-bold mb-6">Editar "Presentación"</h1>
      
      {/* Campo de Nombre */}
      <div className="mb-6">
        <label className="block text-gray-300 mb-2">Nombre</label>
        <input
          type="text"
          value={name.text}
          onChange={(e) => setName({ ...name, text: e.target.value })}
          className="w-full px-4 py-3 border border-gray-600 rounded bg-gray-900 text-white"
        />
      </div>
      
      {/* Campo de Rol */}
      <div className="mb-6">
        <label className="block text-gray-300 mb-2">Rol</label>
        <input
          type="text"
          value={rol.text}
          onChange={(e) => setRol({ ...rol, text: e.target.value })}
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

export default EditPresentationPage;