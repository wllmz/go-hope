import React from "react";
import welcome from "../../../assets/welcomeStep3.png";
import ProgressBar from "../../../utils/form/ProgressBar";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Step4 = ({ handlePreviousStep }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen items-center justify-center relative p-5 ">
      <div className="absolute top-16 left-0">
        <button
          onClick={handlePreviousStep}
          className="text-2xl text-[#1D5F84] hover:text-[#164c6d] ml-4"
        >
          <FaArrowLeft />
        </button>
      </div>
      {/* Zone de l'image */}
      <div className="mb-8">
        <img src={welcome} alt="Bienvenue" className="w-full max-w-55 h-auto" />
      </div>
      <h1 className="text-[20px] sm:text-3xl font-bold text-[#0E3043] text-center mb-4">
        Participez à des échanges
      </h1>
      <p className="text-[16px] sm:text-xl text-[#0E3043] text-center mb-5 mt-4">
        Dialoguez directement avec des patient·e·s atteint de la sclérose en
        plaque, afin de partager des informations et des conseils
      </p>
      {/* Barre de progression */}
      <div className="w-full max-w-md mb-6">
        <ProgressBar totalSteps={3} currentStep={3} />
      </div>
      {/* Zone du bouton */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-5 w-full p-5">
        <button
          onClick={() => navigate("/inscription")}
          className="w-full sm:w-lg bg-[#F5943A] hover:bg-[#F1731F] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
        >
          S'inscrire
        </button>
      </div>
    </div>
  );
};

export default Step4;
