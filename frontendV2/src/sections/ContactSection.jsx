import React, { useEffect, useState } from "react";
import { usePortfolioStore } from "../store/portfolioStore";
import { useAuthStore } from "../store/authStore";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Pencil } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const contactSectionSection = ({ userName }) => {
  const { contactSection, fetchContactSection, isLoading, error } =
    usePortfolioStore();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const isOwner = isAuthenticated && user?.userName === userName;

  useEffect(() => {
    if (userName) {
      fetchContactSection(userName);
    }
  }, [userName]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:4000/portfolio/${userName}/send-email`,
        {
          ...formData,
          userEmail: contactSection?.mail.text || "info@example.com",
        }
      );
      toast.success("Mensaje enviado correctamente");
    } catch (error) {
      toast.error("Lo lamento! No he podido enviar el email");
      console.log(error.message);
    }
  };

  if (isLoading) return <p>Cargando contactSectiono...</p>;
  if (error) return <p>{error}</p>;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mb-8"
    >
      <div className="mt-6">
        <div className="grid sm:grid-cols-2 items-start gap-14 p-8 mx-auto max-w-4xl bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md font-[sans-serif]">
          <div>
            <h1 className="text-gray-800 text-3xl font-extrabold">
              {contactSection
                ? contactSection.sectionTitle.text
                : "Contact Section"}
              {isOwner && (
                <Pencil
                  onClick={() =>
                    navigate(`/portfolio/${userName}/edit-contact`)
                  }
                  className="ml-4 inline-block cursor-pointer text-black hover:text-blue-600"
                  size={24}
                />
              )}
            </h1>
            <p className="text-sm text-gray-500 mt-4">
              Me encantaría escuchar sobre tu proyecto y cómo podría
              ayudarte. Por favor, completa el formulario y te
              responderé lo antes posible.
            </p>

            <div className="mt-12">
              <h2 className="text-gray-800 text-base font-bold">
                Email
              </h2>
              <ul className="mt-4">
                <li className="flex items-center">
                  <div className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                    <Mail size={20} color="#007bff" />
                  </div>
                  <a
                    href={`mailto:${
                      contactSection?.mail.text || "info@example.com"
                    }`}
                    className="text-[#007bff] text-sm ml-4"
                  >
                    <strong>
                      {contactSection?.mail.text ||
                        "info@example.com"}
                    </strong>
                  </a>
                </li>
              </ul>
            </div>

            <div className="mt-12">
              <h2 className="text-gray-800 text-base font-bold">
                Socials
              </h2>
              <ul className="flex mt-4 space-x-4">
                <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <a
                    href={contactSection?.linkedin?.text || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin size={20} color="#007bff" />
                  </a>
                </li>
                <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <a
                    href={contactSection?.github?.text || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={20} color="#007bff" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="ml-auto space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              className="w-full text-gray-800 rounded-md py-2.5 px-4 border text-sm outline-blue-500"
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full text-gray-800 rounded-md py-2.5 px-4 border text-sm outline-blue-500"
              onChange={handleChange}
            />
            <input
              type="text"
              name="subject"
              placeholder="Asunto"
              className="w-full text-gray-800 rounded-md py-2.5 px-4 border text-sm outline-blue-500"
              onChange={handleChange}
            />
            <textarea
              placeholder="Mensaje"
              name="message"
              rows="6"
              className="w-full text-gray-800 rounded-md px-4 border text-sm pt-2.5 outline-blue-500"
              onChange={handleChange}
            />
            <button
              type="submit"
              className="text-white bg-blue-500 hover:bg-blue-600 rounded-md text-sm px-4 py-3 w-full mt-6"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </motion.section>
  );
};

export default contactSectionSection;
