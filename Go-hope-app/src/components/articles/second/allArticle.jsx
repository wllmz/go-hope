import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useArticles from "../../../hooks/article/useArticles";
import Header from "../Header";
import ArticleList from "./ArticleListLong";

const AllArticle = () => {
  const navigate = useNavigate();
  const [selectedMediaType, setSelectedMediaType] = useState("Fiche");

  // Hook pour récupérer les articles
  const {
    articles,
    loading: articlesLoading,
    error: articlesError,
    fetchAllArticles,
  } = useArticles();

  // Re-fetch des articles au montage du composant
  useEffect(() => {
    fetchAllArticles();
  }, [fetchAllArticles]);

  if (articlesLoading) {
    return <div className="text-center py-4">Chargement...</div>;
  }
  if (articlesError) {
    return (
      <div className="text-center py-4 text-red-500">
        Erreur lors du chargement des articles : {articlesError}
      </div>
    );
  }

  // Filtrer les articles selon le type sélectionné ("Fiche" ou "Vidéo")
  const filteredArticles = articles.filter(
    (article) => article.mediaType === selectedMediaType
  );

  // Fonctions de navigation
  const handleArticleClick = (articleId) => {
    navigate(`/la-sep/${articleId}`);
  };

  return (
    <div className="w-full min-h-screen">
      <Header
        selectedMediaType={selectedMediaType}
        setSelectedMediaType={setSelectedMediaType}
      />

      <div className="max-w-6xl mx-auto p-5 bg-white">
        <ArticleList
          articles={filteredArticles}
          selectedMediaType={selectedMediaType}
          onArticleClick={handleArticleClick}
          onFavoritesUpdate={fetchAllArticles}
        />
      </div>
    </div>
  );
};

export default AllArticle;
