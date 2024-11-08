"use client";
import React, { useState, useEffect } from "react";
import {
  ExternalLink,
  Github,
  Trash2,
  Pencil,
  Plus,
  FilePenLine,
} from "lucide-react";
import { usePortfolioStore } from "../store/portfolioStore";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const ProjectsSection = ({ userName }) => {
  const {
    projectSection,
    fetchProjectSection,
    deleteProject,
    isLoading,
    error,
  } = usePortfolioStore();
  const [hoveredProject, setHoveredProject] = useState(null);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const isOwner = isAuthenticated && user?.userName === userName;

  const handleDeleteProject = projectId => {
    if (
      window.confirm(
        "¿Estás seguro de que quieres eliminar este proyecto?"
      )
    ) {
      deleteProject(userName, projectId);
    }
  };

  useEffect(() => {
    if (userName) {
      fetchProjectSection(userName);
    }
  }, [userName, fetchProjectSection]);

  if (isLoading)
    return <p className="text-center">Cargando Proyectos...</p>;
  if (error)
    return <p className="text-center text-red-500">{error}</p>;

  return (
    <section className="w-full pb-8">
      <div className="container mx-auto">
        <h2 className="text-4xl text-white font-bold text-left dark:text-white mt-8 mb-4">
          {projectSection
            ? projectSection.sectionTitle.text
            : "Projects Section"}
          {isOwner && (
            <>
              <Pencil
                onClick={() =>
                  navigate(`/portfolio/${userName}/edit-projects`)
                }
                className="ml-4 inline-block cursor-pointer text-white hover:text-blue-600"
                size={24}
              />
              <Plus
                onClick={() =>
                  navigate(`/portfolio/${userName}/add-project`)
                }
                className="ml-4 inline-block cursor-pointer text-white hover:text-blue-600"
                size={40}
              />
            </>
          )}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projectSection &&
          projectSection.projects &&
          projectSection.projects.length > 0 ? (
            projectSection.projects.map((project) => (
              <div
                key={project._id}
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden flex flex-col"
              >
                <a href={project.demoLink || "#"} target="_blank" rel="noopener noreferrer">
                  <img
                    className="w-full h-56 object-cover object-center rounded-t-lg"
                    src={project.image?.image || "/placeholder.svg?height=400&width=600"}
                    alt={project.name || "Project image"}
                  />
                </a>
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <a href={project.demoLink || "#"} target="_blank" rel="noopener noreferrer">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {project.name || "Project Name"}
                      </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-justify whitespace-normal break-words">
                      {project.description || "Project description"}
                    </p>
                  </div>
                  <div className="flex justify-between items-end">
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
                      >
                        Visit project
                        <svg
                          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </a>
                    )}
                    {isOwner && (
                      <div className="flex space-x-4 ml-auto">
                        <FilePenLine
                          onClick={() =>
                            navigate(`/portfolio/${userName}/edit-project/${project._id}`)
                          }
                          className="cursor-pointer text-green-400 hover:text-green-900"
                          size={20}
                        />
                        <Trash2
                          onClick={() => handleDeleteProject(project._id)}
                          className="cursor-pointer text-red-600 hover:text-red-900"
                          size={20}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-300 col-span-full">
              No hay proyectos disponibles.
            </p>
          )}
        </div>
      </div>
    </section>
  );
  
  
  
};

export default ProjectsSection;
