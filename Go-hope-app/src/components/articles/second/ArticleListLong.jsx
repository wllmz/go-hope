import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useArticleActions } from "../../../hooks/article/useArticleActions";
import { useUserInfo } from "../../../hooks/user/useUserInfo";
import ArticleCard from "./ArticleCard";

const ArticleListLong = ({ articles, onArticleClick, onFavoritesUpdate }) => {
  const navigate = useNavigate();
  const { addToFavoris, removeFromFavoris, actionLoading, error } =
    useArticleActions();
  const { user } = useUserInfo();
  const [favorites, setFavorites] = useState({});

  // Initialisation de l'état local des favoris
  useEffect(() => {
    if (!user) return;
    const userId = user._id.toString();
    const initialFavorites = {};
    articles.forEach((article) => {
      const favorisStr = article.favoris.map((fav) => fav.toString());
      initialFavorites[article._id] = favorisStr.includes(userId);
    });
    setFavorites(initialFavorites);
  }, [articles, user]);

  const handleFavorisClick = async (articleId) => {
    try {
      if (favorites[articleId]) {
        await removeFromFavoris(articleId);
        setFavorites((prev) => ({ ...prev, [articleId]: false }));
        // Notifie le parent que cet article n'est plus favori
        onFavoritesUpdate(articleId, false);
      } else {
        await addToFavoris(articleId);
        setFavorites((prev) => ({ ...prev, [articleId]: true }));
        // Si besoin, notifie pour l'ajout
        onFavoritesUpdate(articleId, true);
      }
    } catch (err) {
      
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCardClick = (articleId) => {
    onArticleClick(articleId);
  };

  return (
    <div className="space-y-6">
      <button
        onClick={handleBackClick}
        className="text-orange-500 hover:text-orange-600 transition-colors"
        title="Retour"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          style={{ transform: "scaleX(-1)" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {error && <p className="text-red-500">{error}</p>}

      <div className="max-w-6xl mx-auto p-5">
        <div className="px-4 text-sm text-gray-600 mb-2">
          {articles.length} {articles.length > 1 ? "résultats" : "résultat"}
        </div>

        <div className="space-y-6">
          {articles.map((article) => (
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
    </div>
  );
};

export default ArticleListLong;
