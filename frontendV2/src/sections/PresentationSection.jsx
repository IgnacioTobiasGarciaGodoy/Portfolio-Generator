import React, { useEffect, useState } from "react";
import { usePortfolioStore } from "../store/portfolioStore";
import { useAuthStore } from "../store/authStore";
import { Pencil, Github, Linkedin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/connection.js"

const presentationSectionSection = ({ userName }) => {
  const { presentationSection, fetchSection, isLoading, error } = usePortfolioStore();
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
    <section className="relative w-full min-h-screen grid place-items-center pb-8">
      <div>
        {presentationSection ? (
          <div className="flex flex-col items-center text-center space-y-6">
            {presentationSection.photoUrl && (
              <img
                src={presentationSection.photoUrl}
                alt="User Photo"
                className="w-80 h-80 rounded-full object-cover"
              />
            )}

            <h1 className="font-poppins text-5xl text-dark dark:text-white font-extrabold">
              {presentationSection.fullName}
            </h1>

            {presentationSection.role && (
              <div className="flex items-center">
                <small className="text-3xl font-poppins font-semibold text-gray-500 dark:text-gray-400">
                  {presentationSection.role}
                </small>
              </div>
            )}

            <div className="flex space-x-8 mt-2">
              {presentationSection.githubUrl && (
                <a
                  href={presentationSection.githubUrl}
                  className="dark:text-white text-black hover:text-gray-400 dark:hover:text-gray-200"
                >
                  <Github size={28} />
                </a>
              )}
              {presentationSection.linkedinUrl && (
                <a
                  href={presentationSection.linkedinUrl}
                  className="dark:text-white text-black hover:text-gray-400 dark:hover:text-gray-200"
                >
                  <Linkedin size={28} />
                </a>
              )}
            </div>

            <div className="w-10/12 mx-auto border-b-2 border-black dark:border-gray-300 mt-8"></div>

          </div>
        ) : (
          <p>No hay datos de presentación</p>
        )
        }
      </div >
    </section>
  );
};

export default presentationSectionSection;
