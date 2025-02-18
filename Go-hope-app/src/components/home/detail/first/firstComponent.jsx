import React from "react";
import bg from "../../../../assets/papillon-blanc.png";
import home from "../../../../assets/home-first.png";

const FirstComponent = () => {
  return (
    <div className="flex flex-col mb-15 items-center relative">
      {/* Dégradé vertical de #F5943A en haut à #FDFDFD en bas */}
      <div className="w-full p-6 text-center bg-gradient-to-b from-[#F5943A] to-[#FDFDFD] shadow rounded-xl">
        {/* Image de fond */}
        <div className="mb-6 flex justify-end">
          <img src={bg} alt="Background Papillon" />
        </div>

        {/* Conteneur en deux colonnes sur desktop */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-center md:gap-x-25">
          {/* Texte (placé à gauche sur desktop) */}
          <div className="order-2 md:order-1 flex justify-center md:justify-start">
            <h1 className="text-xl md:text-3xl text-[#0E3043] mt-4 mb-4 font-semibold">
              Soyez entouré de votre compagnon au quotidien
            </h1>
          </div>
          {/* Image (placée à droite sur desktop) */}
          <div className="order-1 md:order-2 flex justify-center">
            <img className="mb-6 md:mb-0" src={home} alt="Tous ensemble" />
          </div>
        </div>

        {/* Bouton en dessous des deux colonnes */}
        <div className="flex justify-center mt-4">
          <button
            // onClick={handleNextStep}
            className="w-full sm:w-[300px] bg-[#F5943A] hover:bg-[#F1731F] text-white font-semibold py-2 px-2 rounded-lg shadow-md transition duration-300 text-lg"
          >
            Découvrir le projet
          </button>
        </div>
      </div>
    </div>
  );
};

export default FirstComponent;
