import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";

const Step1 = ({ handleNextStep }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      {/* Zone du logo */}
      <div className="mb-8">
        <img src={logo} alt="Logo" />
      </div>
      {/* Zone des boutons */}
      <div className="flex space-x-4 justify-center">
        <button
          onClick={handleNextStep}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Suivant
        </button>
        <button
          onClick={() => navigate("/login")}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        >
          Devenir patient-aidant
        </button>
      </div>
    </div>
  );
};

export default Step1;
