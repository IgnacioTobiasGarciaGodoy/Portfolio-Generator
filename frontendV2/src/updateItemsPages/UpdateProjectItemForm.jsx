import React, { useState, useEffect } from "react";
import { usePortfolioStore } from "../store/portfolioStore";
import { useParams, useNavigate } from "react-router-dom";

const EditProjectForm = () => {
  const { userName, projectId } = useParams(); // Asegúrate de pasar 'projectId' desde la URL
  const { projectSection, editItem, fetchSection } =
    usePortfolioStore();
  const navigate = useNavigate();

  const [editedProject, setEditedProject] = useState({
    name: { text: "" },
    description: { text: "" },
    image: { url: "" },
    demoLink: { text: "" },
    gitHubLink: { text: "" },
  });  

  useEffect(() => {
    if (!projectSection) {
      fetchSection(userName, "projectSection", "/projects");
    } else {
      const project = projectSection.projects.find(
        proj => proj._id === projectId
      );
      if (project) {
        setEditedProject({
          name: { text: project.name.text || "" },
          description: { text: project.description.text || "" },
          image: { url: project.image.url || "" },
          demoLink: { text: project.demoLink.text || "" },
          gitHubLink: { text: project.gitHubLink.text || "" },
        });
      }
    }
  }, [projectId, projectSection, userName, fetchSection]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === "image" && files && files[0]) {
      setEditedProject((prevProject) => ({
        ...prevProject,
        image: files[0],
      }));
    } else {
      setEditedProject((prevProject) => ({
        ...prevProject,
        [name]: { ...prevProject[name], text: value },
      }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await editItem(
      userName,
      projectId,
      "/edit/project",
      editedProject,
      "projectSection",
      "project"
    );
    navigate(`/portfolio/${userName}`);
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-3xl text-white font-bold mb-6">
        Editar Proyecto
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">
            Nombre del Proyecto
          </label>
          <input
            type="text"
            name="name"
            value={editedProject.name.text}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-600 rounded bg-gray-900 text-white"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">
            Descripción
          </label>
          <textarea
            name="description"
            value={editedProject.description.text}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-600 rounded bg-gray-900 text-white"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">
            Enlace de Demo
          </label>
          <input
            type="text"
            name="demoLink"
            value={editedProject.demoLink.text}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-600 rounded bg-gray-900 text-white"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">
            Enlace de GitHub
          </label>
          <input
            type="text"
            name="gitHubLink"
            value={editedProject.gitHubLink.text}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-600 rounded bg-gray-900 text-white"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">
            Imagen del Proyecto
          </label>
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-600 rounded bg-gray-900 text-white"
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

export default EditProjectForm;
