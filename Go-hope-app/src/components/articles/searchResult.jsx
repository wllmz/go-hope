// ArticleListLong.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useArticleActions } from "../../hooks/article/useArticleActions";
import { useUserInfo } from "../../hooks/user/useUserInfo";
import SearchBar from "./searchBar";
import ArticleCard from "./ArticleCard";

const SearchResult = ({ articles, onArticleClick, onFavoritesUpdate }) => {
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

  // Initialiser l'état "favoris"
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

  // Gestion du clic sur l'icône Favoris
  const handleFavorisClick = async (articleId) => {
    if (favorites[articleId]) {
      // Déjà favori, on retire
      await removeFromFavoris(articleId);
      setFavorites((prev) => ({ ...prev, [articleId]: false }));
    } else {
      // Sinon, on ajoute
      await addToFavoris(articleId);
      setFavorites((prev) => ({ ...prev, [articleId]: true }));
    }
    if (onFavoritesUpdate) {
      await onFavoritesUpdate();
    }
  };

  // Gestion du clic global sur la carte (ouvre l'article)
  const handleCardClick = (articleId) => {
    onArticleClick(articleId);
  };

  return (
    <div className="bg-gradient-to-b from-[#B3D7EC] to-[#FDFDFD]">
      <div className="max-w-6xl mx-auto p-5">
        {/* Barre de recherche */}
        <div className="p-4">
          <SearchBar />
        </div>

        {error && <p className="text-red-500 px-4">{error}</p>}

        {/* Nombre total de résultats */}
        <div className="px-4 text-sm text-gray-600 mb-2">
          {totalResults} {totalResults > 1 ? "résultats" : "résultat"}
        </div>

        {/* Section Fiches */}
        {fiches.length > 0 && (
          <div className="mb-6">
            <h2 className="text-md sm:text-lg font-semibold text-[#0E3043] mb-3">
              {fiches.length} {fiches.length > 1 ? "fiches" : "fiche"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fiches.map((article) => (
                <ArticleCard
                  key={article._id}
                  article={article}
                  isFavorite={favorites[article._id]}
                  actionLoading={actionLoading}
                  onClick={handleCardClick}
                  onFavorisClick={handleFavorisClick}
                />
              ))}
            </div>
          </div>
        )}

        {/* Section Vidéos */}
        {videos.length > 0 && (
          <div>
            <h2 className="text-md sm:text-lg font-semibold text-[#0E3043] mb-3">
              {videos.length} {videos.length > 1 ? "vidéos" : "vidéo"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {videos.map((article) => (
                <ArticleCard
                  key={article._id}
                  article={article}
                  isFavorite={favorites[article._id]}
                  actionLoading={actionLoading}
                  onClick={handleCardClick}
                  onFavorisClick={handleFavorisClick}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
