// SearchResultsPage.jsx
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useSearchArticles from "../../hooks/article/useSearchArticles";
import SearchResults from "../../components/articles/searchResult";
import Menu from "../../components/layout/menu";

const SearchResultsPage = () => {
  const location = useLocation();
  const { articles, loading, error, performSearch } = useSearchArticles();

  // Récupérer la valeur de "query" depuis l'URL, ex. "/search?query=soin"
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";

  useEffect(() => {
    // Si un "query" est présent, on effectue la recherche
    if (query) {
      performSearch(query);
    }
  }, [query, performSearch]);

  const handleSubjectClick = (articleId) => {
    console.log("Article cliqué :", articleId);
    // Redirigez vers la page de détails ou faites autre chose
  };

  return (
    <div>
      <Menu />

      {loading && <p>Chargement...</p>}
      {error && <p className="text-red-500">Erreur : {error.message}</p>}

      {articles && articles.length > 0 ? (
        <SearchResults
          articles={articles}
          handleSubjectClick={handleSubjectClick}
        />
      ) : (
        !loading && <p>Aucun résultat pour "{query}"</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
