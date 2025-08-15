import { useParams } from "react-router-dom";
import AboutMeSection from "../../sections/AboutMeSection"
import ExperienceSection from "../../sections/ExperienceSection"
import PresentationSection from "../../sections/PresentationSection"
import ProjectsSection from "../../sections/ProjectsSection"
import EducationSection from "../../sections/EducationSection"
import CertificatesSection from "../../sections/CertificatesSection"
import TechnologiesSection from "../../sections/TechnologiesSection"
import ContactSection from "../../sections/ContactSection"
import NavBar from "../../components/NavBar";
import { useAuthStore } from "../../store/authStore";

const PortfolioPage = () => {
  const { userName } = useParams();
  const { isAuthenticated } = useAuthStore();

  const SECTIONS = [
    PresentationSection,
    // AboutMeSection,
    // ExperienceSection,
    // ProjectsSection,
    // EducationSection,
    // CertificatesSection,
    // TechnologiesSection,
    // ContactSection
  ]

  return (
    <>
      {isAuthenticated && (
        <NavBar/>
      )}
      <div className="flex justify-center">
        <div className="w-full max-w-5xl px-4">         
            {SECTIONS.map((Section, index) => (
              <section key={index} className="relative w-full min-h-screen flex flex-col justify-center pb-8">
                <div className="flex justify-start mt-4">
                  <Section userName={userName} />
                </div>
              </section>
            ))}
          </div>
      </div>
    </>
  );
};

export default PortfolioPage;
