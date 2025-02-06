import React from "react";
import { FaArrowLeft } from "react-icons/fa"; // Import de l'icône de flèche
import welcome from "../../../assets/welcomeStep2.png";
import ProgressBar from "../../../utils/form/ProgressBar";

const Step3 = ({ handleNextStep, handlePreviousStep }) => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center relative p-9">
      {/* Flèche de retour en haut à gauche */}
      <div className="absolute top-4 left-0">
        <button
          onClick={handlePreviousStep}
          className="text-2xl text-blue-500 hover:text-blue-600 ml-4"
        >
          <FaArrowLeft />
        </button>
      </div>
      {/* Contenu de la Step3 */}
      <div className="mb-8">
        <img src={welcome} alt="Bienvenue" className="w-full max-w-md" />
      </div>
      <h1 className="text-3xl font-bold text-[#0E3043] text-center mb-4">
        Accédez à des informations sur la SEP
      </h1>
      <p className="text-xl text-[#0E3043] text-center mb-10 mt-4">
        Réalisez et/ou regardez des contenus multimédia, Masterclass, vidéo-
        conférences pour aider nos patient·e·s.
      </p>
      {/* Barre de progression */}
      <div className="w-full max-w-md mb-6">
        <ProgressBar totalSteps={3} currentStep={2} />
      </div>
      {/* Bouton principal */}
      <div className="flex justify-center mt-40">
        <button
          onClick={handleNextStep}
          className=" w-sm bg-[#F5943A] hover:bg-[#F1731F] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default Step3;
