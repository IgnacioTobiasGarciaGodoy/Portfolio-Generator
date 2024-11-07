import React, { useState, useEffect } from "react";
import { usePortfolioStore } from "../store/portfolioStore";
import { useParams, useNavigate } from "react-router-dom";

const EditEducationForm = () => {
  const { userName, educationId } = useParams();
  const { educationSection, editEducation, fetchEducationSection } = usePortfolioStore();
  const navigate = useNavigate();

  const [editedEducation, setEditedEducation] = useState({
    name: { text: "" },
    description: { text: "" },
    date: {
      from: "",
      to: "",
    },
  });

  useEffect(() => {
    if (!educationSection) {
      fetchEducationSection(userName);
    } else {
      const education = educationSection.educations.find(edu => edu._id === educationId);
      if (education) {
        setEditedEducation({
          name: { text: education.name.text || "" },
          description: { text: education.description.text || "" },
          date: {
            from: education.date.from || "",
            to: education.date.to || "",
          },
        });
      }
    }
  }, [educationId, educationSection, userName, fetchEducationSection]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "from" || name === "to") {
      setEditedEducation((prevEducation) => ({
        ...prevEducation,
        date: { ...prevEducation.date, [name]: value },
      }));
    } else if (name === "name" || name === "description") {
      setEditedEducation((prevEducation) => ({
        ...prevEducation,
        [name]: { text: value },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editEducation(userName, educationId, editedEducation);
    navigate(`/portfolio/${userName}`);
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-3xl text-white font-bold mb-6">Editar Educación</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Nombre de la Educación</label>
          <input
            type="text"
            name="name"
            value={editedEducation.name.text}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-600 rounded bg-gray-900 text-white"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Descripción</label>
          <textarea
            name="description"
            value={editedEducation.description.text}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-600 rounded bg-gray-900 text-white"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Fecha de Inicio</label>
          <input
            type="text"
            name="from"
            value={editedEducation.date.from}
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
            value={editedEducation.date.to}
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

export default EditEducationForm;