import React, { useState } from "react";
import arrow from "../../../../assets/arrow.png";
import PatientAidantModal from "./PatientAidantModal";

const ThirdComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Empêcher le scroll sur le corps quand le modal est ouvert
  React.useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  return (
    <div className="flex flex-col items-center mb-6 mt-4 sm:mt-10 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="w-full text-center items-center mt-5 mb-5">
        {/* Conteneur en deux colonnes pour desktop */}
        <div className="flex flex-col xl:flex-row items-center justify-center md:gap-x-10">
          {/* Première colonne : titre, centré verticalement */}
          <div className="min-w-fit flex items-center justify-center xl:mb-0 mb-4">
            <h2 className="text-[#F5943A] font-confiteria text-2xl sm:text-3xl md:text-4xl">
              Vous êtes patient-aidant ?
            </h2>
          </div>
          {/* Deuxième colonne : trois paires alignées en une seule ligne chacune */}
          <div className="min-w-fit">
            {/* Première paire */}
            <div className="flex items-center mb-3">
              <div className="w-10 flex justify-center mr-2">
                <img
                  src={arrow}
                  alt="Tous ensemble"
                  className="w-full h-auto"
                />
              </div>
              <div className="flex-1 text-left">
                <p className="text-base xl:text-lg text-[#0E3043]">
                  Réalisez des contenus en partenariat avec GoHope
                </p>
              </div>
            </div>
            {/* Deuxième paire */}
            <div className="flex items-center mb-3">
              <div className="w-10 flex justify-center mr-2">
                <img
                  src={arrow}
                  alt="Tous ensemble"
                  className="w-full h-auto"
                />
              </div>
              <div className="flex-1 text-left">
                <p className="text-base xl:text-lg text-[#0E3043]">
                  Partagez votre expérience et soutenez des personnes qui en ont
                  besoin
                </p>
              </div>
            </div>
            {/* Troisième paire */}
            <div className="flex items-center">
              <div className="w-10 flex justify-center mr-2">
                <img
                  src={arrow}
                  alt="Tous ensemble"
                  className="w-full h-auto"
                />
              </div>
              <div className="flex-1 text-left">
                <p className="text-base xl:text-lg text-[#0E3043]">
                  Augmentez la visibilité de votre activité
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bouton en dessous */}
        <div className="flex justify-center mt-6 sm:mt-10">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto sm:min-w-[200px] bg-[#F5943A] hover:bg-[#F1731F] text-white py-2 px-4 sm:px-6 rounded-lg shadow-md transition duration-300 text-base sm:text-lg"
          >
            Devenir patient aidant
          </button>
        </div>
      </div>

      {isModalOpen && (
        <PatientAidantModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ThirdComponent;
