import React from "react";
import welcome from "../../../assets/welcomeStep1.png";
import ProgressBar from "../../../utils/form/ProgressBar";
import { FaArrowLeft } from "react-icons/fa";

const Step2 = ({ handleNextStep, handlePreviousStep }) => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center relative px-4 p-9">
      <div className="absolute top-4 left-0">
        <button
          onClick={handlePreviousStep}
          className="text-2xl text-blue-500 hover:text-blue-600 ml-4"
        >
          <FaArrowLeft />
        </button>
      </div>
      {/* Zone de l'image */}
      <div className="mb-8">
        <img src={welcome} alt="Bienvenue" className="w-54 sm:w-full" />
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-[#0E3043] text-center mb-4">
        Accédez au forum gratuitement
      </h1>
      <p className="text-lg sm:text-xl text-[#0E3043] text-center mb-10 mt-4">
        Profitez gratuitement de tous les accès au forum pour trouver des
        informations ou partager votre expérience.
      </p>
      {/* Barre de progression */}
      <div className="w-full max-w-md mb-6">
        <ProgressBar totalSteps={3} currentStep={1} />
      </div>
      {/* Zone du bouton */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 w-full p-5">
        <button
          onClick={handleNextStep}
          className="w-full sm:w-lg bg-[#F5943A] hover:bg-[#F1731F] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default Step2;
