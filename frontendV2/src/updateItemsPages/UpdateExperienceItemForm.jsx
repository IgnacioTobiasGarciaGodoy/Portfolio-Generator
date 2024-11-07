import React, { useState, useEffect } from "react";
import { usePortfolioStore } from "../store/portfolioStore";
import { useParams, useNavigate } from "react-router-dom";

const EditExperienceForm = () => {
  const { userName, experienceId } = useParams();
  const { experienceSection, editExperience, fetchExperienceSection } = usePortfolioStore();
  const navigate = useNavigate();

  // Estado local para almacenar los datos del formulario
  const [editedExperience, setEditedExperience] = useState({
    workName: { text: "" },
    description: { text: "" },
    date: {
      from: "",
      to: "",
    },
  });

  // Carga las experiencias si no están disponibles en el estado global
  useEffect(() => {
    if (!experienceSection) {
      fetchExperienceSection(userName);
    } else {
      const experience = experienceSection.experiences.find(exp => exp._id === experienceId);
      if (experience) {
        setEditedExperience({
          workName: { text: experience.workName.text || "" },
          description: { text: experience.description.text || "" },
          date: {
            from: experience.date.from || "",
            to: experience.date.to || "",
          },
        });
      }
    }
  }, [experienceId, experienceSection, userName, fetchExperienceSection]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "from" || name === "to") {
      setEditedExperience((prevExperience) => ({
        ...prevExperience,
        date: { ...prevExperience.date, [name]: value },
      }));
    } else if (name === "workName" || name === "description") {
      setEditedExperience((prevExperience) => ({
        ...prevExperience,
        [name]: { text: value },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editExperience(userName, experienceId, editedExperience);
    navigate(`/portfolio/${userName}`);
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-3xl text-white font-bold mb-6">Editar Experiencia</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Nombre del Trabajo</label>
          <input
            type="text"
            name="workName"
            value={editedExperience.workName.text}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-600 rounded bg-gray-900 text-white"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Descripción</label>
          <textarea
            name="description"
            value={editedExperience.description.text}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-600 rounded bg-gray-900 text-white"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Fecha de Inicio</label>
          <input
            type="text"
            name="from"
            value={editedExperience.date.from}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-600 rounded bg-gray-900 text-white"
            placeholder="Ejemplo: 01/2020"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Fecha de Fin</label>
          <input
            type="text"
            name="to"
            value={editedExperience.date.to}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-600 rounded bg-gray-900 text-white"
            placeholder="Ejemplo: 12/2023"
          />
        </div>
        <button
          type="submit"
          className="w-full mt-4 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 font-semibold"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditExperienceForm;