import React, { useEffect } from "react";
import { usePortfolioStore } from "../store/portfolioStore.js";
import { useAuthStore } from "../store/authStore.js";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/connection.js"
import SkillList from "../components/SkillList";

const SkillsSection = ({ userName }) => {
  const { skillsSection, fetchSection, deleteItem, isLoading, error } = usePortfolioStore();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const isOwner = isAuthenticated && user?.userName === userName;
  const skills = skillsSection?.skills ?? [];

  const handleDeleteTechnology = technologyId => {
    if (
      window.confirm(
        "¿Estás seguro de que quieres eliminar esta tecnología?"
      )
    ) {
      deleteItem(userName, technologyId, "/delete/technology", "technologySection", "technologies");
    }
  };

  useEffect(() => {
    if (userName) {
      fetchSection(userName, "skillsSection", "/skills");
    }
  }, [userName]);

  if (isLoading) return <p>Cargando tecnologías...</p>;
  if (error) return <p>{error}</p>;
  if (skills.length === 0) return null

  console.log(skills)

  return (
    <section className="relative w-full min-h-screen grid place-items-center pb-80">
      <div className="w-full space-y-16">
        <h2 className="font-poppins text-4xl text-dark font-bold dark:text-white mt-8">
          Habilidades
        </h2>

        <div className="flex justify-center">
          <SkillList skills={skills} size="md" />
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
