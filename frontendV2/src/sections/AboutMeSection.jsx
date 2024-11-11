import React, { useEffect } from "react";
import { usePortfolioStore } from "../store/portfolioStore";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";

const AboutMeSection = ({ userName }) => {
  const { aboutMeSection, fetchSection, isLoading, error } =
    usePortfolioStore();
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const isOwner = isAuthenticated && user?.userName === userName;

  useEffect(() => {
    if (userName) {
      fetchSection(userName, "aboutMeSection", "/aboutme");
    }
  }, [userName]);

  if (isLoading) return <p>Cargando Información...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="text-4xl text-white font-bold dark:text-white mt-8">
        {aboutMeSection?.sectionTitle?.text || "About Me Section"}
        {isOwner && (
          <Pencil
            onClick={() =>
              navigate(`/portfolio/${userName}/edit-aboutme`)
            }
            className="ml-4 inline-block cursor-pointer text-white hover:text-blue-600"
            size={24}
          />
        )}
      </h2>
      <p className="text-lg font-medium text-gray-300 dark:text-white mt-4 leading-relaxed max-w-7xl">
        {aboutMeSection?.bodyText?.text ||
          "No hay información disponible sobre mí."}
      </p>
    </div>
  );
};

export default AboutMeSection;