import React from "react";
import { useNavigate } from "react-router-dom";
const Abonnement = ({ selectedPlan, setSelectedPlan, handleNextStep }) => {
  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
  };
  const navigate = useNavigate();
  return (
    <div className="text-center">
      <h1 className="text-[#0a3d64] text-2xl font-bold text-center mb-4">
        Abonnez-vous à Flow Premium
      </h1>
      <p className="text-[#0a3d64] text-center text-sm mb-6">
        Du contenu exclusif et personnalisé, des programmes dédiés à la
        parentalité
      </p>

      {/* Choix des plans */}
      <div className="flex justify-center space-x-4 mb-6">
        {/* Plan 1 */}
        <div
          className={`p-4 rounded-lg border w-1/2 ${
            selectedPlan === "plan1"
              ? "bg-[#f7faff] border-[#0a3d64]"
              : "border-gray-300"
          } cursor-pointer flex flex-col items-center`}
          onClick={() => handlePlanChange("plan1")}
        >
          <div className="bg-[#0a3d64] text-white text-xs px-2 py-1 rounded-full mb-2">
            2 mois offerts
          </div>
          <p className="text-[#0a3d64] text-sm font-bold mb-1">Annuel</p>
          <p className="text-[#0a3d64] text-xs">29€/mois</p>
          <p className="text-[#0a3d64] text-xs">soit un paiement de 348€</p>
        </div>

        {/* Plan 2 */}
        <div
          className={`p-4 rounded-lg border w-1/2 ${
            selectedPlan === "plan2"
              ? "bg-[#fff7f5] border-[#e85d04]"
              : "border-gray-300"
          } cursor-pointer flex flex-col items-center`}
          onClick={() => handlePlanChange("plan2")}
        >
          <p className="text-[#e85d04] text-sm font-bold mb-1">Annuel</p>
          <p className="text-[#e85d04] text-xs">35€/mois</p>
        </div>
      </div>

      {/* Offre partenaire */}
      <div className="bg-[#0a3d64] text-white p-4 rounded-lg mb-6">
        <p className="text-sm mb-2">Vous bénéficiez d’une offre partenaire</p>
        <button className="bg-white text-[#0a3d64] px-4 py-2 rounded-full font-bold mb-2">
          Activer l’offre partenaire
        </button>
        <p className="text-xs underline cursor-pointer">
          Découvrez nos partenaires
        </p>
      </div>

      {/* Comparaison des offres */}
      <div className="text-center mb-6">
        <select className="text-[#0a3d64] text-sm border-gray-300 border rounded-md px-2 py-1">
          <option>Comparer les offres Flow</option>
        </select>
      </div>

      <button
        className="w-full bg-[#f79862] text-[#0a3d64] text-[25px] py-3 rounded-full hover:bg-[#f5d07f]/85 text-center mt-[150px]"
        type="button"
        onClick={() => navigate("/home")} // Encapsuler l'appel dans une fonction
      >
        Suivant
      </button>
    </div>
  );
};

export default Abonnement;
