import React, { useState } from "react";
import { usePortfolioStore } from "../../store/portfolioStore";
import { useParams, useNavigate } from "react-router-dom";

const AddExperienceForm = () => {
  const { userName } = useParams();
  const { addItem } = usePortfolioStore();
  const navigate = useNavigate();

  const [newExperience, setNewExperience] = useState({
    workName: { text: "" },
    description: { text: "" },
    date: {
      from: "",
      to: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "from" || name === "to") {
      setNewExperience((prevExperience) => ({
        ...prevExperience,
        date: { ...prevExperience.date, [name]: value },
      }));
    } else if (name === "workName" || name === "description") {
      setNewExperience((prevExperience) => ({
        ...prevExperience,
        [name]: { text: value },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addItem(userName, '/add/experience', newExperience, 'experienceSection', 'experience');
    navigate(`/portfolio/${userName}`);
  };

  const handleCancel = async e => {
    e.preventDefault();
    navigate(`/portfolio/${userName}`);
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-3xl text-white font-bold mb-6">Agregar Nueva Experiencia</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Nombre del Trabajo</label>
          <input
            type="text"
            name="workName"
            value={newExperience.workName.text}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-600 rounded bg-gray-900 text-white"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Descripción</label>
          <textarea
            name="description"
            value={newExperience.description.text}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-600 rounded bg-gray-900 text-white"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Fecha de Inicio</label>
          <input
            type="text"
            name="from"
            value={newExperience.date.from}
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
            value={newExperience.date.to}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-600 rounded bg-gray-900 text-white"
            placeholder="Ejemplo: 12/2023"
          />
        </div>
        <button
          type="submit"
          className="w-full mt-4 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 font-semibold"
        >
          Agregar Experiencia
        </button>
        <button
        onClick={handleCancel}
        className="w-full mt-4 bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 font-semibold"
      >
        Cancelar
      </button>
      </form>
    </div>
  );
};

export default AddExperienceForm;
