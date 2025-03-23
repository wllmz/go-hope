import React from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const ArticleCard = ({
  article,
  isFavorite,
  actionLoading,
  onClick, // Appelée lorsqu'on clique sur la carte
  onFavorisClick, // Appelée lorsqu'on clique sur l'icône Favoris
}) => {
  return (
    <div
      onClick={() => onClick(article._id)}
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition hover:shadow-lg"
    >
      {/* Image en haut */}
      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-40 object-cover"
          onError={(e) => {
            e.currentTarget.src = "";
            e.currentTarget.classList.add("bg-gray-200");
          }}
        />
      )}

      {/* Contenu de la carte */}
      <div className="p-4">
        {/* Titre */}
        <h2 className="text-base font-semibold text-[#0E3043] mb-2">
          {article.title || "Titre de la fiche"}
        </h2>

        {/* Ligne du bas : Type (Fiche ou Vidéo) + Durée, et l'icône Favoris à droite */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <span>{article.mediaType || "Fiche"}</span>
            <span>•</span>
            <span>{article.time_lecture || 10}min</span>
          </div>

          {/* Bouton Favori (icône signet) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFavorisClick(article._id);
            }}
            disabled={actionLoading}
            className="text-orange-500 hover:text-orange-600 focus:outline-none"
            title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            {isFavorite ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
