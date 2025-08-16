import React, { useEffect } from "react";
import { usePortfolioStore } from "../store/portfolioStore";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";

const AboutMeSection = ({ userName }) => {
  const { aboutMeSection, fetchSection, isLoading, error } = usePortfolioStore();
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
    <section className="relative w-full min-h-screen grid place-items-center pb-80">
      <div className="w-full">
        <h2 className="font-poppins text-4xl text-dark font-bold dark:text-white mt-8">
          Acerca de mí
        </h2>
        <p className="font-poppins text-lg font-light text-dark dark:text-white mt-4 leading-relaxed max-w-7xl">
          {aboutMeSection?.text ?? ""}
        </p>
      </div>
    </section>
  );
};

export default AboutMeSection;