import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useArticles from "../../../hooks/article/useArticles";
import { useArticleActions } from "../../../hooks/article/useArticleActions";
import ArticleCard from "./ArticleCard";
import Header from "../Header";

const CategorieById = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { articles, loading, error, fetchAllArticles } = useArticles();
  const { addToFavoris, removeFromFavoris, actionLoading } =
    useArticleActions();
  const [selectedMediaType, setSelectedMediaType] = useState("Fiche");

  useEffect(() => {
    fetchAllArticles();
  }, [fetchAllArticles]);

  if (loading) return <div className="text-center py-4">Chargement...</div>;
  if (error)
    return (
      <div className="text-center py-4 text-red-500">Erreur : {error}</div>
    );

  // Filtrer les articles par catégorie et type de média
  const filteredArticles = articles.filter(
    (article) =>
      Array.isArray(article.category) &&
      article.category.some((cat) => String(cat._id) === String(categoryId)) &&
      (selectedMediaType === "Tous" || article.mediaType === selectedMediaType)
  );

  // Fonction pour naviguer vers la page d'un article
  const handleArticleClick = (articleId) => {
    navigate(`/la-sep/${articleId}`);
  };

  // Fonction pour gérer les favoris
  const handleFavorisClick = async (articleId) => {
    const article = articles.find((a) => a._id === articleId);
    if (article.favoris?.includes(articleId)) {
      await removeFromFavoris(articleId);
    } else {
      await addToFavoris(articleId);
    }
    await fetchAllArticles();
  };

  // Fonction pour revenir à la page précédente
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen">
      <Header
        selectedMediaType={selectedMediaType}
        setSelectedMediaType={setSelectedMediaType}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-8">
          <button
            onClick={handleBackClick}
            className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Retour
          </button>
        </div>

        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article._id}
                article={article}
                isFavorite={article.favoris?.includes(article._id)}
                actionLoading={actionLoading}
                onClick={handleArticleClick}
                onFavorisClick={handleFavorisClick}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-8">
            Aucun article trouvé pour cette catégorie.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategorieById;
