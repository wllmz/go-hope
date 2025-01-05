import React from "react";
import FormInput from "../../utils/form/FormInput"; // Assurez-vous que le chemin est correct

const ChildStep1 = ({
  relationship,
  setRelationship,
  isPregnant,
  setIsPregnant,
  pregnancyEndDate,
  setPregnancyEndDate,
  dateBirth_child,
  setDateBirth_child,
  handleChildCreation,
  handleNextStep,
  setStep,
  error,
}) => {
  const isPregnancyEndDateValid = isPregnant
    ? pregnancyEndDate && new Date(pregnancyEndDate) > new Date()
    : true;

  const isDateBirthChildValid = !isPregnant
    ? dateBirth_child && new Date(dateBirth_child) < new Date()
    : true;

  const canProceed = isPregnant
    ? relationship && isPregnancyEndDateValid
    : relationship && isDateBirthChildValid;

  return (
    <div>
      <h1 className="text-[#0a3d64] text-[28px] sm:text-[30px] md:text-[33px] lg:text-[35px] text-center mb-9 mt-8">
        Commençons l’aventure
      </h1>
      <p className="text-[#0a3d64] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] text-center mb-10 mt-10">
        Parlez nous de votre enfant
      </p>

      {!isPregnant && (
        <div className="mb-4">
          <FormInput
            type="date"
            placeholder="Date de naissance de l'enfant"
            value={dateBirth_child}
            onChange={(e) => setDateBirth_child(e.target.value)}
          />
          {!isDateBirthChildValid && (
            <p className="text-red-500 text-sm mt-2">
              La date de naissance doit être dans le passé.
            </p>
          )}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-[#0a3d64]">Enceinte</label>
        <input
          type="checkbox"
          checked={isPregnant}
          onChange={(e) => setIsPregnant(e.target.checked)}
          className="mr-2"
        />
        <span className="text-[#0a3d64]">Oui, enceinte</span>
      </div>

      {isPregnant && (
        <div className="mb-4">
          <p className="text-[#0a3d64]">Indiquez la date du terme</p>
          <FormInput
            type="date"
            placeholder="Date du terme"
            value={pregnancyEndDate}
            onChange={(e) => setPregnancyEndDate(e.target.value)}
          />
          {!isPregnancyEndDateValid && (
            <p className="text-red-500 text-sm mt-2">
              La date du terme doit être dans le futur.
            </p>
          )}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-[#0a3d64]">Relation</label>
        <select
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Sélectionnez une relation</option>
          <option value="Papa">Papa</option>
          <option value="Maman">Maman</option>
          <option value="Co-Parent">Co-Parent</option>
        </select>
      </div>

      <p className="text-[#0a3d64] text-[16px] sm:text-[18px] md:text-[18px] lg:text-[18px] text-center mb-10 mt-10">
        Ces questions vont nous aider à personnaliser votre expérience et le
        contenu que l’on va vous adresser.
      </p>

      <button
        className="w-full bg-[#f79862] text-[#0a3d64] text-[25px] py-3 rounded-full hover:bg-[#f5d07f]/85 text-center"
        type="button"
        onClick={() => {
          if (isPregnant) {
            handleChildCreation();
            setStep(3);
          } else {
            handleNextStep();
          }
        }}
        disabled={!canProceed}
      >
        Suivant
      </button>
    </div>
  );
};

export default ChildStep1;
