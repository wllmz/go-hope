import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useArticles from "../../../hooks/article/useArticles";
import { useUserInfo } from "../../../hooks/user/useUserInfo";
import ArticleList from "../../articles/ArticleList";

const AllArticle = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedMediaType, setSelectedMediaType] = useState(null); // Pas de filtre par défaut

  const {
    articles,
    loading: articlesLoading,
    error: articlesError,
    fetchAllArticlesSante,
  } = useArticles();

  const { user, loading: userLoading, error: userError } = useUserInfo();

  useEffect(() => {
    const fetchData = async () => {
      
      await fetchAllArticlesSante();
    };
    fetchData();
  }, [fetchAllArticlesSante]);

  // Ajouter un effet pour déboguer les articles récupérés
  useEffect(() => {
    if (articles && articles.length > 0) {

    }
  }, [articles]);

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

  // Vérifier si des articles existent
  if (!articles || articles.length === 0) {
    
    return (
      <div className="text-center py-4 text-gray-500">
        Aucun article trouvé. Veuillez vérifier que des articles sont associés à
        la catégorie santé.
      </div>
    );
  }

  // Filtrer les articles par mediaType seulement si un type est sélectionné
  let filteredArticles = [...articles];
  if (selectedMediaType) {
    filteredArticles = articles.filter(
      (article) => article.mediaType === selectedMediaType
    );
    
  }

  // Appliquer le slice uniquement si on est sur la page principale
  const isSantePage = location.pathname.includes("sante");
  const displayedArticles = isSantePage
    ? filteredArticles.slice(0, 4)
    : filteredArticles;

  const handleArticleClick = (articleId) => {
    navigate(`/la-sep/${articleId}`);
  };

  const handleNavigateToAllArticles = () => {
    if (isSantePage) {
      navigate("/sante/la-sep");
    }
  };

  return (
    <div className="w-full min-h-screen">
      <div className="max-w-6xl mx-auto p-5">
        <div className="flex items-center justify-between text-[#1D5F84] mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-[#1D5F84] font-medium">
              Articles liés à la santé{" "}
              {displayedArticles.length > 0
                ? `(${displayedArticles.length})`
                : ""}
            </h2>
          </div>
          {isSantePage && displayedArticles.length > 0 && (
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

        {displayedArticles.length > 0 ? (
          <ArticleList
            articles={displayedArticles}
            selectedMediaType={selectedMediaType}
            onArticleClick={handleArticleClick}
            onNavigateToAllArticles={
              isSantePage ? handleNavigateToAllArticles : undefined
            }
            onFavoritesUpdate={fetchAllArticlesSante}
          />
        ) : (
          <div className="text-center py-8 text-gray-500">
            Aucun article santé à afficher.
          </div>
        )}
      </div>
    </div>
  );
};

export default AllArticle;
