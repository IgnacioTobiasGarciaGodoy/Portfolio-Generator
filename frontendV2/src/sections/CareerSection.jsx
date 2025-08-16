import React, { useEffect } from "react";
import { usePortfolioStore } from "../store/portfolioStore";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const CareerSection = ({ userName }) => {
  const { careerSection, fetchSection, isLoading, error } = usePortfolioStore();
  const { user, isAuthenticated } = useAuthStore();
  const items = careerSection?.items ?? [];
  const navigate = useNavigate();
  const isOwner = isAuthenticated && user?.userName === userName;

  const renderBullets = (bullets) => {
    return bullets.length > 1 ? (
      <ul className="list-disc pl-6 space-y-4 text-gray-800 dark:text-gray-300 leading-relaxed font-jakarta text-left h-full flex flex-col justify-center">
        {bullets.map((b, i) => <li key={i} className="font-roboto">{b}</li>)}
      </ul>
    ) : (
      <p className="font-jakarta text-gray-800 dark:text-gray-300 leading-relaxed text-left h-full flex items-center">
        {bullets[0]}
      </p>
    );
  };
  
  useEffect(() => {
    if (userName) { fetchSection(userName, "careerSection", "/career") }
  }, [userName, fetchSection]);

  if (isLoading) return <p>Cargando Experiencia...</p>;
  if (error) return <p>{error}</p>;
  if (items.length === 0) return null;

  return (
    <section className="relative w-full min-h-screen grid place-items-center pb-80">
      <div className="w-full space-y-16">
        <h2 className="font-poppins text-4xl text-dark font-bold dark:text-white mt-8">
          Experiencia y Educación
        </h2>
        {items.map((it, idx) => {
          const isEven = idx % 2 === 1;
          const bullets = String(it.description || "")
                .split(/(?:\n|•|\.)\s*/)
                .map(s => s.trim())
                .filter(Boolean);
          const gridCols = isEven
            ? "md:grid-cols-[1fr_1px_minmax(260px,360px)]"
            : "md:grid-cols-[minmax(260px,360px)_1px_1fr]";

          return (
            <div key={it._id} className={`grid gap-8 md:gap-12 ${gridCols} items-stretch h-full`}>
              <div className={`flex flex-col justify-center ${isEven ? 'md:pr-8' : ''} h-full`}>
                {isEven ? renderBullets(bullets) : (
                  <div className="flex flex-col justify-center space-y-4 h-full">
                    <h3 className="font-poppins text-3xl md:text-4xl font-bold text-dark dark:text-white break-words text-center">
                      {it.organization}
                    </h3>
                    <p className="font-poppins text-2xl md:text-3xl font-semibold text-gray-600 dark:text-gray-400 break-words text-center">
                      {it.title}
                    </p>
                    <hr className="w-3/4 border-t text-gray-500 dark:border-gray-300 self-center" />
                    <p className="font-poppins text-lg md:text-xl text-gray-400 text-center">
                      {it.startYear} – {it.endYear}
                    </p>
                  </div>
                )}
              </div>
              <div className="hidden md:block w-px bg-gray-300 h-full self-stretch" aria-hidden="true" />
              <div className={`flex flex-col justify-center ${isEven ? '' : 'md:pl-8'} h-full`}>
                {!isEven ? renderBullets(bullets) : (
                  <div className="flex flex-col justify-center space-y-4 h-full">
                    <h3 className="font-poppins text-3xl md:text-4xl font-bold text-dark dark:text-white break-words text-center">
                      {it.organization}
                    </h3>
                    <p className="font-poppins text-2xl md:text-3xl font-semibold text-gray-600 dark:text-gray-400 break-words text-center">
                      {it.title}
                    </p>
                    <hr className="w-3/4 border-t border-gray-300 self-center" />
                    <p className="font-poppins text-lg md:text-xl text-gray-500 dark:border-gray-300 text-center">
                      {it.startYear} – {it.endYear}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CareerSection;
