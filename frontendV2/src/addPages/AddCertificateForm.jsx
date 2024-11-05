import React, { useState } from "react";
import { usePortfolioStore } from "../store/portfolioStore";
import { useParams, useNavigate } from "react-router-dom";

const AddCertificateForm = () => {
  const { userName } = useParams();
  const { addCertificate } = usePortfolioStore();
  const navigate = useNavigate();

  const [newCertificate, setNewCertificate] = useState({
    name: "",
    image: { image: "" },
    description: { text: "" },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "image") {
      setNewCertificate((prevCertificate) => ({
        ...prevCertificate,
        image: { image: value },
      }));
    } else if (name === "description") {
      setNewCertificate((prevCertificate) => ({
        ...prevCertificate,
        description: { text: value },
      }));
    } else {
      setNewCertificate((prevCertificate) => ({
        ...prevCertificate,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addCertificate(userName, newCertificate);
    navigate(`/portfolio/${userName}`);
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-3xl text-white font-bold mb-6">Agregar Nuevo Certificado</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Nombre del Certificado</label>
          <input
            type="text"
            name="name"
            value={newCertificate.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-600 rounded bg-gray-900 text-white"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Descripción</label>
          <textarea
            name="description"
            value={newCertificate.description.text}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-600 rounded bg-gray-900 text-white"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">URL de la Imagen</label>
          <input
            type="text"
            name="image"
            value={newCertificate.image.image}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-600 rounded bg-gray-900 text-white"
            placeholder="URL de la imagen del certificado"
          />
        </div>
        <button
          type="submit"
          className="w-full mt-4 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 font-semibold"
        >
          Agregar Certificado
        </button>
      </form>
    </div>
  );
};

export default AddCertificateForm;
