import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import check from "../../assets/check.png";

const verificationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="step-container flex flex-col w-full min-h-screen items-center justify-center">
      {/* Zone du logo avec marge supérieure */}
      <div className="step-bg-mobile mt-20 mb-8 p-10">
        <img className="h-auto  sm:w-xl" src={logo} alt="Logo" />
      </div>
      <img className="h-auto w-[50px]" src={check} alt="check" />
      <p className="text-lg sm:text-xl text-[#0E3043] text-center mb-10 mt-4">
        Votre compte a bien été créé !
      </p>
      {/* Zone des boutons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 w-full p-5">
        <button
          onClick={() => navigate("/accueil")}
          className="w-full sm:w-[300px] bg-[#F5943A] hover:bg-[#F1731F] text-white font-semibold py-2 px-2 rounded-lg shadow-md transition duration-300 text-lg"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default verificationPage;
