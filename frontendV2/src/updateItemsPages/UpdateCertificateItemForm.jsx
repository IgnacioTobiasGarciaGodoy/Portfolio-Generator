import React, { useState, useEffect } from "react";
import { usePortfolioStore } from "../store/portfolioStore";
import { useParams, useNavigate } from "react-router-dom";

const EditCertificateForm = () => {
  const { userName, certificateId } = useParams();
  const {
    certificateSection,
    fetchSection,
    editItem,
  } = usePortfolioStore();
  const navigate = useNavigate();

  const [editedCertificate, setEditedCertificate] = useState({
    name: { text: "" },
    image: { url: "" },
    description: { text: "" },
  });

  useEffect(() => {
    if (!certificateSection) {
      fetchSection(userName, "certificateSectio", "/certificates");
    } else {
      const certificate = certificateSection.certificates.find(
        cert => cert._id === certificateId
      );
      if (certificate) {
        setEditedCertificate({
          name: { text: certificate.name.text || "" },
          image: { url: certificate.image.url || "" },
          description: { text: certificate.description.text || "" },
        });
      }
    }
  }, [certificateId, certificateSection, userName, fetchSection]);

  const handleChange = e => {
    const { name, value } = e.target;

    if (name === "image") {
      setEditedCertificate(prevCertificate => ({
        ...prevCertificate,
        image: { url: value },
      }));
    } else if (name === "description") {
      setEditedCertificate(prevCertificate => ({
        ...prevCertificate,
        description: { text: value },
      }));
    } else {
      setEditedCertificate(prevCertificate => ({
        ...prevCertificate,
        name: { text: value },
      }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await editItem(userName, certificateId, '/edit/certificate', editedCertificate, 'certificateSection', 'certificate');
    navigate(`/portfolio/${userName}`);
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-3xl text-white font-bold mb-6">
        Editar Certificado
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">
            Nombre del Certificado
          </label>
          <input
            type="text"
            name="name"
            value={editedCertificate.name.text}
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
            value={editedCertificate.description.text}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-600 rounded bg-gray-900 text-white"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">
            URL de la Imagen
          </label>
          <input
            type="text"
            name="image"
            value={editedCertificate.image.url}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-600 rounded bg-gray-900 text-white"
            placeholder="URL de la imagen del certificado"
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

export default EditCertificateForm;