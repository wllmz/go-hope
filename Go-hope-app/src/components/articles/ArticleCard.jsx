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
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition hover:shadow-lg hover:bg-[#FEF1E5]"
    >
      {/* Image avec overlay play pour les vidéos */}
      <div className="relative">
        <img
          src={article.image || ""}
          alt={article.title}
          className="w-full h-40 object-cover"
          onError={(e) => {
            e.currentTarget.src = "";
            e.currentTarget.classList.add("bg-gray-200");
          }}
        />
        {/* Bouton Play pour les vidéos */}
        {article.mediaType === "Vidéo" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 flex items-center justify-center">
              <Play className="w-5 h-5 md:w-6 md:h-6 text-orange-500" />
            </div>
          </div>
        )}
      </div>

      {/* Contenu de la carte */}
      <div className="p-3 md:p-4">
        {/* Titre */}
        <h3 className="text-[#0E3043] mb-1.5 md:mb-2 line-clamp-2">
          {article.title || "Titre de la fiche"}
        </h3>

        {/* Ligne du bas : Type (Fiche ou Vidéo) + Durée, et l'icône Favoris à droite */}
        <div className="flex items-center justify-between text-xs md:text-sm text-gray-500">
          <div className="flex items-center gap-1.5 md:gap-2">
            <span>{article.mediaType || "Fiche"}</span>
            <span>•</span>
            <span>
              {article.mediaType === "Vidéo"
                ? `${article.videoDuration}min`
                : `${article.time_lecture}min`}
            </span>
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
            {isFavorite ? (
              <FaBookmark className="text-base md:text-lg" />
            ) : (
              <FaRegBookmark className="text-base md:text-lg" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
