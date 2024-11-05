import React, { useEffect } from "react";
import { usePortfolioStore } from "../store/portfolioStore";
import { useAuthStore } from "../store/authStore";
import { Pencil, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CertificatesSection = ({ userName }) => {
  const {
    certificateSection,
    fetchCertificateSection,
    isLoading,
    error,
  } = usePortfolioStore();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const isOwner = isAuthenticated && user?.userName === userName;

  useEffect(() => {
    if (userName) {
      fetchCertificateSection(userName);
    }
  }, [userName]);

  if (isLoading) return <p>Cargando Certificados...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <div>
        <h2 className="text-4xl text-white font-bold text-left dark:text-white mt-8 mb-4">
          {certificateSection
            ? certificateSection.sectionTitle.text
            : "Certificates Section"}
          {isOwner && (
            <>
              <Pencil
                onClick={() =>
                  navigate(`/portfolio/${userName}/edit-certificates`)
                }
                className="ml-4 inline-block cursor-pointer text-white hover:text-blue-600"
                size={24}
              />
              <Plus
                onClick={() =>
                  navigate(`/portfolio/${userName}/add-certificate`)
                }
                className="ml-4 inline-block cursor-pointer text-white hover:text-blue-600"
                size={40}
              />
            </>
          )}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificateSection?.certificates?.map((cert, index) => (
          <div
            key={index}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <img
              className="rounded-t-lg"
              src={cert.image?.image}
              alt={cert.name}
            />
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {cert.name}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {cert.description.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CertificatesSection;
