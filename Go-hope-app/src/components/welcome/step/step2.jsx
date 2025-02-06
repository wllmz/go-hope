import React from "react";
import welcome from "../../../assets/welcomeStep1.png";
import ProgressBar from "../../../utils/form/ProgressBar";

const Step1 = ({ handleNextStep }) => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center px-4 ">
      {/* Zone de l'image */}
      <div className="mb-8">
        <img src={welcome} alt="Bienvenue" className="w-full max-w-md" />
      </div>
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
        Accédez au forum gratuitement
      </h1>
      <p className="text-lg text-gray-600 text-center mb-8">
        Profitez gratuitement de tous les accès au forum pour trouver des
        informations ou partager votre expérience.
      </p>
      {/* Barre de progression */}
      <div className="w-full max-w-md mb-6">
        <ProgressBar totalSteps={3} currentStep={1} />
      </div>
      {/* Zone du bouton */}
      <div className="flex justify-center mt-40">
        <button
          onClick={handleNextStep}
          className=" w-sm bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-md transition duration-300"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default Step1;
