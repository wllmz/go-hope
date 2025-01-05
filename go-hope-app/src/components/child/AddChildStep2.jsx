import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVenus, faMars } from "@fortawesome/free-solid-svg-icons"; // Icônes pour Féminin et Masculin

const ChildStep2 = ({
  name_child,
  setName_child,
  gender,
  setGender,
  handleChildCreation,
  handleNextStep,
  error,
}) => {
  return (
    <div>
      <h1 className="text-[#0a3d64] text-[28px] sm:text-[30px] md:text-[33px] lg:text-[35px] text-center mb-9 mt-8">
        Commençons l’aventure
      </h1>
      <p className="text-[#0a3d64] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] text-center mb-10 mt-10">
        Parlez nous de votre enfant
      </p>

      {/* Champ prénom */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Prénom de l'enfant"
          value={name_child}
          onChange={(e) => {
            setName_child(e.target.value);
            console.log("NameChild changed:", e.target.value); // Vérification du nom de l'enfant
          }}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Sélection du sexe avec icônes */}
      <div className="mb-4 flex justify-center space-x-4">
        {/* Féminin */}
        <div
          onClick={() => {
            setGender("Féminin");
            console.log("Gender changed to Féminin"); // Vérification du sexe
          }}
          className={`cursor-pointer border-2 p-4 rounded-md text-center ${
            gender === "Féminin" ? "bg-blue-100 border-blue-500" : "bg-white"
          }`}
        >
          <FontAwesomeIcon
            icon={faVenus}
            className="text-blue-500 w-12 h-12 mx-auto mb-2"
          />
          <p className="text-[#0a3d64]">Féminin</p>
        </div>

        {/* Masculin */}
        <div
          onClick={() => {
            setGender("Masculin");
            console.log("Gender changed to Masculin"); // Vérification du sexe
          }}
          className={`cursor-pointer border-2 p-4 rounded-md text-center ${
            gender === "Masculin" ? "bg-blue-100 border-blue-500" : "bg-white"
          }`}
        >
          <FontAwesomeIcon
            icon={faMars}
            className="text-blue-500 w-12 h-12 mx-auto mb-2"
          />
          <p className="text-[#0a3d64]">Masculin</p>
        </div>
      </div>

      <p className="text-[#0a3d64] text-[16px] sm:text-[18px] md:text-[18px] lg:text-[18px] text-center mb-10 mt-10">
        Ces informations vont nous aider à personnaliser votre expérience et le
        contenu que l’on va vous adresser.
      </p>

      {/* Bouton suivant */}
      <button
        className="w-full bg-[#f79862] text-[#0a3d64] text-[25px] py-3 rounded-full hover:bg-[#f5d07f]/85 text-center"
        type="button"
        onClick={() => {
          console.log("Step4: Next button clicked"); // Ajout du log lors du clic
          handleChildCreation();
          handleNextStep();
        }}
        disabled={!name_child || !gender}
      >
        Suivant
      </button>
    </div>
  );
};

export default ChildStep2;
