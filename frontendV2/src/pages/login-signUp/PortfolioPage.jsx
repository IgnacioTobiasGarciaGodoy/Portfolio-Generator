import { useParams } from "react-router-dom";
import AboutMeSection from "../../sections/AboutMeSection"
import CareerSection from "../../sections/CareerSection"
import PresentationSection from "../../sections/PresentationSection"
import ProjectsSection from "../../sections/ProjectsSection"
import TechnologiesSection from "../../sections/TechnologiesSection"
import ContactSection from "../../sections/ContactSection"
import NavBar from "../../components/NavBar";
import { useAuthStore } from "../../store/authStore";

const PortfolioPage = () => {
  const { userName } = useParams();
  const { isAuthenticated } = useAuthStore();

  const SECTIONS = [
    PresentationSection,
    AboutMeSection,
    CareerSection,
    ProjectsSection,
    // TechnologiesSection,
    ContactSection
  ]

  return (
    <>
      {isAuthenticated && <NavBar />}
      {/* Contenedor central + gutters responsivos */}
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {SECTIONS.map((Section, index) => (
          <Section key={index} userName={userName} />
        ))}
      </main>
    </>
  );
};

export default PortfolioPage;
