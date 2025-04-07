import React from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { Play } from "lucide-react";

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
      className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer transition hover:shadow-md hover:bg-[#FEF1E5] flex h-24 md:h-40 p-2 relative"
    >
      {/* Image à gauche */}
      <div className="relative w-24 md:w-48 flex-shrink-0 rounded-lg overflow-hidden">
        <img
          src={article.image || ""}
          alt={article.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "";
            e.currentTarget.classList.add("bg-gray-100");
          }}
        />
        {/* Bouton Play pour les vidéos */}
        {article.mediaType === "Vidéo" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/90 flex items-center justify-center">
              <Play className="w-4 h-4 md:w-6 md:h-6 text-orange-500" />
            </div>
          </div>
        )}
      </div>

      {/* Contenu de la carte */}
      <div className="flex-1 flex flex-col justify-center pl-3 md:pl-5">
        {/* Titre */}
        <h3 className="text-sm md:text-lg font-medium text-[#0E3043] mb-2 md:mb-3 line-clamp-2">
          {article.title || "Titre de la fiche"}
        </h3>

        {/* Ligne du bas : Type (Fiche ou Vidéo) + Durée */}
        <div className="flex items-center gap-2 text-xs md:text-base text-gray-500">
          <span className="flex items-center gap-1">
            {article.mediaType || "Fiche"}
          </span>
          <span>•</span>
          <span>{article.time_lecture || 10}min</span>
        </div>
      </div>

      {/* Bouton Favori (icône signet) en position absolue en haut à droite */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onFavorisClick(article._id);
        }}
        disabled={actionLoading}
        className="absolute top-2 right-2 md:top-3 md:right-3 text-orange-500 hover:text-orange-600 focus:outline-none"
        title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      >
        {isFavorite ? (
          <FaBookmark className="text-lg md:text-2xl" />
        ) : (
          <FaRegBookmark className="text-lg md:text-2xl" />
        )}
      </button>
    </div>
  );
};

export default ArticleCard;
