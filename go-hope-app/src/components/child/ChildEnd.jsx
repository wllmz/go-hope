import React from "react";

const ChildEnd = ({ isPregnant, setStep, handleNextStep, resetChildForm }) => {
  return (
    <div className="text-center">
      <h1 className="text-[#0a3d64] text-[28px] sm:text-[30px] md:text-[33px] lg:text-[35px] text-center mb-20 mt-10 p-5">
        Commençons l’aventure
      </h1>

      {isPregnant ? (
        <p className="text-[#0a3d64] text-[16px] sm:text-[18px] md:text-[18px] lg:text-[18px] text-center mb-10 mt-10">
          Félicitations ! Nous avons enregistré votre grossesse.
        </p>
      ) : (
        <p className="text-[#0a3d64] text-[16px] sm:text-[18px] md:text-[18px] lg:text-[18px] text-center mb-10 mt-10">
          Félicitations ! Nous avons enregistré votre enfant.
        </p>
      )}

      {/* Bouton pour ajouter une nouvelle grossesse ou enfant */}
      <p
        className="text-[#f79862] text-[16px] sm:text-[18px] md:text-[18px] lg:text-[18px] text-center mt-10 cursor-pointer underline hover:text-[#0a3d64]/80"
        onClick={() => {
          resetChildForm(); // Réinitialiser les champs du formulaire
          setStep(2); // Retourner à l'étape 2
        }}
      >
        + Ajouter une grossesse ou un enfant
      </p>

      <button
        className="w-full bg-[#f79862] text-[#0a3d64] text-[25px] py-3 rounded-full hover:bg-[#f5d07f]/85 text-center mt-[150px]"
        type="button"
        onClick={handleNextStep}
      >
        Suivant
      </button>
    </div>
  );
};

export default ChildEnd;
