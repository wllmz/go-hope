import React from "react";

// Fonction pour formater l'âge
const formatAge = (ageInMonths) => {
  if (ageInMonths === 0) return "Moins d'un mois";

  const years = Math.floor(ageInMonths / 12);
  const months = ageInMonths % 12;

  if (years === 0) return `${months} mois`;
  if (months === 0) return `${years} an${years > 1 ? "s" : ""}`;
  return `${years} an${years > 1 ? "s" : ""} et ${months} mois`;
};

// Composant FamilyList
const FamilyList = ({ children, onEditChild }) => {
  if (!children || children.length === 0) {
    return <p className="text-gray-500">Aucun enfant enregistré.</p>;
  }

  return (
    <div className="flex space-x-6 overflow-x-auto p-6">
      {children.map((child) => (
        <div
          key={child._id}
          onClick={() => onEditChild(child)} // Rend la carte cliquable
          className="flex items-center bg-white rounded-full shadow-lg p-6 flex-shrink-0 w-96 h-36 cursor-pointer hover:shadow-xl transition-shadow duration-300"
        >
          {/* Image arrondie */}
          <img
            src="https://via.placeholder.com/100"
            alt={child.isPregnant ? "Grossesse" : child.name_child || "Image"}
            className="w-24 h-24 rounded-full object-cover"
          />

          {/* Contenu texte */}
          <div className="ml-6 flex-1">
            {child.isPregnant ? (
              <>
                <p className="text-1xl font-medium text-[#0a3d64]">
                  Grossesse en cours
                </p>
                <p className="text-gray-500 text-base">
                  Date du terme :{" "}
                  {child.pregnancyEndDate
                    ? new Date(child.pregnancyEndDate).toLocaleDateString()
                    : "Inconnue"}
                </p>
              </>
            ) : (
              <>
                <p className="text-1xl font-medium text-[#0a3d64]">
                  {child.name_child || "Nom inconnu"}
                </p>
                <p className="text-gray-500 text-lg">
                  {child.age !== undefined
                    ? formatAge(child.age)
                    : "Âge inconnu"}
                </p>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FamilyList;
