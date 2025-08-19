import React, { useEffect, useState } from "react";
import { usePortfolioStore } from "../store/portfolioStore";
import { useAuthStore } from "../store/authStore";
import { motion } from "framer-motion";
import DividerWithText from "../components/DividerWithText"
import { useNavigate } from "react-router-dom";
import Input from "../components/input";
import Button from "../components/Button";

const contactSectionSection = ({ userName }) => {
  const { sendContactMessage, isLoading, error } = usePortfolioStore();
  const { user, isAuthenticated } = useAuthStore();
  const isOwner = isAuthenticated && user?.userName === userName;

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
    await sendContactMessage(userName, formData);
  };

  if (isLoading) return <p>Cargando contactSectiono...</p>;
  if (error) return <p>{error}</p>;

  return (

    <section className="relative w-full grid place-items-center pb-20">

      <DividerWithText text="Contactame" size="4xl" bold={true} />

      <form onSubmit={handleSubmit} className="mt-12 w-full max-w-lg mx-auto flex flex-col gap-6">
        <Input
          name="name"
          type="text"
          placeholder="Nombre Completo"
          onChange={handleChange}
        />

        <Input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <Input
          name="subject"
          type="text"
          placeholder="Asunto"
          onChange={handleChange}
        />

        <Input
          as="textarea"
          name="message"
          rows={6}
          placeholder="Mensaje"
          onChange={handleChange}
        />

        <Button type="submit">
          Enviar
        </Button>
      </form>
    </section>
  );
};

export default contactSectionSection;
