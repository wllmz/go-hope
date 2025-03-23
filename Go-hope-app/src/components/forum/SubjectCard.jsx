import React from "react";
import {
  FaBookmark,
  FaRegBookmark,
  FaThumbsUp,
  FaComment,
} from "react-icons/fa";

const SubjectCard = ({
  subject,
  isFavorite,
  actionLoading,
  onClick,
  onFavorisClick,
}) => {
  return (
    <div
      onClick={() => onClick(subject._id)}
      className="relative bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden p-4"
    >
      {/* Ligne du haut : Avatar + Nom + Rôle + Étoile Favori */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          {/* Avatar de l'auteur (ou image par défaut) */}
          <img
            src={subject.author?.avatar || "https://via.placeholder.com/40"}
            alt={subject.author?.username || "Avatar"}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="leading-tight">
            <p className="text-sm font-semibold text-[#0E3043]">
              {subject.author?.username || "Auteur inconnu"}
            </p>
            <p className="text-xs text-gray-500">
              {subject.author?.role || "Patient·e"}
            </p>
          </div>
        </div>

        {/* Bouton Favori (étoile) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavorisClick(subject._id);
          }}
          disabled={actionLoading}
          className="text-orange-500 hover:text-orange-600 focus:outline-none"
          title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          {isFavorite ? <FaBookmark /> : <FaRegBookmark />}
        </button>
      </div>

      {/* Titre du sujet */}
      <h3 className="text-sm sm:text-base font-semibold text-[#0E3043] mb-1">
        {subject.title}
      </h3>

      {/* Contenu optionnel (ici, on affiche juste un aperçu) */}
      {/* <p className="text-sm text-gray-700 mb-2">
        {subject.content?.slice(0, 80) + "..."}
      </p> */}

      {/* Bas de la carte : icônes like et commentaire */}
      <div className="flex items-center space-x-4 mt-2 text-gray-600 text-sm">
        <div className="flex items-center">
          <FaThumbsUp className="mr-1" />
          <span>{subject.favoris?.length || 0}</span>
        </div>
        <div className="flex items-center">
          <FaComment className="mr-1" />
          <span>{subject.commentCount || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;
