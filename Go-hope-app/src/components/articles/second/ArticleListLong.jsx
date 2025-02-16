import React, { useState, useEffect } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useArticleActions } from "../../../hooks/article/useArticleActions";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../../hooks/user/useUserInfo";

const ArticleListLong = ({ articles, onArticleClick, onFavoritesUpdate }) => {
  const navigate = useNavigate();
  const { addToFavoris, removeFromFavoris, actionLoading, error } =
    useArticleActions();
  const { user } = useUserInfo();

  // État local pour stocker l'état "favoris" de chaque article
  const [favorites, setFavorites] = useState({});

  // Initialiser l'état "favoris" à partir des articles reçus, en comparant l'ID utilisateur
  useEffect(() => {
    if (!user) return;
    const userId = user._id.toString();
    const initialFavorites = {};
    articles.forEach((article) => {
      // Convertir chaque favori en chaîne pour comparer correctement
      const favorisStr = article.favoris.map((fav) => fav.toString());
      initialFavorites[article._id] = favorisStr.includes(userId);
    });
    console.log("Favoris initialisés :", initialFavorites);
    setFavorites(initialFavorites);
  }, [articles, user]);

  const handleFavorisClick = async (articleId) => {
    if (favorites[articleId]) {
      // Si l'article est déjà favorisé, le retirer
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
          style={{ transform: "scaleX(-1)" }} // Inverse horizontalement
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
      {articles.map((article) => (
        <div
          key={article._id}
          className="border border-gray-300 rounded p-4 shadow hover:shadow-lg transition"
          onClick={() => onArticleClick(article._id)}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{article.title}</h2>
            <button
              className="text-xl text-orange-500 hover:text-orange-600 focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                handleFavorisClick(article._id);
              }}
              disabled={actionLoading}
              title={
                favorites[article._id]
                  ? "Retirer des favoris"
                  : "Ajouter aux favoris"
              }
            >
              {favorites[article._id] ? <FaBookmark /> : <FaRegBookmark />}
            </button>
          </div>
          {article.image && (
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-auto rounded mt-2"
            />
          )}
          <p className="text-gray-600 mt-2">
            <strong>Temps de lecture :</strong> {article.time_lecture} minutes
          </p>
          <p className="mt-2 text-gray-700">
            {article.content.length > 200
              ? article.content.slice(0, 200) + "..."
              : article.content}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onArticleClick(article._id);
            }}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Lire la suite
          </button>
        </div>
      ))}
    </div>
  );
};

export default ArticleListLong;
