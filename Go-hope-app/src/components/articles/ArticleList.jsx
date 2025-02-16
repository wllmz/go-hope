import React, { useState, useEffect } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useArticleActions } from "../../hooks/article/useArticleActions";
import { useUserInfo } from "../../hooks/user/useUserInfo";

const ArticleList = ({
  articles,
  selectedMediaType,
  onArticleClick,
  onNavigateToAllArticles,
  onFavoritesUpdate, // Fonction pour re-fetcher les articles après modification
}) => {
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

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">
          {selectedMediaType === "Fiche"
            ? "Liste des Fiches"
            : "Liste des Vidéos"}
        </h1>
        <button
          onClick={onNavigateToAllArticles}
          className="text-orange-500 hover:text-orange-600 transition-colors"
          title="Voir tous les articles"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {articles && articles.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <li
              key={article._id}
              className="relative cursor-pointer border border-gray-300 p-4 rounded hover:shadow-lg transition-shadow"
              onClick={() => onArticleClick(article._id)}
            >
              <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
              <p className="text-gray-600 mb-2">
                <strong>Temps de lecture :</strong> {article.time_lecture}{" "}
                minutes
              </p>
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-auto rounded"
                />
              )}
              <p className="mt-2 text-sm text-gray-500">{article.mediaType}</p>
              {/* Bouton pour ajouter/retirer des favoris avec icône de signet */}
              <button
                className="absolute top-2 right-2 text-xl text-orange-500 hover:text-orange-600 focus:outline-none"
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
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">
          Aucune {selectedMediaType === "Fiche" ? "fiche" : "vidéo"} trouvée.
        </p>
      )}
    </>
  );
};

export default ArticleList;
