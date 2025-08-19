"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  ExternalLink,
  Github,
  Trash2,
  Pencil,
  Plus,
  FilePenLine,
} from "lucide-react";
import { animate, motion } from "framer-motion";
import { usePortfolioStore } from "../store/portfolioStore";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/connection.js"
import Button from "../components/Button.jsx";
import Tag from "../components/Tag.jsx";
import NeoButton from "../components/NeoButton.jsx";

const ProjectsSection = ({ userName }) => {
  const { projectSection, fetchSection, deleteItem, isLoading, error } = usePortfolioStore();
  const [hoveredProject, setHoveredProject] = useState(null);
  const [tech, setTech] = useState("Todos");
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const isOwner = isAuthenticated && user?.userName === userName;
  const prevIndex = useRef(0);
  const buttonsRef = useRef([]);
  const [index, setIndex] = useState(0);
  const projects = projectSection?.projects ?? [];

  const handleDeleteProject = projectId => {
    if (
      window.confirm(
        "¿Estás seguro de que quieres eliminar este proyecto?"
      )
    ) {
      deleteItem(userName, projectId, "/delete/project", "projectSection", "projects");
    }
  };

  const handleClick = () => {
    const prevButton = buttonsRef.current[prevIndex.current];
    const currentButton = buttonsRef.current[index];
    if (!prevButton || !currentButton) return; // <-- FIX: Evitamos error cuando los refs son undefined
    animate(prevButton, { opacity: 0.5, scale: 1 });
    animate(currentButton, { opacity: 1, scale: 1.2 });
  };

  const filteredButtons = [
    "Todos",
    ...Array.from(
      new Set(
        projects.flatMap(p => Array.isArray(p.technologies) ? p.technologies : [])
      )
    ),
  ];

  const filteredProjects = tech === "Todos" ? projects : projects.filter(p => p.technologies?.includes(tech));

  useEffect(() => {
    handleClick();
    prevIndex.current = index;
  }, [index, handleClick]);

  useEffect(() => {
    if (userName) {
      fetchSection(userName, "projectSection", "/projects");
    }
  }, [userName]);

  if (isLoading) return <p className="text-center">Cargando Proyectos...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (projects.length === 0) return null;

  return (
    <section className="relative w-full min-h-screen grid place-items-center pb-80">
      <div className="w-full space-y-16">
        <h2 className="font-poppins text-4xl text-dark font-bold dark:text-white mt-8">
          Proyectos
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-4 py-10 px-2 overflow-x-auto">
          {filteredButtons.map((text, i) => (
            <NeoButton
              onClick={() => { setTech(text); setIndex(i); }}
              size="lg"
              selected={i === index}
            >
              {text}
            </NeoButton>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mx-auto">
          {filteredProjects.map((project, index) => (
            <div
              key={project._id || index}
              className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{ height: "400px", width: "100%" }}
            >
              {isOwner && (
                <>
                  <FilePenLine
                    onClick={() =>
                      navigate(
                        `/portfolio/${userName}/edit/project/${project._id}`
                      )
                    }
                    className="absolute top-2 right-7 cursor-pointer text-green-400 hover:text-green-900 z-50"
                    size={20}
                  />
                  <Trash2
                    onClick={() => handleDeleteProject(project._id)}
                    className="absolute top-2 right-2 cursor-pointer text-red-600 hover:text-red-900 z-50"
                    size={20}
                  />
                </>
              )}
              <img
                src={project.imageUrl}
                alt={project.name}
                className="w-full h-full object-cover object-center"
              />
              <div
                className={`absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center p-6 transition-opacity duration-300 
                      ${hoveredProject === index ? "opacity-100" : "opacity-0"}`}
              >
                <h3 className="text-white font-poppins text-xl font-semibold mb-2">
                  {project.name}
                </h3>
                <p className="text-gray-300 font-poppins text-sm text-center mb-4">
                  {project.description || ""}
                </p>
                <div className="flex space-x-4">
                  {project.demoUrl && (

                    <Button href={project.demoUrl} size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button href={project.githubUrl} size="sm">
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;
