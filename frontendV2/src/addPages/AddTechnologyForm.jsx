import React, { useState } from "react";
import { usePortfolioStore } from "../store/portfolioStore";
import { useParams, useNavigate } from "react-router-dom";

const AddTechnologyForm = () => {
  const { userName } = useParams();
  const { addItem } = usePortfolioStore();
  const navigate = useNavigate();

  const [newTechnology, setNewTechnology] = useState({
    name: "",
    image: { url: "" },
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    if (name === "image" && files && files[0]) {
      setNewTechnology((prevTechnology) => ({
        ...prevTechnology,
        image: files[0],
      }));
    } else {
      setNewTechnology((prevTechnology) => ({
        ...prevTechnology,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await addItem(
      userName,
      "/add/technology",
      newTechnology,
      "technologySection",
      "technology"
    );
    navigate(`/portfolio/${userName}`);
  };

  const handleCancel = async e => {
    e.preventDefault();
    navigate(`/portfolio/${userName}`);
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-3xl text-white font-bold mb-6">
        Agregar Nueva Tecnología
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">
            Nombre de la Tecnología
          </label>
          <input
            type="text"
            name="name"
            value={newTechnology.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-600 rounded bg-gray-900 text-white"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">
            Imagen de la Tecnología
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
          Agregar Tecnología
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

export default AddTechnologyForm;
