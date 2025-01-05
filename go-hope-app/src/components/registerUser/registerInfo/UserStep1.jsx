import React, { useState } from "react";
import FormInput from "../../../utils/form/FormInput"; // Assurez-vous que le chemin est correct
import SelectInput from "../../../utils/form/SelectInput"; // Assurez-vous que le chemin est correct

const UserStep1 = ({
  firstName,
  setFirstName,
  personal_situation,
  setPersonal_situation,
  professional_situation,
  setProfessional_situation,
  handleSubmit,
  error,
}) => {
  const [localError, setLocalError] = useState({
    personalSituation: null,
    professionalSituation: null,
  });

  // Options pour la situation personnelle
  const personalSituations = [
    {
      label: "Sélectionner votre situation personnelle",
      value: "",
      disabled: true,
    },
    { label: "En couple", value: "En couple" },
    { label: "Parent solo", value: "Parent solo" },
  ];

  // Options pour la situation professionnelle
  const professionalSituations = [
    {
      label: "Sélectionner votre situation professionnelle",
      value: "",
      disabled: true,
    },
    { label: "En activité", value: "En activité" },
    {
      label: "En congé maternité / paternité",
      value: "En congé maternité / parternité",
    },
    {
      label: "En congé parental d’éducation",
      value: "En congé parental d’éducation",
    },
    {
      label: "En arrêt maladie longue durée",
      value: "En arrêt maladie longue durée",
    },
    {
      label: "Sans activité professionnelle",
      value: "Sans activité professionnelle",
    },
  ];

  const handlePersonalSituationChange = (e) => {
    setPersonal_situation(e.target.value);
  };

  const handleProfessionalSituationChange = (e) => {
    setProfessional_situation(e.target.value);
  };

  const handleNextStepClick = () => {
    setLocalError({ personalSituation: null, professionalSituation: null });

    // Validation des champs de situation personnelle et professionnelle
    if (!personal_situation) {
      setLocalError((prevErrors) => ({
        ...prevErrors,
        personalSituation: "Veuillez sélectionner une situation personnelle.",
      }));
      return;
    }

    if (!professional_situation) {
      setLocalError((prevErrors) => ({
        ...prevErrors,
        professionalSituation:
          "Veuillez sélectionner une situation professionnelle.",
      }));
      return;
    }

    // Appel à handleSubmit pour envoyer les données à l'API
    handleSubmit();
  };

  return (
    <div>
      <h1 className="text-[#0a3d64] text-[28px] sm:text-[30px] md:text-[33px] lg:text-[35px] text-center mb-9 mt-8">
        Commençons l’aventure
      </h1>
      <p className="text-[#0a3d64] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] text-center mb-10 mt-10">
        Apprenons à mieux nous connaitre
      </p>

      {/* Champ prénom */}
      <div className="mb-4">
        <FormInput
          type="text"
          placeholder="Prénom"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)} // Utilisation de setFirstName
        />
      </div>

      {/* Situation personnelle */}
      <div className="mb-4">
        <SelectInput
          placeholder="Situation personnelle"
          label="Situation personnelle"
          name="personalSituation"
          value={personal_situation}
          onChange={handlePersonalSituationChange}
          options={personalSituations}
        />
        {localError.personalSituation && (
          <p className="text-red-500 text-sm mt-1">
            {localError.personalSituation}
          </p>
        )}
      </div>

      {/* Situation professionnelle */}
      <div className="mb-4">
        <SelectInput
          label="Situation professionnelle"
          placeholder="Situation professionnelle"
          name="professionalSituation"
          value={professional_situation}
          onChange={handleProfessionalSituationChange}
          options={professionalSituations}
        />
        {localError.professionalSituation && (
          <p className="text-red-500 text-sm mt-1">
            {localError.professionalSituation}
          </p>
        )}
      </div>

      <p className="text-[#0a3d64] text-[16px] sm:text-[18px] md:text-[18px] lg:text-[18px] text-center mb-10 mt-10">
        Ces questions vont nous aider à personnaliser votre expérience et le
        contenu que l’on va vous adresser
      </p>

      {/* Bouton suivant */}
      <button
        className="w-full bg-[#f5d07f] text-[#0a3d64] text-[25px] py-3 rounded-full hover:bg-[#f5d07f]/85 text-center "
        type="button"
        onClick={handleNextStepClick}
        disabled={!firstName || !personal_situation || !professional_situation}
      >
        Suivant
      </button>
    </div>
  );
};

export default UserStep1;
