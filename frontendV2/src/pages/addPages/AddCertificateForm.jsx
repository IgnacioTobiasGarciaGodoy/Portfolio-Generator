import React, { useState } from "react";
import { usePortfolioStore } from "../store/portfolioStore";
import { useParams, useNavigate } from "react-router-dom";

const AddCertificateForm = () => {
  const { userName } = useParams();
  const { addItem } = usePortfolioStore();
  const navigate = useNavigate();

  const [newCertificate, setNewCertificate] = useState({
    name: { text: "" },
    image: { url: "" },
    description: { text: "" },
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    if (name === "image" && files && files[0]) {
      setNewCertificate((prevCertificate) => ({
        ...prevCertificate,
        image: files[0],
      }));
    } else if (name === "description") {
      setNewCertificate((prevCertificate) => ({
        ...prevCertificate,
        description: { text: value },
      }));
    } else {
      setNewCertificate((prevCertificate) => ({
        ...prevCertificate,
        name: { text: value },
      }));
    }
  };  

  const handleSubmit = async e => {
    e.preventDefault();
    await addItem(
      userName,
      "/add/certificate",
      newCertificate,
      "certificateSection",
      "certificate"
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
        Agregar Nuevo Certificado
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">
            Nombre del Certificado
          </label>
          <input
            type="text"
            name="name"
            value={newCertificate.name.text}
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
            value={newCertificate.description.text}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-600 rounded bg-gray-900 text-white"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">
            Imagen del Certificado
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
          Agregar Certificado
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

export default AddCertificateForm;
