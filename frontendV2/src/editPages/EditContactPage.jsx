import React, { useState, useEffect } from "react";
import { usePortfolioStore } from "../store/portfolioStore";
import { useAuthStore } from "../store/authStore";
import { useParams, useNavigate } from "react-router-dom";

const EditContactPage = () => {
  const { userName } = useParams();
  const { contactSection, fetchContactSection, editSection } =
    usePortfolioStore();
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const [contactData, setContactData] = useState({
    sectionTitle: { text: "" },
    mailTitle: { text: "" },
    mail: { text: "" },
    linkdinTitle: { text: "" },
    linkedin: { text: "", link: "" },
    githubTitle: { text: "" },
    github: { text: "", link: "" },
    phoneTitle: { text: "" },
    phone: { text: "" },
    locationTitle: { text: "" },
    location: { text: "" },
    bodyText: { text: "" },
  });

  const labels = {
    sectionTitle: "Título de la Sección",
    mailTitle: "Título de Email",
    mail: "Correo Electrónico",
    linkdinTitle: "Título de LinkedIn",
    linkedin: "Enlace de LinkedIn",
    githubTitle: "Título de GitHub",
    github: "Enlace de GitHub",
    phoneTitle: "Título de Teléfono",
    phone: "Teléfono",
    locationTitle: "Título de Ubicación",
    location: "Ubicación",
    bodyText: "Texto del Cuerpo",
  };

  useEffect(() => {
    fetchContactSection(userName);
  }, [userName, fetchContactSection]);

  useEffect(() => {
    if (contactSection) {
      setContactData(contactSection);
    }
  }, [contactSection]);

  useEffect(() => {
    if (isAuthenticated && user?.userName !== userName) {
      navigate(`/portfolio/${userName}`);
    }
  }, [isAuthenticated, user, userName, navigate]);

  const handleChange = e => {
    const { name, value } = e.target;
    setContactData(prevData => {
      const updatedData = { ...prevData };
      const keys = name.split(".");
      if (keys.length === 2) {
        updatedData[keys[0]][keys[1]] = value;
      } else {
        updatedData[name].text = value;
      }
      return updatedData;
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await editSection(userName, "contactSection" , contactData, "edit/contact");
    navigate(`/portfolio/${userName}`);
  };

  const handleCancel = async e => {
    e.preventDefault();
    navigate(`/portfolio/${userName}`);
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-3xl text-white font-bold mb-6">
        Editar Información de Contacto
      </h1>
      <form onSubmit={handleSubmit}>
        {[
          "sectionTitle",
          "bodyText",
          "mail",
          "phone",
          "location",
          "linkedin",
          "github",
        ].map(field => (
          <div key={field} className="mb-6">
            <label className="block text-gray-300 mb-2">
              {labels[field] || field.replace(/([A-Z])/g, " $1")}
            </label>
            {field === "bodyText" ? (
              <textarea
                name={field}
                value={contactData[field]?.text || ""}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-600 rounded bg-gray-900 text-white"
                placeholder={`Editar ${
                  labels[field] || field.replace(/([A-Z])/g, " $1")
                }`}
                rows={4}
              />
            ) : (
              <input
                type="text"
                name={field}
                value={
                  field.includes("link")
                    ? contactData[field]?.link || ""
                    : contactData[field]?.text || ""
                }
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-600 rounded bg-gray-900 text-white"
                placeholder={`Editar ${
                  labels[field] || field.replace(/([A-Z])/g, " $1")
                }`}
              />
            )}
          </div>
        ))}
      </form>
      <button
        onClick={handleSubmit}
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

export default EditContactPage;
