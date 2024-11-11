import React from "react";
import { useParams } from "react-router-dom";

import AboutMeSection from "../sections/AboutMeSection"
import ExperienceSection from "../sections/ExperienceSection"
import PresentationSection from "../sections/PresentationSection"
import ProjectsSection from "../sections/ProjectsSection"
import EducationSection from "../sections/EducationSection"
import CertificatesSection from "../sections/CertificatesSection"
import TechnologiesSection from "../sections/TechnologiesSection"
import ContactSection from "../sections/ContactSection"
import NavBar from "../components/NavBar";
import { useAuthStore } from "../store/authStore";

const PortfolioPage = () => {
  const { userName } = useParams();
  const { isAuthenticated } = useAuthStore();

  return (
    <>
      {isAuthenticated && (
        <NavBar/>
      )}
      <div className="flex justify-center">
        {/* Sección Presentation */}
        <div className="w-full max-w-5xl px-4">         
            <section className="relative w-full min-h-screen flex flex-col justify-center pb-8">
              <div className="flex justify-center mt-4">
                <PresentationSection userName={userName} />
              </div>
              <div className="w-2/3 mx-auto border-b border-gray-300 mt-8"></div>
            </section>

            {/* Sección About Me */}
            <section className="relative w-full pb-8">
              <div className="flex justify-start mt-4">
                <AboutMeSection userName={userName} />
              </div>
            </section>

            {/* Sección Experience */}
            <section className="relative w-full pb-8">
              <div className="flex justify-start mt-4">
                <ExperienceSection userName={userName} />
              </div>
            </section>

            {/* Sección Projects */}
            <section className="relative w-full pb-8">
              <div className="flex justify-center mt-4">
                <ProjectsSection userName={userName} />
              </div>
            </section>

            {/* Sección Education */}
            <section className="relative w-full pb-8">
              <div className="flex justify-start mt-4">
                <EducationSection userName={userName} />
              </div>
            </section>

            {/* Sección Certificados */}
            <section className="relative w-full pb-8">
              <div className="flex justify-start mt-4">
                <CertificatesSection userName={userName} />
              </div>
            </section>

            {/* Sección Technologias */}
            <section className="relative w-full pb-8">
              <div className="flex justify-start mt-4">
                <TechnologiesSection userName={userName} />
              </div>
            </section>

            {/* Sección Contacto */}
            <section className="relative w-full pb-8">
              <div className="flex justify-start mt-4">
                <ContactSection userName={userName} />
              </div>
            </section>
          </div>
      </div>
    </>
  );
};

export default PortfolioPage;
