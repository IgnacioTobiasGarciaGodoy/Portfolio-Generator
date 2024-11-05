import React, { useEffect } from "react";
import { usePortfolioStore } from "../store/portfolioStore";
import { useAuthStore } from "../store/authStore";
import { Pencil, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TechnologiesSection = ({ userName }) => {
  const {
    technologySection,
    fetchTechnologySection,
    isLoading,
    error,
  } = usePortfolioStore();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const isOwner = isAuthenticated && user?.userName === userName;

  useEffect(() => {
    if (userName) {
      fetchTechnologySection(userName);
    }
  }, [userName]);

  if (isLoading) return <p>Cargando tecnologías...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <div>
        <h2 className="text-4xl text-white font-bold text-left dark:text-white mt-8 mb-4">
          {technologySection
            ? technologySection.sectionTitle.text
            : "Technology Section"}
          {isOwner && (
            <>
              <Pencil
                onClick={() =>
                  navigate(`/portfolio/${userName}/edit-skills`)
                }
                className="ml-4 inline-block cursor-pointer text-white hover:text-blue-600"
                size={24}
              />
              <Plus
                onClick={() =>
                  navigate(`/portfolio/${userName}/add-technology`)
                }
                className="ml-4 inline-block cursor-pointer text-white hover:text-blue-600"
                size={40}
              />
            </>
          )}
        </h2>
      </div>

      <div className="flex justify-center gap-4 flex-wrap">
        {technologySection?.technologies?.map((tech, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-16 h-16 dark:bg-gray-800 flex items-center justify-center rounded-md shadow-lg">
              <img
                src={tech.image?.image}
                className="h-12 w-12 object-contain transition-all duration-300 rounded-lg filter grayscale hover:grayscale-0"
                alt={tech.name}
              />
            </div>
            <p className="text-base font-bold text-white dark:text-white mt-2">
              {tech.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechnologiesSection;