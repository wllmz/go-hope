import React from "react";
import bg from "../../../../assets/papillon-blanc.png";
import arrow from "../../../../assets/arrow.png";

const FirstComponent = () => {
  return (
    <div className="flex flex-col  items-center mb-6 mt-4 sm:mt-15 ">
      <div className="w-full text-center items-center mt-5 mb-5">
        {/* Conteneur en deux colonnes pour desktop */}
        <div className="flex flex-col xl:flex-row items-center justify-center md:gap-x-10 ">
          {/* Première colonne : titre, centré verticalement */}
          <div className="min-w-fit flex items-center justify-center xl:ml-50">
            <h2 className="text-[#F5943A] font-confiteria mt-2 mb-6">
              Vous êtes patient-aidant ?
            </h2>
          </div>
          {/* Deuxième colonne : trois paires alignées en une seule ligne chacune */}
          <div className="min-w-fit">
            {/* Première paire */}
            <div className="flex items-center">
              <div className="w-12 flex justify-center mr-2 ml-4">
                <img
                  src={arrow}
                  alt="Tous ensemble"
                  className="w-full h-auto mr-2"
                />
              </div>
              <div className="flex-1 text-left">
                <p className="text-base xl:text-lg text-[#0E3043] mt-2 mb-2">
                  Réalisez des contenus en partenariat avec GoHope
                </p>
              </div>
            </div>
            {/* Deuxième paire */}
            <div className="flex items-center">
              <div className="w-12 flex justify-center mr-2 ml-4">
                <img
                  src={arrow}
                  alt="Tous ensemble"
                  className="w-full h-auto mr-2"
                />
              </div>
              <div className="flex-1 text-left">
                <p className="text-base xl:text-lg text-[#0E3043] mt-2 mb-2">
                  Partagez votre expérience et soutenez des personnes qui en ont
                  besoin
                </p>
              </div>
            </div>
            {/* Troisième paire */}
            <div className="flex items-center">
              <div className="w-12 flex justify-center mr-2 ml-4">
                <img
                  src={arrow}
                  alt="Tous ensemble"
                  className="w-full h-auto mr-2"
                />
              </div>
              <div className="flex-1 text-left">
                <p className="text-base xl:text-lg text-[#0E3043] mt-2 mb-2">
                  Augmentez la visibilité de votre activité
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bouton en dessous */}
        <div className="flex justify-center mt-10">
          <button
            // onClick={handleNextStep}
            className="w-sm sm:w-[300px] bg-[#F5943A] hover:bg-[#F1731F] text-white font-semibold py-2 px-2 rounded-lg shadow-md transition duration-300 text-lg"
          >
            Découvrir le projet
          </button>
        </div>
      </div>
    </div>
  );
};

export default FirstComponent;
