import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useSearchArticles from "../../hooks/article/useSearchArticles";
import SearchResults from "../../components/articles/searchResult";
import Menu from "../../components/layout/menu";

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { articles, loading, error, performSearch } = useSearchArticles();

  // Récupérer le terme de recherche depuis l'URL, ex. "/search?query=soin"
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";

  useEffect(() => {
    // Si un "query" est présent, on effectue la recherche
    if (query.trim() !== "") {
      performSearch(query);
    }
  }, [query, performSearch]);

  const handleSubjectClick = (articleId) => {
    console.log("Article cliqué :", articleId);
    // Redirigez vers la page de détails ou effectuez autre action
    navigate(`/articles/${articleId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#B3D7EC] to-[#FDFDFD]">
      <Menu />
      <div className="max-w-6xl mx-auto p-5">
        {/* Vous pouvez garder la SearchBar ici si souhaité */}
        {/* <SearchBar /> */}

        {loading && <p className="mt-4 text-center">Chargement...</p>}
        {error && (
          <p className="mt-4 text-center text-red-500">
            Erreur : {error.message}
          </p>
        )}
        {articles && articles.length > 0 ? (
          <SearchResults
            articles={articles}
            handleSubjectClick={handleSubjectClick}
          />
        ) : (
          !loading && (
            <div className="text-center mt-4">
              <p>Aucun résultat pour "{query}"</p>
              {/* Vous pouvez ajouter un bouton "Retour" si nécessaire */}
              <button
                onClick={() => navigate(-1)}
                className="mt-2 inline-flex items-center text-orange-500 hover:text-orange-600 transition-colors"
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
                <span className="ml-1">Retour</span>
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
