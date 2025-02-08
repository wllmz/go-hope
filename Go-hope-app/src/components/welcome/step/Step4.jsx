import React from "react";
import welcome from "../../../assets/welcomeStep3.png";
import ProgressBar from "../../../utils/form/ProgressBar";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Step4 = ({ handlePreviousStep }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen items-center justify-center px-4 relative p-9">
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
        Participez à des échanges
      </h1>
      <p className="text-lg sm:text-xl text-[#0E3043] text-center mb-10 mt-4">
        Dialoguez directement avec des patient·e·s atteint de la sclérose en
        plaque, afin de partager des informations et des conseils
      </p>
      {/* Barre de progression */}
      <div className="w-full max-w-md mb-6">
        <ProgressBar totalSteps={3} currentStep={3} />
      </div>
      {/* Zone du bouton */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 w-full p-5">
        <button
          onClick={() => navigate("/register")}
          className="w-full sm:w-lg bg-[#F5943A] hover:bg-[#F1731F] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
        >
          S'inscrire
        </button>
      </div>
    </div>
  );
};

export default Step4;
