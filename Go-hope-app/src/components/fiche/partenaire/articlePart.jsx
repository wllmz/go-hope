import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useArticles from "../../../hooks/article/useArticles";
import { useUserInfo } from "../../../hooks/user/useUserInfo";
import ArticleList from "../../articles/ArticleList";

const AllArticle = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedMediaType, setSelectedMediaType] = useState("Fiche");

  const {
    articles,
    loading: articlesLoading,
    error: articlesError,
    fetchAllArticlesPartenaire,
  } = useArticles();

  const { user, loading: userLoading, error: userError } = useUserInfo();

  useEffect(() => {
    const fetchData = async () => {
      await fetchAllArticlesPartenaire();
    };
    fetchData();
  }, [fetchAllArticlesPartenaire]);

  if (articlesLoading || userLoading) {
    return <div className="text-center py-4">Chargement...</div>;
  }

  if (articlesError) {
    return (
      <div className="text-center py-4 text-red-500">
        Erreur lors du chargement des articles : {articlesError}
      </div>
    );
  }

  if (userError) {
    return (
      <div className="text-center py-4 text-red-500">
        Erreur lors de la récupération des infos utilisateur : {userError}
      </div>
    );
  }

  // Filtrer les articles par type (uniquement Fiche)
  const filteredArticles = articles.filter(
    (article) => article.mediaType === selectedMediaType
  );

  // Appliquer le slice uniquement si on est sur la page entreprise
  const isEntreprisePage = location.pathname.includes("partenaires");
  const isLaSepPage = location.pathname.includes("la-sep");
  const displayedArticles = isEntreprisePage
    ? filteredArticles.slice(0, 4)
    : filteredArticles;

  const handleArticleClick = (articleId) => {
    navigate(`/la-sep/${articleId}`);
  };

  const handleNavigateToAllArticles = () => {
    if (isEntreprisePage) {
      navigate("/partenaire/la-sep");
    }
  };

  return (
    <div className="w-full min-h-screen">
      <div className="max-w-6xl mx-auto p-5">
        <div className="flex items-center justify-between text-[#1D5F84] mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-[#1D5F84] font-medium">Suggestion</h2>
          </div>
          {isEntreprisePage && !isLaSepPage && (
            <button
              onClick={handleNavigateToAllArticles}
              className="text-[#F1731F] hover:text-[#1D5F84] transition-colors flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
          )}
        </div>

        <ArticleList
          articles={displayedArticles}
          selectedMediaType={selectedMediaType}
          onArticleClick={handleArticleClick}
          onNavigateToAllArticles={
            isEntreprisePage && !isLaSepPage
              ? handleNavigateToAllArticles
              : undefined
          }
          onFavoritesUpdate={fetchAllArticlesPartenaire}
        />
      </div>
    </div>
  );
};

export default AllArticle;
