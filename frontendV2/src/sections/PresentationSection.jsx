import React, { useEffect, useState } from "react";
import { usePortfolioStore } from "../store/portfolioStore";
import { useAuthStore } from "../store/authStore";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/connection.js"

const presentationSectionSection = ({ userName }) => {
  const {presentationSection, fetchSection, isLoading, error} = usePortfolioStore();
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const isOwner = isAuthenticated && user?.userName === userName;

  useEffect(() => {
    if (userName) {
      fetchSection(userName, "presentationSection", "/presentation");
    }
  }, [userName]);

  if (isLoading) return <p>Cargando Proyectos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {presentationSection ? (
        <>
          <h1>{presentationSection.fullName}</h1>
          <p>{presentationSection.role}</p>
        </>
      ) : (
        <p>No hay datos de presentación</p>
      )}
    </div>
  );
};

export default presentationSectionSection;
