import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/Logo.png";

const Step1 = ({ handleNextStep }) => {
  const navigate = useNavigate();

  return (
    <div className="step-container flex flex-col w-full min-h-screen items-center justify-center ">
      {/* Zone du logo avec marge supérieure */}
      <div className="step-bg-mobile mt-20 mb-8 p-14">
        <img className="w-full max-w-lg h-auto" src={logo} alt="Logo" />
      </div>
      {/* Zone d'information */}
      <h1 className="text-[#0E3043] text-center mb-4" id="step1-title">
        Application d’aide aux personnes souffrantes de la Sclérose en plaques
      </h1>

      {/* Zone des boutons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-5 w-full p-5">
        <button
          onClick={handleNextStep}
          className="w-full sm:w-[300px] bg-[#F5943A] hover:bg-[#F1731F] text-white py-2 px-2 rounded-lg shadow-md transition duration-300 text-lg"
        >
          Créer un compte
        </button>
        <button
          onClick={() => navigate("/connexion ")}
          className="w-full sm:w-[300px] bg-[#F5943A] hover:bg-[#F1731F] text-white py-2 px-2 rounded-lg text-lg"
        >
          Connexion
        </button>
      </div>
    </div>
  );
};

export default Step1;
