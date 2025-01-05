import React from "react";
import { useAtelierParticipation } from "../../../hooks/Atelier/useActionAtelier";
import { useUserInfo } from "../../../hooks/infoUser/useUserInfo";

const AtelierModal = ({ atelier, onClose }) => {
  const { user } = useUserInfo();
  const { join, loading, error, successMessage, setError, setSuccessMessage } =
    useAtelierParticipation();

  if (!atelier) return null;

  // Vérification si l'utilisateur est déjà inscrit
  const isInscrit = Boolean(
    user && // Vérifie si un utilisateur est connecté
      atelier.participant?.some((p) => p.user._id === user._id)
  );

  const handleJoin = () => {
    setError(null);
    setSuccessMessage(null);
    join(atelier._id);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />

      {/* Contenu de la modale */}
      <div className="relative bg-white w-11/12 max-w-lg mx-auto rounded shadow-lg">
        {/* Image avec la croix au-dessus */}
        <div className="relative mb-8">
          {/* Image */}
          <img
            src={atelier.imageUrl || "https://via.placeholder.com/300x200"}
            alt={atelier.titreAtelier || "Atelier"}
            className="object-cover w-full h-48 rounded-t-lg"
          />
          {/* Croix de fermeture */}
          <button
            className="absolute top-2 right-2 bg-[#0a3d64] text-white rounded-full p-2 shadow-md z-10 w-[40px]"
            onClick={onClose}
          >
            ✕
          </button>
          {/* Bloc de la date (chevauche légèrement l'image et est centré) */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white w-24 h-28 rounded-lg shadow-lg flex flex-col items-center justify-center space-y-1">
            <div className="text-sm font-bold text-[#f79862] uppercase">
              {atelier.date_debut_formatted.split(" ")[0]}
            </div>
            <div className="text-2xl font-bold text-[#0a3d64]">
              {atelier.date_debut_formatted.split(" ")[1]}
            </div>
            <div className="text-xs text-gray-600">
              {atelier.date_debut_formatted.split(" ")[5]} à{" "}
              {atelier.date_fin_formatted.split(" ")[5]}
            </div>
          </div>
        </div>

        {/* Titre */}
        <h2 className="text-xl text-[#0a3d64] mb-2 pl-4 pr-4">
          {atelier.titreAtelier || "Titre non disponible"}
        </h2>

        <p className="text-gray-500 pl-4 pr-4 text-lg">
          Par :{" "}
          {Array.isArray(atelier.animatrice)
            ? atelier.animatrice.length > 0
              ? atelier.animatrice
                  .map((exp) => `${exp.prenom} ${exp.nom}`)
                  .join(", ")
              : "Auteur inconnu"
            : atelier.animatrice &&
              atelier.animatrice.prenom &&
              atelier.animatrice.nom
            ? `${atelier.animatrice.prenom} ${atelier.animatrice.nom}`
            : "Auteur inconnu"}
        </p>

        {/* Places restantes */}
        <p className="text-gray-500  mb-4 pl-4 pr-4 text-lg">
          Places restantes :{" "}
          {atelier.nombre_participant > 0
            ? atelier.nombre_participant
            : "Complet"}
        </p>

        {/* Description */}
        {atelier.description && (
          <p className="text-gray-700  mb-4 pl-4 pr-4">{atelier.description}</p>
        )}

        {/* Affichage des erreurs ou succès */}
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {successMessage && (
          <p className="text-green-500 mb-2">{successMessage}</p>
        )}

        {/* Bouton de participation (centré) */}
        <div className="mt-4 flex justify-center mb-5">
          <button
            onClick={!isInscrit ? handleJoin : undefined}
            disabled={loading || isInscrit}
            className={`px-6 py-2 rounded-full text-white 
              ${isInscrit ? "bg-gray-400 cursor-not-allowed" : "bg-[#0a3d64]"}`}
          >
            {loading
              ? "Chargement..."
              : isInscrit
              ? "Vous êtes inscrit"
              : "Participer"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AtelierModal;
