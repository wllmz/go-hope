import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";

const Step1 = ({ handleNextStep }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      {/* Zone du logo */}
      <div className="mb-8">
        <img class="h-auto max-w-full" src={logo} alt="Logo" />
      </div>
      {/* Zone des boutons */}
      <div className="flex space-x-4 justify-center mt-10">
        <button
          onClick={handleNextStep}
          className="w-sm bg-[#F5943A] hover:bg-[#F1731F] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
        >
          Suivant
        </button>
        <button
          onClick={() => navigate("/login")}
          className=" w-sm bg-[#F1731F] hover:bg-[#F5943A] text-white py-2 px-4 rounded-lg font-semibold "
        >
          Devenir patient-aidant
        </button>
      </div>
    </div>
  );
};

export default Step1;
