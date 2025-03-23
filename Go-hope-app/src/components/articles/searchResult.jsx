import React, { useState, useEffect } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useArticleActions } from "../../hooks/article/useArticleActions";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../hooks/user/useUserInfo";
import SearchBar from "./searchBar";

const ArticleListLong = ({ articles, onArticleClick, onFavoritesUpdate }) => {
  const navigate = useNavigate();
  const { addToFavoris, removeFromFavoris, actionLoading, error } =
    useArticleActions();
  const { user } = useUserInfo();

  // État local pour stocker l'état "favoris" de chaque article
  const [favorites, setFavorites] = useState({});

  // Séparer les articles en deux groupes : Fiches et Vidéos
  const fiches = articles.filter((article) => article.mediaType === "Fiche");
  const videos = articles.filter((article) => article.mediaType === "Vidéo");

  // Nombre total de résultats
  const totalResults = articles.length;

  // Initialiser l'état "favoris" à partir des articles reçus, en comparant l'ID utilisateur
  useEffect(() => {
    if (!user) return;
    const userId = user._id?.toString() || "";
    const initialFavorites = {};
    articles.forEach((article) => {
      const favorisStr = article.favoris.map((fav) => fav.toString());
      initialFavorites[article._id] = favorisStr.includes(userId);
    });
    setFavorites(initialFavorites);
  }, [articles, user]);

  const handleFavorisClick = async (articleId) => {
    if (favorites[articleId]) {
      // Si l'article est déjà favori, le retirer
      await removeFromFavoris(articleId);
      setFavorites((prev) => ({ ...prev, [articleId]: false }));
    } else {
      // Sinon, l'ajouter aux favoris
      await addToFavoris(articleId);
      setFavorites((prev) => ({ ...prev, [articleId]: true }));
    }
    if (onFavoritesUpdate) {
      await onFavoritesUpdate();
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  // Fonction utilitaire pour afficher un bloc "carte"
  const renderCard = (article) => {
    const isFavorite = favorites[article._id];
    return (
      <div
        key={article._id}
        onClick={() => onArticleClick(article._id)}
        className="relative bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
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

        {/* Contenu texte */}
        <div className="p-3">
          <h3 className="text-sm sm:text-base font-semibold text-[#0E3043] mb-1">
            {article.title}
          </h3>
          <div className="text-xs sm:text-sm text-gray-600 flex items-center space-x-1">
            <span>{article.mediaType}</span>
            <span>•</span>
            <span>{article.time_lecture || 0}min</span>
          </div>
        </div>

        {/* Bouton Favori en haut à droite */}
        <div className="absolute top-2 right-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleFavorisClick(article._id);
            }}
            disabled={actionLoading}
            className="text-orange-500 hover:text-orange-600 focus:outline-none"
            title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            {isFavorite ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-b from-[#B3D7EC] to-[#FDFDFD]   ">
      <div className=" max-w-6xl mx-auto p-5">
        {/* Barre de recherche */}
        <div className="p-4">
          <SearchBar />
        </div>

        {error && <p className="text-red-500 px-4">{error}</p>}

        {/* Nombre total de résultats */}
        <div className="px-4 text-sm text-gray-600 mb-2">
          {totalResults} {totalResults > 1 ? "résultats" : "résultat"}
        </div>

        {/* Section des fiches */}
        {fiches.length > 0 && (
          <div className="px-4 mb-6">
            <h2 className="text-md sm:text-lg font-semibold text-[#0E3043] mb-3">
              {fiches.length} {fiches.length > 1 ? "fiches" : "fiche"}
            </h2>
            {/* Grille de 2 colonnes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fiches.map(renderCard)}
            </div>
          </div>
        )}

        {/* Section des vidéos */}
        {videos.length > 0 && (
          <div className="px-4">
            <h2 className="text-md sm:text-lg font-semibold text-[#0E3043] mb-3">
              {videos.length} {videos.length > 1 ? "vidéos" : "vidéo"}
            </h2>
            {/* Grille de 2 colonnes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {videos.map(renderCard)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleListLong;
