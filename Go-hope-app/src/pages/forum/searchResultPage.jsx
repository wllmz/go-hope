import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useSearchForum from "../../hooks/forum/useSearchForum"; // Assurez-vous du bon chemin
import SearchResults from "../../components/forum/searchResult";
import Menu from "../../components/layout/menu";

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { subjects, loading, error, performSearch } = useSearchForum();

  // Récupérer le terme de recherche depuis l'URL, par exemple "/search?query=soin"
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";

  useEffect(() => {
    if (query.trim() !== "") {
      performSearch(query);
    }
  }, [query, performSearch]);

  const handleSubjectClick = (subjectId) => {
    
    // Redirigez vers la page de détails, par exemple
    navigate(`/forum/sujet/${subjectId}`);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#B3D7EC] to-[#FDFDFD]">
      <Menu />

      {loading && <p className="mt-4 text-center">Chargement...</p>}
      {error && (
        <p className="mt-4 text-center text-red-500">
          Erreur : {error.message}
        </p>
      )}
      {subjects && subjects.length > 0 ? (
        <SearchResults
          subjects={subjects}
          onSubjectClick={handleSubjectClick}
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
  );
};

export default SearchResultsPage;
