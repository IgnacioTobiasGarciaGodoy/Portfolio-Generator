import React, { useState } from "react";
import { usePortfolioStore } from "../store/portfolioStore";
import { useParams, useNavigate } from "react-router-dom";

const AddProjectForm = () => {
  const { userName } = useParams();
  const { addProject } = usePortfolioStore();
  const navigate = useNavigate();

  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    image: {
      image: "/path/to/image",
    },
    demoLink: "",
    gitHubLink: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "image") {
      setNewProject((prevProject) => ({
        ...prevProject,
        image: { image: value },
      }));
    } else {
      setNewProject((prevProject) => ({
        ...prevProject,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProject(userName, newProject);
    navigate(`/portfolio/${userName}`);
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-3xl text-white font-bold mb-6">Agregar Nuevo Proyecto</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Nombre del Proyecto</label>
          <input
            type="text"
            name="name"
            value={newProject.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-600 rounded bg-gray-900 text-white"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Descripción</label>
          <textarea
            name="description"
            value={newProject.description}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-600 rounded bg-gray-900 text-white"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Enlace de Demo</label>
          <input
            type="text"
            name="demoLink"
            value={newProject.demoLink}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-600 rounded bg-gray-900 text-white"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Enlace de GitHub</label>
          <input
            type="text"
            name="gitHubLink"
            value={newProject.gitHubLink}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-600 rounded bg-gray-900 text-white"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Imagen del Proyecto</label>
          <input
            type="text"
            name="image"
            value={newProject.image.image}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-600 rounded bg-gray-900 text-white"
            placeholder="URL de la imagen"
          />
        </div>
        <button
          type="submit"
          className="w-full mt-4 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 font-semibold"
        >
          Agregar Proyecto
        </button>
      </form>
    </div>
  );
};

export default AddProjectForm;
